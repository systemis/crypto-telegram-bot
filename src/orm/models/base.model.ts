import { Document, ObjectId } from 'mongoose';

export class BaseModel extends Document {
  /**
   * @var {ObjectId} id ID of document.
   * @unique
   */
  id: ObjectId;

  /**
   * @var {Date} createdAt Time when document created.
   */
  createdAt: Date;

  /**
   * @var {Date} updatedAt Time when document updated.
   */
  updatedAt: Date;

  /**
   * @var {Date} deletedAt Time when document deleted.
   */
  deletedAt?: Date;
}
