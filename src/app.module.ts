import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { getMemoryServerMongoUri } from './helpers';
import { TelegramModule } from './telegram/telegram.module';
import { RegistryProvider } from './providers/registry.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    /**
     * @dev Initialize database
     * @returns {string} Mongo URI.
     */
    MongooseModule.forRootAsync({
      useFactory: async () => {
        // Extract env.
        const registry = new RegistryProvider();
        const env = registry.getConfig().NODE_ENV;

        // Handle to use memory server or not.
        return {
          uri:
            env === 'test'
              ? await getMemoryServerMongoUri()
              : registry.getConfig().DB_URL,
        };
      },
    }),

    TelegramModule,
  ],
  controllers: [AppController],
  providers: [RegistryProvider, AppService],
})
export class AppModule {}
