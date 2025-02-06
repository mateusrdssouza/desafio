import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRequest } from 'src/common/interfaces/auth-request.interface';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { InvestmentsService } from './investments.service';

@Controller('investments')
export class InvestmentsController {
  constructor(private readonly investmentsService: InvestmentsService) {}

  @Post()
  async create(
    @Body() createInvestmentDto: CreateInvestmentDto,
    @Request() req: AuthRequest,
  ): Promise<{ message: string }> {
    try {
      if (!req.user) {
        throw new UnauthorizedException('Acesso não autorizado');
      }

      await this.investmentsService.create(req.user, createInvestmentDto);

      return {
        message: 'Investimento cadastrado com sucesso',
      };
    } catch (error) {
      throw new BadRequestException(
        error?.message || 'Erro ao criar o investimento',
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

      await this.investmentsService.delete(req.user, uuid);

      return {
        message: 'Investimento excluído com sucesso',
      };
    } catch (error) {
      throw new BadRequestException(
        error?.message || 'Erro ao excluir o investimento',
      );
    }
  }
}
