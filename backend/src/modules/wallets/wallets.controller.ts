import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRequest } from 'src/common/interfaces/auth-request.interface';
import { transformToDto } from 'src/utils/transform';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { FindWalletDto } from './dto/find-wallet.dto';
import { WalletsService } from './wallets.service';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post()
  async create(
    @Body() createWalletDto: CreateWalletDto,
    @Request() req: AuthRequest,
  ): Promise<FindWalletDto> {
    try {
      if (!req.user) {
        throw new UnauthorizedException('Acesso não autorizado');
      }

      const wallet = await this.walletsService.create(
        req.user,
        createWalletDto,
      );

      return transformToDto(FindWalletDto, wallet);
    } catch (error) {
      throw new BadRequestException(
        error?.message || 'Erro ao criar a carteira',
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

      const wallet = await this.walletsService.findByUuid(req.user, uuid);

      return transformToDto(FindWalletDto, wallet);
    } catch (error) {
      throw new BadRequestException(
        error?.message || 'Erro ao buscar a carteira',
      );
    }
  }
}
