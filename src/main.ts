import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RegistryProvider } from './providers/registry.provider';

const registry = new RegistryProvider();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log(registry.getConfig());
}
bootstrap();
