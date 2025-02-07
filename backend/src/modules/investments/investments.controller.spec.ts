import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthRequest } from 'src/common/interfaces/auth-request.interface';
import { Company } from 'src/modules/investments/entities/company.entity';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { Investment } from './entities/investment.entity';
import { InvestmentsController } from './investments.controller';
import { InvestmentsService } from './investments.service';

jest.mock('./investments.service');

describe('InvestmentsController', () => {
  let investmentsController: InvestmentsController;
  let investmentsService: InvestmentsService;

  const createInvestmentDto: CreateInvestmentDto = {
    walletUuid: 'valid-wallet-uuid',
    companyUuid: 'valid-company-uuid',
    shares: 100,
    amount: 5000,
  };

  const mockUser = {
    uuid: 'valid-user-uuid',
    balance: 10000,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvestmentsController],
      providers: [InvestmentsService],
    }).compile();

    investmentsController = module.get<InvestmentsController>(
      InvestmentsController,
    );
    investmentsService = module.get<InvestmentsService>(InvestmentsService);
  });

  it('should be defined', () => {
    expect(investmentsController).toBeDefined();
  });

  it('should successfully create a new investment and return the correct response', async () => {
    jest
      .spyOn(investmentsService, 'create')
      .mockResolvedValue({ message: 'Investimento realizado com sucesso' });

    const result = await investmentsController.create(createInvestmentDto, {
      user: mockUser,
    } as AuthRequest);

    expect(result).toEqual({ message: 'Investimento cadastrado com sucesso' });
    expect(investmentsService.create).toHaveBeenCalledWith(
      mockUser,
      createInvestmentDto,
    );
  });

  it('should throw BadRequestException if user is not logged in', async () => {
    try {
      await investmentsController.create(createInvestmentDto, {
        user: null,
      } as unknown as AuthRequest);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe('Acesso não autorizado');
    }
  });

  it('should throw BadRequestException if there is an error during investment creation', async () => {
    jest
      .spyOn(investmentsService, 'create')
      .mockRejectedValue(new Error('Error'));

    try {
      await investmentsController.create(createInvestmentDto, {
        user: mockUser,
      } as AuthRequest);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe('Error');
    }
  });

  it('should throw BadRequestException if there is insufficient balance', async () => {
    jest
      .spyOn(investmentsService, 'create')
      .mockRejectedValue(new ConflictException('Saldo insuficiente'));

    try {
      await investmentsController.create(createInvestmentDto, {
        user: mockUser,
      } as AuthRequest);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe('Saldo insuficiente');
    }
  });

  it('should throw BadRequestException if company is not found during creation', async () => {
    jest
      .spyOn(investmentsService, 'create')
      .mockRejectedValue(new NotFoundException('Carteira não encontrada'));

    try {
      await investmentsController.create(createInvestmentDto, {
        user: mockUser,
      } as AuthRequest);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe('Carteira não encontrada');
    }
  });

  it('should return all companies successfully', async () => {
    const mockCompanies: Company[] = [
      {
        uuid: 'company-uuid-1',
        name: 'Company 1',
        description: 'Description 1',
        sector: 'Tech',
        ticker: 'C1',
        stockExchange: 'NASDAQ',
        stockPrice: 100,
        marketCapitalization: '1B',
        marketRiskLevel: 'Medium',
        logoUrl: 'url',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    jest
      .spyOn(investmentsService, 'findAllCompanies')
      .mockResolvedValue(mockCompanies);

    const result = await investmentsController.findAll();
    expect(result).toEqual(mockCompanies);
  });

  it('should return an empty list if no companies are found', async () => {
    jest.spyOn(investmentsService, 'findAllCompanies').mockResolvedValue([]);

    const result = await investmentsController.findAll();
    expect(result).toEqual([]);
  });

  it('should throw BadRequestException when failing to retrieve companies', async () => {
    jest
      .spyOn(investmentsService, 'findAllCompanies')
      .mockRejectedValue(new Error('Erro ao listar as empresas'));

    try {
      await investmentsController.findAll();
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe('Erro ao listar as empresas');
    }
  });

  it('should successfully delete an investment', async () => {
    const mockInvestment: Investment = {
      id: 1,
      uuid: 'valid-investment-uuid',
      amount: 5000,
      shares: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(investmentsService, 'delete').mockResolvedValue(mockInvestment);

    const result = await investmentsController.remove('valid-investment-uuid', {
      user: mockUser,
    } as AuthRequest);

    expect(result).toEqual({ message: 'Investimento excluído com sucesso' });
    expect(investmentsService.delete).toHaveBeenCalledWith(
      mockUser,
      'valid-investment-uuid',
    );
  });

  it('should throw BadRequestException if investment is not found during deletion', async () => {
    jest
      .spyOn(investmentsService, 'delete')
      .mockRejectedValue(new NotFoundException('Investimento não encontrado'));

    try {
      await investmentsController.remove('invalid-investment-uuid', {
        user: mockUser,
      } as AuthRequest);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe('Investimento não encontrado');
    }
  });

  it('should throw UnauthorizedException if user is not authenticated during deletion', async () => {
    try {
      await investmentsController.remove('valid-investment-uuid', {
        user: null,
      } as unknown as AuthRequest);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe('Acesso não autorizado');
    }
  });
});
