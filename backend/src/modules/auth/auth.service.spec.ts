import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

jest.mock('src/utils/bcrypt', () => ({
  comparePasswords: jest.fn(),
}));

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;
  let usersService: UsersService;

  const mockUser = {
    uuid: 'uuid',
    name: 'Test User',
    email: 'testuser@example.com',
    password: 'hashedPassword',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue('jwt_token'),
          },
        },
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should return a valid access token on successful login', async () => {
    const { comparePasswords } = require('src/utils/bcrypt');
    comparePasswords.mockResolvedValue(true);

    (usersService.findByEmail as jest.Mock).mockResolvedValue(mockUser);

    const result = await authService.login(mockUser.email, 'valid_password');

    expect(result.access_token).toBeDefined();
    expect(jwtService.signAsync).toHaveBeenCalledWith(
      expect.objectContaining({
        uuid: mockUser.uuid,
        email: mockUser.email,
      }),
    );
  });

  it('should throw UnauthorizedException if user not found', async () => {
    const mockEmail = 'nonexistent@example.com';

    (usersService.findByEmail as jest.Mock).mockResolvedValue(null);

    try {
      await authService.login(mockEmail, 'valid_password');
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException);
      expect(error.response.message).toBe('Credenciais inválidas');
    }
  });

  it('should throw UnauthorizedException if credentials are invalid', async () => {
    const { comparePasswords } = require('src/utils/bcrypt');
    comparePasswords.mockResolvedValue(false);

    (usersService.findByEmail as jest.Mock).mockResolvedValue(mockUser);

    try {
      await authService.login(mockUser.email, 'wrong_password');
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException);
      expect(error.response.message).toBe('Credenciais inválidas');
    }
  });

  it('should call UsersService.findByEmail with correct email', async () => {
    const { comparePasswords } = require('src/utils/bcrypt');
    comparePasswords.mockResolvedValue(true);

    (usersService.findByEmail as jest.Mock).mockResolvedValue(mockUser);

    await authService.login(mockUser.email, 'valid_password');
    expect(usersService.findByEmail).toHaveBeenCalledWith(mockUser.email);
  });

  it('should throw error if JwtService.signAsync fails', async () => {
    const { comparePasswords } = require('src/utils/bcrypt');
    comparePasswords.mockResolvedValue(true);

    (usersService.findByEmail as jest.Mock).mockResolvedValue(mockUser);

    jest
      .spyOn(jwtService, 'signAsync')
      .mockRejectedValue(new Error('JWT sign error'));

    try {
      await authService.login(mockUser.email, 'valid_password');
    } catch (error) {
      expect(error.message).toBe('JWT sign error');
    }
  });
});
