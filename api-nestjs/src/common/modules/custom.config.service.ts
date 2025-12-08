import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CustomConfigService {
  constructor(private readonly configService: ConfigService) {}

  get<T>(key: string): T {
    const value = this.configService.get<T>(key);

    if (value == null || value == undefined) {
      throw new InternalServerErrorException(`Missing config ${key}`);
    }

    return value;
  }

  getRabbitUrl<T>(): T {
    const env = this.configService.get<string>('NODE_ENV') ?? 'development';
    let value: T | undefined;

    if (env === 'docker' || env === 'production') {
      value = this.configService.get<T>('RABBITMQ_URL_DOCKER');
    } else {
      value = this.configService.get<T>('RABBITMQ_URL_LOCAL');
    }

    if (value == null || value == undefined) {
      throw new InternalServerErrorException(`Missing config RABBITMQ_URL`);
    }

    return value;
  }
}
