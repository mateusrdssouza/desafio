import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { InvestmentsModule } from './modules/investments/investments.module';
import { UsersModule } from './modules/users/users.module';
import { WalletsModule } from './modules/wallets/wallets.module';

@Module({
  imports: [AuthModule, UsersModule, WalletsModule, InvestmentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
