import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RegistryProvider } from './providers/registry.provider';

const registry = new RegistryProvider();

async function bootstrap() {
  console.log(registry.getConfig());
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);
}
bootstrap();
