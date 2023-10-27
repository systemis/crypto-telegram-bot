import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from '@/src/orm/models/user.model';

@Injectable()
export class TelegramAuthProvider {
  constructor(
    @InjectModel(UserModel.name)
    private readonly userDataRepo: Model<UserModel>,
  ) {}

  /**
   * @dev Find user by telegram ID.
   * @param {number} telegramId Telegram ID.
   * @returns {Promise<UserModel>} User.
   */
  public async findUserByTelegramId(
    telegramId: number,
  ): Promise<UserModel | null> {
    return await this.userDataRepo.findOne({
      telegramId,
    });
  }
}
