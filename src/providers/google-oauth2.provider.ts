import { Injectable } from '@nestjs/common';

import { google } from 'googleapis';
import { type OAuth2Client } from 'google-auth-library';

import { RegistryProvider } from './registry.provider';

@Injectable()
export class GoogleOauth2Provier {
  private readonly _oauth2Client: OAuth2Client;

  /**
   * @dev Initialize @var {GoogleOauth2Provier} instance.
   * @param {RegistryProvider} registryProvider RegistryProvider instance.
   */
  constructor(private readonly registryProvider: RegistryProvider) {
    /**
     * @dev Initialize OAuth2Client instance.
     * @note This is a workaround for the following error:
     */
    this._oauth2Client = new google.auth.OAuth2({
      clientId: this.registryProvider.getConfig().GOOGLE_CLIENT_ID,
      redirectUri: this.registryProvider.getConfig().GOOGLE_REGIRECT_URL,
      clientSecret: this.registryProvider.getConfig().GOOGLE_CLIENT_SECRET,
    });
  }

  /**
   * @dev Generate authentication URL.
   * @returns {string} Authentication URL.
   */
  public generateAuthUrl(): string {
    return this._oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['email', 'profile'],
    });
  }
  /**
   * @dev Get OAuth2Client instance.
   * @returns {OAuth2Client} OAuth2Client instance.
   */
  public get oauth2Client(): OAuth2Client {
    return this._oauth2Client;
  }
}
