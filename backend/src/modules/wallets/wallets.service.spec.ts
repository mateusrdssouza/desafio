import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { WalletsRepository } from 'src/repositories/wallets-repository';
import { WalletsService } from './wallets.service';

describe('WalletsService', () => {
  let service: WalletsService;

  const mockWalletsRepository = {
    create: jest.fn(),
    findByName: jest.fn(),
    findAll: jest.fn(),
    findByUuid: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockUser = {
    id: 1,
    uuid: 'user-uuid',
    name: 'John Doe',
    email: 'john.doe@example.com',
    balance: 1000,
    password: 'password123',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WalletsService,
        { provide: WalletsRepository, useValue: mockWalletsRepository },
      ],
    }).compile();

    service = module.get<WalletsService>(WalletsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new wallet', async () => {
      const createDto = { name: 'My Wallet' };
      const createdWallet = { ...createDto, uuid: 'wallet-uuid', balance: 0 };

      mockWalletsRepository.findByName.mockResolvedValue(null);
      mockWalletsRepository.create.mockResolvedValue(createdWallet);

      const result = await service.create(mockUser, createDto);

      expect(result).toEqual(createdWallet);
      expect(mockWalletsRepository.create).toHaveBeenCalledWith(
        mockUser.uuid,
        createDto,
      );
    });

    it('should throw ConflictException if wallet name already exists', async () => {
      const createDto = { name: 'My Wallet' };

      mockWalletsRepository.findByName.mockResolvedValue({
        uuid: 'existing-uuid',
      });

      await expect(service.create(mockUser, createDto)).rejects.toThrowError(
        ConflictException,
      );
    });
  });

  describe('update', () => {
    it('should update an existing wallet', async () => {
      const uuid = 'wallet-uuid';
      const updateDto = { name: 'Updated Wallet' };
      const updatedWallet = { uuid, name: 'Updated Wallet', balance: 0 };

      mockWalletsRepository.findByUuid.mockResolvedValue({
        uuid: mockUser.uuid,
      });
      mockWalletsRepository.findByName.mockResolvedValue(null);
      mockWalletsRepository.update.mockResolvedValue(updatedWallet);

      const result = await service.update(mockUser, uuid, updateDto);

      expect(result).toEqual(updatedWallet);
      expect(mockWalletsRepository.update).toHaveBeenCalledWith(
        mockUser.uuid,
        uuid,
        updateDto,
      );
    });

    it('should throw NotFoundException if wallet does not exist during update', async () => {
      const uuid = 'non-existent-uuid';
      const updateDto = { name: 'Updated Wallet' };

      mockWalletsRepository.findByUuid.mockResolvedValue(null);

      await expect(
        service.update(mockUser, uuid, updateDto),
      ).rejects.toThrowError(NotFoundException);
    });

    it('should throw BadRequestException if wallet does not belong to the user during update', async () => {
      const uuid = 'wallet-uuid';
      const updateDto = { name: 'Updated Wallet' };

      mockWalletsRepository.findByUuid.mockResolvedValue({
        uuid: 'other-user-uuid',
      });

      await expect(
        service.update(mockUser, uuid, updateDto),
      ).rejects.toThrowError(
        new BadRequestException(
          'Você não tem permissão para atualizar esta carteira',
        ),
      );
    });
  });

  describe('delete', () => {
    it('should delete an existing wallet', async () => {
      const uuid = 'wallet-uuid';
      const deletedWallet = { uuid, name: 'My Wallet', balance: 0 };

      mockWalletsRepository.findByUuid.mockResolvedValue({
        uuid: mockUser.uuid,
      });
      mockWalletsRepository.delete.mockResolvedValue(deletedWallet);

      const result = await service.delete(mockUser, uuid);

      expect(result).toEqual(deletedWallet);
      expect(mockWalletsRepository.delete).toHaveBeenCalledWith(
        mockUser.uuid,
        uuid,
      );
    });

    it('should throw NotFoundException if wallet does not exist during deletion', async () => {
      const uuid = 'non-existent-uuid';

      mockWalletsRepository.findByUuid.mockResolvedValue(null);

      await expect(service.delete(mockUser, uuid)).rejects.toThrowError(
        NotFoundException,
      );
    });

    it('should throw BadRequestException if wallet does not belong to the user during deletion', async () => {
      const uuid = 'wallet-uuid';

      mockWalletsRepository.findByUuid.mockResolvedValue({
        uuid: 'other-user-uuid',
      });

      await expect(service.delete(mockUser, uuid)).rejects.toThrowError(
        new BadRequestException(
          'Você não tem permissão para excluir esta carteira',
        ),
      );
    });
  });
});
