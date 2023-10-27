import { Injectable } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { BaseModel } from './base.model';
import { UserEntity } from '@/src/entities/user.entity';

@Injectable()
@Schema({ collection: 'user', timestamps: true, autoIndex: true })
export class UserModel extends BaseModel implements UserEntity {
  /**
   * @dev Username of user.
   * @var {string} username Username.
   */
  @Prop({ type: String })
  username: string;

  @Prop({ type: String })
  firstName: string;

  @Prop({ type: Number })
  telegramId: number;
}

/**
 * @dev Trigger create schema.
 */
export const UserSchema = SchemaFactory.createForClass(UserModel);

/**
 * @dev Trigger create index if not exists
 */
UserSchema.index({ id: 'asc' }, { unique: true });
UserSchema.index({ username: 'asc' }, { unique: true });
UserSchema.index({ createdAt: 'asc' });

/**
 * @dev Define generic type for typescript reference.
 */
export type UserDocument = Document & UserEntity;
