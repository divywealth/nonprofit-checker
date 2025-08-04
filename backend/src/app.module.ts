import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NonprofitModule } from './nonprofit/nonprofit.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HistoryModule } from './history/history.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        ssl: process.env.DB_SSL === 'false',
        entities: [__dirname + '/**/*.entity.{ts,js}'],
        synchronize: true,
        logging: process.env.NODE_ENV !== 'production',
    }),
    NonprofitModule, UserModule, HistoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
