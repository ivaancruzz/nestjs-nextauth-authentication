import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/users.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
