import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { InvestmentsRepository } from 'src/repositories/investments-repository';
import { UsersRepository } from 'src/repositories/users-repository';
import { WalletsRepository } from 'src/repositories/wallets-repository';
import { User } from '../users/entities/user.entity';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { Investment } from './entities/investment.entity';
import { InvestmentsService } from './investments.service';

jest.mock('src/repositories/investments-repository');
jest.mock('src/repositories/wallets-repository');
jest.mock('src/repositories/users-repository');

describe('InvestmentsService', () => {
  let investmentsService: InvestmentsService;
  let investmentsRepository: InvestmentsRepository;
  let walletsRepository: WalletsRepository;
  let usersRepository: UsersRepository;

  const mockUser: User = { uuid: 'valid-user-uuid', balance: 10000 } as User;

  const mockCompany = {
    uuid: 'valid-company-uuid',
    name: 'Valid Company',
    stockPrice: 50,
    description: 'A valid company for testing.',
    sector: 'Tech',
    ticker: 'VCT',
    stockExchange: 'NYSE',
    marketCap: 5000000000,
    country: 'USA',
    foundedYear: 2000,
    employees: 1000,
    createdAt: new Date(),
    updatedAt: new Date(),
    marketCapitalization: '10000000000',
    marketRiskLevel: 'Low',
    logoUrl: 'https://example.com/logo.png',
  };

  const createInvestmentDto: CreateInvestmentDto = {
    walletUuid: 'valid-wallet-uuid',
    companyUuid: 'valid-company-uuid',
    shares: 100,
    amount: 5000,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvestmentsService,
        {
          provide: InvestmentsRepository,
          useValue: {
            create: jest.fn(),
            findByWallet: jest.fn(),
            findAllCompanies: jest.fn(),
            update: jest.fn(),
            findCompanyByUuid: jest.fn(),
          },
        },
        {
          provide: WalletsRepository,
          useValue: { findByUuid: jest.fn(), update: jest.fn() },
        },
        {
          provide: UsersRepository,
          useValue: {
            findByUuid: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    investmentsService = module.get<InvestmentsService>(InvestmentsService);
    investmentsRepository = module.get<InvestmentsRepository>(
      InvestmentsRepository,
    );
    walletsRepository = module.get<WalletsRepository>(WalletsRepository);
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(investmentsService).toBeDefined();
  });

  it('should create an investment successfully and update wallet and user balance', async () => {
    const mockWallet = {
      id: 1,
      uuid: 'valid-wallet-uuid',
      name: 'valid-wallet-name',
      balance: 10000,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(walletsRepository, 'findByUuid').mockResolvedValue(mockWallet);
    jest
      .spyOn(investmentsRepository, 'findCompanyByUuid')
      .mockResolvedValue(mockCompany);
    jest.spyOn(usersRepository, 'findByUuid').mockResolvedValue(mockUser);
    jest
      .spyOn(investmentsRepository, 'create')
      .mockResolvedValue({} as Investment);
    jest
      .spyOn(investmentsRepository, 'findAllCompanies')
      .mockResolvedValue([
        { uuid: 'valid-company-uuid', name: 'Valid Company' } as any,
      ]);

    const result = await investmentsService.create(
      mockUser,
      createInvestmentDto,
    );

    expect(result).toEqual({ message: 'Investimento realizado com sucesso' });

    expect(walletsRepository.update).toHaveBeenCalledWith(
      mockUser.uuid,
      createInvestmentDto.walletUuid,
      {
        name: mockWallet.name,
        balance: 15000,
      },
    );

    expect(usersRepository.update).toHaveBeenCalledWith(mockUser.uuid, {
      balance: 5000,
    });
  });

  it('should throw NotFoundException if wallet not found', async () => {
    jest.spyOn(walletsRepository, 'findByUuid').mockResolvedValue(null);

    try {
      await investmentsService.create(mockUser, createInvestmentDto);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('Carteira não encontrada');
    }
  });

  it('should throw NotFoundException if company is not found', async () => {
    jest
      .spyOn(walletsRepository, 'findByUuid')
      .mockResolvedValue({ uuid: 'valid-wallet-uuid' } as any);
    jest.spyOn(usersRepository, 'findByUuid').mockResolvedValue(mockUser);
    jest
      .spyOn(investmentsRepository, 'findCompanyByUuid')
      .mockResolvedValue(null);

    try {
      await investmentsService.create(mockUser, createInvestmentDto);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('Empresa não encontrada');
    }
  });

  it('should throw ConflictException if insufficient balance', async () => {
    const userWithLowBalance = { ...mockUser, balance: 1000 };
    jest
      .spyOn(walletsRepository, 'findByUuid')
      .mockResolvedValue({ uuid: 'valid-wallet-uuid' } as any);
    jest
      .spyOn(usersRepository, 'findByUuid')
      .mockResolvedValue(userWithLowBalance);
    jest
      .spyOn(investmentsRepository, 'findCompanyByUuid')
      .mockResolvedValue(mockCompany);

    try {
      await investmentsService.create(mockUser, createInvestmentDto);
    } catch (error) {
      expect(error).toBeInstanceOf(ConflictException);
      expect(error.message).toBe('Saldo insuficiente');
    }
  });

  it('should throw ConflictException if the amount is zero or negative', async () => {
    const invalidInvestmentDto = { ...createInvestmentDto, amount: -1000 };

    jest
      .spyOn(walletsRepository, 'findByUuid')
      .mockResolvedValue({ uuid: 'valid-wallet-uuid' } as any);
    jest.spyOn(usersRepository, 'findByUuid').mockResolvedValue(mockUser);
    jest
      .spyOn(investmentsRepository, 'findCompanyByUuid')
      .mockResolvedValue(mockCompany);

    try {
      await investmentsService.create(mockUser, invalidInvestmentDto);
    } catch (error) {
      expect(error).toBeInstanceOf(ConflictException);
      expect(error.message).toBe(
        'O valor do investimento deve ser maior que zero',
      );
    }
  });
});
