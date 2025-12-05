import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomConfigModule } from 'src/common/modules/custom.config.module';
import { Weather, WeatherSchema } from './entities/weather.schema';
import { WeatherController } from './controller/weather.controller';
import { AUTH_GUARD, AuthGuard } from 'src/common/guards/auth.guard';
import { WeatherService } from './service/weather.service';
import { WeatherPersistence } from './persistence/weather.persistence';
import { OpenRouterModule } from 'src/openrouter/openrouter.module';

@Module({
  imports: [
    CustomConfigModule,
    MongooseModule.forFeature([{ name: Weather.name, schema: WeatherSchema }]),
    OpenRouterModule
  ],
  controllers: [WeatherController],
  providers: [
      {
        provide: 'WeatherServiceInterface',
        useClass: WeatherService
      },
      {
        provide: 'WeatherPersistenceInterface',
        useClass: WeatherPersistence
      },
      {
        provide: AUTH_GUARD,
        useClass: AuthGuard,
      },],
  exports: [],
})
export class WeatherModule {}
