import { Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { plainToClass } from 'class-transformer';
import { BotCommand } from 'node-telegram-bot-api';
import { autoImplement } from '@/src/utils/type.util';
import { IsNotEmpty, IsString, validateSync } from 'class-validator';

import { BOT_COMMANDS } from '@/src/entities/bot.entity';

enum SystemConfigKeys {
  DB_URL = 'DB_URL',
  NODE_ENV = 'NODE_ENV',
  TELEGRAM_TOKEN = 'TELEGRAM_TOKEN',
  GOOGLE_CLIENT_ID = 'GOOGLE_CLIENT_ID',
  GOOGLE_CLIENT_SECRET = 'GOOGLE_CLIENT_SECRET',
  GOOGLE_REGIRECT_URL = 'GOOGLE_REGIRECT_URL',

  WEB3AUTH_KID = 'WEB3AUTH_KID',
  WEB3AUTH_CLIENTID = 'WEB3AUTH_CLIENTID',
}
export interface ISystemConfigEnv {
  [SystemConfigKeys.NODE_ENV]: string;
  [SystemConfigKeys.DB_URL]: string;
  [SystemConfigKeys.TELEGRAM_TOKEN]: string;
  [SystemConfigKeys.GOOGLE_CLIENT_ID]: string;
  [SystemConfigKeys.GOOGLE_CLIENT_SECRET]: string;

  [SystemConfigKeys.WEB3AUTH_KID]: string;
  [SystemConfigKeys.WEB3AUTH_CLIENTID]: string;
}

export class SystemConfigEnv implements ISystemConfigEnv {
  /**
   * @var {string} NODE_ENV
   * @dev The environment of the system.
   */
  @IsString()
  [SystemConfigKeys.NODE_ENV]: string;

  /**
   * @var {string} DB_URL
   * @dev The URL of the database which the system will connect to.
   */
  @IsString()
  @IsNotEmpty()
  [SystemConfigKeys.DB_URL]: string;

  /**
   * @var {string} TELEGRAM_TOKEN
   * @dev The token of the Telegram bot.
   */
  @IsString()
  @IsNotEmpty()
  [SystemConfigKeys.TELEGRAM_TOKEN]: string;

  /**
   * @var {string} GOOGLE_CLIENT_ID
   * @dev The ID of the Google OAuth2 client.
   */
  @IsString()
  @IsNotEmpty()
  [SystemConfigKeys.GOOGLE_CLIENT_ID]: string;

  /**
   * @var {string} GOOGLE_CLIENT_SECRET
   * @dev The secret of the Google OAuth2 client.
   */
  @IsString()
  @IsNotEmpty()
  [SystemConfigKeys.GOOGLE_CLIENT_SECRET]: string;

  /**
   * @var {string} GOOGLE_REGIRECT_URL
   * @dev The redirect URL of the Google OAuth2 client.
   * @note This URL must be the same as the one in the Google OAuth2 client.
   */
  @IsString()
  @IsNotEmpty()
  [SystemConfigKeys.GOOGLE_REGIRECT_URL]: string;

  /**
   * @var {string} WEB3AUTH_KID
   * @dev The kid of the Web3Auth.
   */
  @IsString()
  @IsNotEmpty()
  [SystemConfigKeys.WEB3AUTH_KID]: string;

  /**
   * @var {string} WEB3AUTH_CLIENTID
   * @dev The client ID of the Web3Auth.
   */
  @IsString()
  @IsNotEmpty()
  [SystemConfigKeys.WEB3AUTH_CLIENTID]: string;

  /**
   * @dev The function to ensure the schema of the config.
   * @throws Error if the schema is not valid.
   */
  public ensureValidSchema() {
    const errors = validateSync(this);
    if (errors.length > 0) {
      throw new Error(JSON.stringify(errors.map((elm) => elm.constraints)));
    }
  }
}

export class SystemConfig extends autoImplement<SystemConfigEnv>() {
  /**
   * @var {string} NODE_ENV
   * @dev The environment of the system.
   */
  botCommands: BotCommand[];

  /**
   * @dev The function to ensure the schema of the config.
   * @throws Error if the schema is not valid.
   */
  public ensureValidSchema() {
    const errors = validateSync(this);
    if (errors.length > 0) {
      throw new Error(JSON.stringify(errors.map((elm) => elm.constraints)));
    }
  }
}

@Global()
export class RegistryProvider {
  private static config: SystemConfig;

  constructor() {
    if (!RegistryProvider.config) {
      RegistryProvider.load();
    }
  }

  /**
   * @dev The function to read the config file and assign it to the static variable.
   * @throws Error if SYSTEM_CONFIG_PATH is not defined.
   * @throws Error if the config file is not valid.
   */
  public static load() {
    // Read the environment variables.
    const configService = new ConfigService();

    // Read the environment variables and assign them to the object.
    const envObj = Object.values(SystemConfigKeys).reduce((prev, curr) => {
      return {
        ...prev,
        [curr]: configService.get<string>(curr),
      };
    }, {});

    // Read the config file.
    const configEnv = plainToClass(SystemConfigEnv, envObj);
    configEnv.ensureValidSchema();

    const config: SystemConfig = plainToClass(SystemConfig, {
      ...envObj,
      botCommand: BOT_COMMANDS,
    });

    // Assign the config to the static variable and validate the schema.
    RegistryProvider.config = config;
    RegistryProvider.config.ensureValidSchema();

    // Freeze the config object to prevent modification.
    Object.freeze(RegistryProvider.config);
  }

  /**
   * @dev The function to get the config.
   * @returns SystemConfig
   */
  public getConfig(): SystemConfig {
    return RegistryProvider.config;
  }
}
