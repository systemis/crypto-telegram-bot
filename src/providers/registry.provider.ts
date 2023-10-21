import { Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { keys } from 'ts-transformer-keys';
import { IsNotEmpty, IsString, validateSync } from 'class-validator';
import { plainToClass } from 'class-transformer';

export interface ISystemConfig {
  NODE_ENV: string;
  DB_URL: string;
  TELEGRAM_TOKEN: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_REGIRECT_URL: string;
}

export class SystemConfig implements ISystemConfig {
  /**
   * @var {string} NODE_ENV
   * @dev The environment of the system.
   */
  @IsString()
  NODE_ENV: string;

  /**
   * @var {string} DB_URL
   * @dev The URL of the database which the system will connect to.
   */
  @IsString()
  @IsNotEmpty()
  DB_URL: string;

  /**
   * @var {string} TELEGRAM_TOKEN
   * @dev The token of the Telegram bot.
   */
  @IsString()
  @IsNotEmpty()
  TELEGRAM_TOKEN: string;

  /**
   * @var {string} GOOGLE_CLIENT_ID
   * @dev The ID of the Google OAuth2 client.
   */
  @IsString()
  @IsNotEmpty()
  GOOGLE_CLIENT_ID: string;

  /**
   * @var {string} GOOGLE_CLIENT_SECRET
   * @dev The secret of the Google OAuth2 client.
   */
  @IsString()
  @IsNotEmpty()
  GOOGLE_CLIENT_SECRET: string;

  /**
   * @var {string} GOOGLE_REGIRECT_URL
   * @dev The redirect URL of the Google OAuth2 client.
   * @note This URL must be the same as the one in the Google OAuth2 client.
   */
  @IsString()
  @IsNotEmpty()
  GOOGLE_REGIRECT_URL: string;

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
    const envObj = keys<ISystemConfig>().reduce((prev, curr) => {
      return {
        ...prev,
        [curr]: configService.get<string>(curr),
      };
    }, {});

    // Read the config file.
    const config = plainToClass(SystemConfig, envObj);

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
