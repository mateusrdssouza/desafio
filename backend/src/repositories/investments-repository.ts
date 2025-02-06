import { CreateInvestmentDto } from 'src/modules/investments/dto/create-investment.dto';
import { UpdateInvestmentDto } from 'src/modules/investments/dto/update-investment.dto';
import { Investment } from 'src/modules/investments/entities/investment.entity';

export abstract class InvestmentsRepository {
  abstract create(data: CreateInvestmentDto): Promise<Investment>;
  abstract findByWallet(
    walletUuid: string,
    companyUuid: string,
  ): Promise<Investment | null>;
  abstract update(uuid: string, data: UpdateInvestmentDto): Promise<Investment>;
}
