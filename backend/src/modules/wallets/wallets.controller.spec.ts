import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthRequest } from 'src/common/interfaces/auth-request.interface';
import { WalletsController } from './wallets.controller';
import { WalletsService } from './wallets.service';

describe('WalletsController', () => {
  let controller: WalletsController;

  const mockWalletsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockAuthRequest = {
    user: { uuid: 'user-uuid' },
  } as AuthRequest;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletsController],
      providers: [{ provide: WalletsService, useValue: mockWalletsService }],
    }).compile();

    controller = module.get<WalletsController>(WalletsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a wallet', async () => {
    const createDto = { name: 'My Wallet' };
    const createdWallet = {
      uuid: 'wallet-uuid',
      name: 'My Wallet',
      balance: 0,
    };

    mockWalletsService.create.mockResolvedValue(createdWallet);

    const result = await controller.create(createDto, mockAuthRequest);

    expect(result).toEqual({ message: 'Carteira cadastrada com sucesso' });
    expect(mockWalletsService.create).toHaveBeenCalledWith(
      mockAuthRequest.user,
      createDto,
    );
  });

  it('should throw BadRequestException if no user is authenticated when creating a wallet', async () => {
    const invalidAuthRequest = {} as AuthRequest;
    const createDto = { name: 'My Wallet' };

    await expect(
      controller.create(createDto, invalidAuthRequest),
    ).rejects.toThrowError(BadRequestException);
  });

  it('should list all wallets', async () => {
    const wallets = [
      { uuid: 'wallet-uuid-1', name: 'Wallet 1', balance: 100 },
      { uuid: 'wallet-uuid-2', name: 'Wallet 2', balance: 200 },
    ];

    mockWalletsService.findAll.mockResolvedValue(wallets);

    const result = await controller.findAll(mockAuthRequest);

    expect(result).toEqual(wallets);
    expect(mockWalletsService.findAll).toHaveBeenCalledWith(
      mockAuthRequest.user,
    );
  });

  it('should throw BadRequestException if no user is authenticated when listing wallets', async () => {
    const invalidAuthRequest = {} as AuthRequest;

    await expect(controller.findAll(invalidAuthRequest)).rejects.toThrowError(
      BadRequestException,
    );
  });

  it('should update a wallet', async () => {
    const uuid = 'wallet-uuid';
    const updateDto = { name: 'Updated Wallet' };
    const updatedWallet = { uuid, name: 'Updated Wallet', balance: 0 };

    mockWalletsService.update.mockResolvedValue(updatedWallet);

    const result = await controller.update(uuid, updateDto, mockAuthRequest);

    expect(result).toEqual(updatedWallet);
    expect(mockWalletsService.update).toHaveBeenCalledWith(
      mockAuthRequest.user,
      uuid,
      updateDto,
    );
  });

  it('should throw BadRequestException if wallet does not exist during update', async () => {
    const uuid = 'non-existent-uuid';
    const updateDto = { name: 'Updated Wallet' };

    mockWalletsService.update.mockRejectedValue(
      new BadRequestException('Carteira não encontrada'),
    );

    await expect(
      controller.update(uuid, updateDto, mockAuthRequest),
    ).rejects.toThrowError(BadRequestException);
  });

  it('should delete a wallet', async () => {
    const uuid = 'wallet-uuid';
    const deletedWallet = { uuid, name: 'My Wallet', balance: 0 };

    mockWalletsService.delete.mockResolvedValue(deletedWallet);

    const result = await controller.remove(uuid, mockAuthRequest);

    expect(result).toEqual({ message: 'Carteira excluída com sucesso' });
    expect(mockWalletsService.delete).toHaveBeenCalledWith(
      mockAuthRequest.user,
      uuid,
    );
  });

  it('should throw BadRequestException if wallet does not exist during deletion', async () => {
    const uuid = 'non-existent-uuid';

    mockWalletsService.delete.mockRejectedValue(
      new BadRequestException('Carteira não encontrada'),
    );

    await expect(controller.remove(uuid, mockAuthRequest)).rejects.toThrowError(
      BadRequestException,
    );
  });

  it('should throw BadRequestException if no user is authenticated when deleting a wallet', async () => {
    const uuid = 'wallet-uuid';
    const invalidAuthRequest = {} as AuthRequest;

    await expect(
      controller.remove(uuid, invalidAuthRequest),
    ).rejects.toThrowError(BadRequestException);
  });

  it('should throw an error when wallet creation fails', async () => {
    const createDto = { name: 'My Wallet' };

    mockWalletsService.create.mockRejectedValue(new Error('Erro inesperado'));

    await expect(
      controller.create(createDto, mockAuthRequest),
    ).rejects.toThrowError(Error);
  });
});
