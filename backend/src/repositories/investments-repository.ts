import { CreateInvestmentDto } from 'src/modules/investments/dto/create-investment.dto';
import { UpdateInvestmentDto } from 'src/modules/investments/dto/update-investment.dto';
import { Company } from 'src/modules/investments/entities/company.entity';
import { Investment } from 'src/modules/investments/entities/investment.entity';

export abstract class InvestmentsRepository {
  abstract create(data: CreateInvestmentDto): Promise<Investment>;
  abstract findByUuid(
    userUuid: string,
    uuid: string,
  ): Promise<Investment | null>;
  abstract findByWallet(
    walletUuid: string,
    companyUuid: string,
  ): Promise<Investment | null>;
  abstract findCompanyByUuid(uuid: string): Promise<Company | null>;
  abstract findAllCompanies(): Promise<Company[]>;
  abstract update(uuid: string, data: UpdateInvestmentDto): Promise<Investment>;
  abstract delete(userUuid: string, uuid: string): Promise<Investment>;
}
