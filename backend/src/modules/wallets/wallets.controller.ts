import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRequest } from 'src/common/interfaces/auth-request.interface';
import { transformToDto } from 'src/utils/transform';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { FindWalletDto } from './dto/find-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { WalletsService } from './wallets.service';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post()
  async create(
    @Body() createWalletDto: CreateWalletDto,
    @Request() req: AuthRequest,
  ): Promise<{ message: string }> {
    try {
      if (!req.user) {
        throw new UnauthorizedException('Acesso não autorizado');
      }

      await this.walletsService.create(req.user, createWalletDto);

      return {
        message: 'Carteira cadastrada com sucesso',
      };
    } catch (error) {
      throw new BadRequestException(
        error?.message || 'Erro ao criar a carteira',
      );
    }
  }

  @Get()
  async findAll(@Request() req: AuthRequest): Promise<FindWalletDto[]> {
    try {
      if (!req.user) {
        throw new UnauthorizedException('Acesso não autorizado');
      }

      const wallets = await this.walletsService.findAll(req.user);

      return wallets.map((wallet) => transformToDto(FindWalletDto, wallet));
    } catch (error) {
      throw new BadRequestException(
        error?.message || 'Erro ao listar as carteiras',
      );
    }
  }

  @Get(':uuid')
  async find(
    @Param('uuid') uuid: string,
    @Request() req: AuthRequest,
  ): Promise<FindWalletDto> {
    try {
      if (!req.user) {
        throw new UnauthorizedException('Acesso não autorizado');
      }

      const wallet = await this.walletsService.findOne(req.user, uuid);

      return transformToDto(FindWalletDto, wallet);
    } catch (error) {
      throw new BadRequestException(
        error?.message || 'Erro ao buscar a carteira',
      );
    }
  }

  @Patch(':uuid')
  async update(
    @Param('uuid') uuid: string,
    @Body() updateWalletDto: UpdateWalletDto,
    @Request() req: AuthRequest,
  ): Promise<{ message: string }> {
    try {
      if (!req.user) {
        throw new UnauthorizedException('Acesso não autorizado');
      }

      await this.walletsService.update(req.user, uuid, updateWalletDto);

      return {
        message: 'Carteira atualizada com sucesso',
      };
    } catch (error) {
      throw new BadRequestException(
        error?.message || 'Erro ao atualizar a carteira',
      );
    }
  }

  @Delete(':uuid')
  async remove(
    @Param('uuid') uuid: string,
    @Request() req: AuthRequest,
  ): Promise<{ message: string }> {
    try {
      if (!req.user) {
        throw new UnauthorizedException('Acesso não autorizado');
      }

      await this.walletsService.delete(req.user, uuid);

      return {
        message: 'Carteira excluída com sucesso',
      };
    } catch (error) {
      throw new BadRequestException(
        error?.message || 'Erro ao excluir a carteira',
      );
    }
  }
}
