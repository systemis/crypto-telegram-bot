import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppService } from './app.service';
import { OrmModule } from './orm/orm.module';
import { AppController } from './app.controller';
import { getMemoryServerMongoUri } from './helpers';
import { TelegramModule } from './telegram/telegram.module';
import { NetworkProvider } from './providers/network.provider';
import { RegistryProvider } from './providers/registry.provider';
import { TelegramService } from './telegram/telegram.service';

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
    OrmModule,
  ],
  controllers: [AppController],
  providers: [RegistryProvider, NetworkProvider, AppService, TelegramService],
})
export class AppModule {}
