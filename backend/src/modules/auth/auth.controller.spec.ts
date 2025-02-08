import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  const mockLoginDto: LoginDto = {
    email: 'testuser@example.com',
    password: 'password123',
  };

  const mockUsersService = {
    findByEmail: jest.fn().mockResolvedValue({
      uuid: '1',
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'password123',
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest
              .fn()
              .mockResolvedValue({ access_token: 'access_token' }),
          },
        },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  it('should return an access token when login is successful', async () => {
    const result = await authController.login(mockLoginDto);
    expect(result).toEqual({ access_token: 'access_token' });
    expect(authService.login).toHaveBeenCalledWith(
      mockLoginDto.email,
      mockLoginDto.password,
    );
  });

  it('should call AuthService.login exactly once', async () => {
    await authController.login(mockLoginDto);
    expect(authService.login).toHaveBeenCalledTimes(1);
  });

  it('should throw an UnauthorizedException when login fails', async () => {
    jest
      .spyOn(authService, 'login')
      .mockRejectedValue(new UnauthorizedException('Credenciais inválidas'));

    try {
      await authController.login(mockLoginDto);
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException);
      expect(error.response.message).toBe('Credenciais inválidas');
    }
  });

  it('should throw a BadRequestException if login DTO is invalid', async () => {
    const invalidLoginDto = { ...mockLoginDto, email: 'invalid-email' };

    try {
      await authController.login(invalidLoginDto);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.response.message).toContain('email must be an email');
    }
  });

  it('should throw a generic error if an unexpected error occurs during login', async () => {
    jest
      .spyOn(authService, 'login')
      .mockRejectedValueOnce(new Error('Unexpected error'));

    try {
      await authController.login(mockLoginDto);
    } catch (error) {
      expect(error.message).toBe('Unexpected error');
    }
  });
});
