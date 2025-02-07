import { BadRequestException, ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

jest.mock('./users.service');

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  const createUserDto: CreateUserDto = {
    name: 'Test User',
    email: 'testuser@example.com',
    password: 'validPassword',
  };

  const mockUser: User = {
    id: 1,
    uuid: 'some-uuid',
    name: 'Test User',
    email: 'testuser@example.com',
    balance: 100,
    password: 'hashedPassword',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  it('should successfully create a new user and return the correct response', async () => {
    jest.spyOn(usersService, 'create').mockResolvedValue(mockUser);

    const result = await usersController.create(createUserDto);

    expect(result).toEqual({ message: 'Usuário cadastrado com sucesso' });
    expect(usersService.create).toHaveBeenCalledWith(createUserDto);
  });

  it('should throw BadRequestException if there is an error in the service', async () => {
    jest.spyOn(usersService, 'create').mockRejectedValue(new Error('Error'));

    try {
      await usersController.create(createUserDto);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe('Error');
    }
  });

  it('should throw BadRequestException with specific message if password encryption fails', async () => {
    jest
      .spyOn(usersService, 'create')
      .mockRejectedValue(new Error('Password encryption failed'));

    try {
      await usersController.create(createUserDto);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe('Password encryption failed');
    }
  });

  it('should throw BadRequestException if user creation fails', async () => {
    jest
      .spyOn(usersService, 'create')
      .mockRejectedValue(new Error('User creation failed'));

    try {
      await usersController.create(createUserDto);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe('User creation failed');
    }
  });

  it('should throw BadRequestException if email already exists (ConflictException handled by controller)', async () => {
    jest
      .spyOn(usersService, 'create')
      .mockRejectedValue(
        new ConflictException('O e-mail informado já está em uso'),
      );

    try {
      await usersController.create(createUserDto);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe('O e-mail informado já está em uso');
    }
  });
});
