import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRequest } from 'src/common/interfaces/auth-request.interface';
import { transformToDto } from 'src/utils/transform';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { FindCompanyDto } from './dto/find-company.dto';
import { InvestmentsService } from './investments.service';

@Controller('investments')
export class InvestmentsController {
  constructor(private readonly investmentsService: InvestmentsService) {}

  @Get('companies')
  async findAll(): Promise<FindCompanyDto[]> {
    try {
      const companies = await this.investmentsService.findAllCompanies();

      return companies.map((company) =>
        transformToDto(FindCompanyDto, company),
      );
    } catch (error) {
      throw new BadRequestException(
        error?.message || 'Erro ao listar as empresas',
      );
    }
  }

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
        message: 'Investimento resgatado com sucesso',
      };
    } catch (error) {
      throw new BadRequestException(
        error?.message || 'Erro ao resgatar o investimento',
      );
    }
  }
}
