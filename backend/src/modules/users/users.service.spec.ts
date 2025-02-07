import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepository } from 'src/repositories/users-repository';
import * as bcryptUtils from 'src/utils/bcrypt';
import { encryptPassword } from 'src/utils/bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

jest.mock('src/repositories/users-repository');
jest.mock('src/utils/bcrypt');

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: UsersRepository;

  const mockUser = {
    id: 1,
    uuid: 'uuid',
    name: 'Test User',
    email: 'testuser@example.com',
    password: 'hashedPassword',
    balance: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const createUserDto: CreateUserDto = {
    name: 'Test User',
    email: 'testuser@example.com',
    password: 'validPassword',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: {
            findByEmail: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  it('should create a new user successfully', async () => {
    jest.spyOn(usersRepository, 'findByEmail').mockResolvedValue(null);
    jest.spyOn(usersRepository, 'create').mockResolvedValue(mockUser);
    (encryptPassword as jest.Mock).mockResolvedValue('hashedPassword');

    const result = await usersService.create(createUserDto);

    expect(result).toEqual(mockUser);
    expect(usersRepository.create).toHaveBeenCalledWith({
      ...createUserDto,
      password: 'hashedPassword',
      balance: 0,
    });
  });

  it('should throw ConflictException if email is already in use', async () => {
    jest.spyOn(usersRepository, 'findByEmail').mockResolvedValue(mockUser);

    try {
      await usersService.create(createUserDto);
    } catch (error) {
      expect(error).toBeInstanceOf(ConflictException);
      expect(error.message).toBe('O e-mail informado já está em uso');
    }
  });

  it('should call findByEmail when checking if email exists', async () => {
    jest.spyOn(usersRepository, 'findByEmail').mockResolvedValue(mockUser);

    try {
      await usersService.create(createUserDto);
    } catch (error) {
      expect(usersRepository.findByEmail).toHaveBeenCalledWith(
        createUserDto.email,
      );
    }
  });

  it('should throw BadRequestException if password encryption fails', async () => {
    jest
      .spyOn(bcryptUtils, 'encryptPassword')
      .mockRejectedValue(new Error('Password encryption failed'));

    try {
      await usersService.create(createUserDto);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe('Ocorreu um erro no cadastro do usuário');
    }
  });

  it('should throw BadRequestException if user creation fails', async () => {
    jest
      .spyOn(usersRepository, 'create')
      .mockRejectedValue(new Error('User creation failed'));

    try {
      await usersService.create(createUserDto);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe('Ocorreu um erro no cadastro do usuário');
    }
  });

  it('should find user by email', async () => {
    jest.spyOn(usersRepository, 'findByEmail').mockResolvedValue(mockUser);

    const result = await usersService.findByEmail('testuser@example.com');

    expect(result).toEqual(mockUser);
  });

  it('should throw NotFoundException if user not found', async () => {
    jest.spyOn(usersRepository, 'findByEmail').mockResolvedValue(null);

    try {
      await usersService.findByEmail('nonexistent@example.com');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('Usuário não encontrado');
    }
  });
});
