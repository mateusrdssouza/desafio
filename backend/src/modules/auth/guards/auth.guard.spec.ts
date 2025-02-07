import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let jwtService: JwtService;
  let reflector: Reflector;

  const mockRequest = {
    headers: {
      authorization: 'Bearer valid_token',
    },
  };
  const mockPayload = {
    uuid: 'uuid',
    name: 'Test User',
    email: 'testuser@example.com',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn().mockResolvedValue(mockPayload),
          },
        },
        Reflector,
      ],
    }).compile();

    authGuard = module.get<AuthGuard>(AuthGuard);
    jwtService = module.get<JwtService>(JwtService);
    reflector = module.get<Reflector>(Reflector);
  });

  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });

  it('should return true when token is valid', async () => {
    const mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
      getHandler: jest.fn().mockReturnValue(() => null),
      getClass: jest.fn().mockReturnValue(() => null),
    } as unknown as ExecutionContext;

    const result = await authGuard.canActivate(mockExecutionContext);
    expect(result).toBe(true);
  });

  it('should allow access to public routes without authentication', async () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(true);

    const mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
      getHandler: jest.fn().mockReturnValue(() => null),
      getClass: jest.fn().mockReturnValue(() => null),
    } as unknown as ExecutionContext;

    const result = await authGuard.canActivate(mockExecutionContext);
    expect(result).toBe(true);
  });

  it('should throw UnauthorizedException if token is missing', async () => {
    mockRequest.headers.authorization = '';
    const mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
      getHandler: jest.fn().mockReturnValue(() => null),
      getClass: jest.fn().mockReturnValue(() => null),
    } as unknown as ExecutionContext;

    try {
      await authGuard.canActivate(mockExecutionContext);
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException);
      expect(error.response.message).toBe('Acesso não autorizado');
    }
  });

  it('should throw UnauthorizedException if token is invalid', async () => {
    jest
      .spyOn(jwtService, 'verifyAsync')
      .mockRejectedValueOnce(new Error('Invalid token'));

    const mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
      getHandler: jest.fn().mockReturnValue(() => null),
      getClass: jest.fn().mockReturnValue(() => null),
    } as unknown as ExecutionContext;

    try {
      await authGuard.canActivate(mockExecutionContext);
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException);
      expect(error.response.message).toBe('Acesso não autorizado');
    }
  });

  it('should throw UnauthorizedException if token is expired', async () => {
    jest
      .spyOn(jwtService, 'verifyAsync')
      .mockRejectedValueOnce(new Error('jwt expired'));

    const mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
      getHandler: jest.fn().mockReturnValue(() => null),
      getClass: jest.fn().mockReturnValue(() => null),
    } as unknown as ExecutionContext;

    try {
      await authGuard.canActivate(mockExecutionContext);
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException);
      expect(error.response.message).toBe('Acesso não autorizado');
    }
  });

  it('should throw UnauthorizedException if token is malformed', async () => {
    jest
      .spyOn(jwtService, 'verifyAsync')
      .mockRejectedValueOnce(new Error('jwt malformed'));

    const mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
      getHandler: jest.fn().mockReturnValue(() => null),
      getClass: jest.fn().mockReturnValue(() => null),
    } as unknown as ExecutionContext;

    try {
      await authGuard.canActivate(mockExecutionContext);
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException);
      expect(error.response.message).toBe('Acesso não autorizado');
    }
  });
});
