import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AUTH_GUARD, AuthGuard } from 'src/common/guards/auth.guard';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      global: true
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
        provide: 'AuthServiceInterface', useClass: AuthService
    },
  ],
  exports: [],
})
export class AuthModule {}
