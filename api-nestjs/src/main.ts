import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:8081'],
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  });
  const port = parseInt(process.env.PORT ?? '8080', 10);
  await app.listen(port, '0.0.0.0', () => {
    console.log(`API is running on ${port} port`);
  });
}
bootstrap();
