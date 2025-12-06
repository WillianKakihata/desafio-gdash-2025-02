import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomConfigModule } from './common/modules/custom.config.module';
import { CustomConfigService } from './common/modules/custom.config.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { WeatherModule } from './weather/weather.module';
import { OpenRouterModule } from './openrouter/openrouter.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true, 
      envFilePath: ['../.env'] 
    }),
    MongooseModule.forRootAsync({
      imports: [CustomConfigModule],
      inject: [CustomConfigService],
      useFactory: async (configService: CustomConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    UserModule, AuthModule,WeatherModule,OpenRouterModule, HttpModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
