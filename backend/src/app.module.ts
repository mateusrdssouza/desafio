import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { WalletsModule } from './modules/wallets/wallets.module';

@Module({
  imports: [AuthModule, UsersModule, WalletsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
