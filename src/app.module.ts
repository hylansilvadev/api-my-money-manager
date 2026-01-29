import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './modules/accounts/accounts.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { CreditCardsModule } from './modules/credit-cards/credit-cards.module';
import { CreditorsModule } from './modules/creditors/creditors.module';
import { DebtsModule } from './modules/debts/debts.module';
import { RecurringModule } from './modules/recurring/recurring.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AccountsModule,
    CategoriesModule,
    TransactionsModule,
    CreditCardsModule,
    CreditorsModule,
    DebtsModule,
    RecurringModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
