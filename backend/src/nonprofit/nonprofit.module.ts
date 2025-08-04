import { Module } from '@nestjs/common';
import { NonprofitService } from './nonprofit.service';
import { NonprofitController } from './nonprofit.controller';
import { HistoryModule } from 'src/history/history.module';
import { UserModule } from 'src/user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HistoryModule,
    UserModule,
  ],
  controllers: [NonprofitController],
  providers: [NonprofitService, JwtService],
})
export class NonprofitModule {}
