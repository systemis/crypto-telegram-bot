import { Chat, User, Message } from 'node-telegram-bot-api';

/**
 * @lib /entities/message.entity.ts
 * @dev Define message entity for Telegram.
 * @see https://core.telegram.org/bots/api#message
 * @var {number} date Date the message was sent in Unix time.
 * @var {string} text For text messages, the actual UTF-8 text of the message.
 * @var {number} message_id Unique message identifier inside this chat.
 * @var {object} from Sender, empty for messages sent to channels.
 * @var {number} from.id Unique identifier for this user or bot.
 * @var {boolean} from.is_bot True, if this user is a bot.
 * @var {string} from.username User's or bot's username.
 * @var {string} from.first_name User's or bot's first name.
 * @var {string} from.language_code IETF language tag of the user's language.
 * @var {object} chat Conversation the message belongs to.
 * @var {number} chat.id Unique identifier for this chat.
 * @var {string} chat.type Type of chat, can be either “private”, “group”, “supergroup” or “channel”.
 * @var {string} chat.username Username, for private chats, supergroups and channels if available.
 * @var {string} chat.first_name First name of the other party in a private chat.
 */
export interface MessageEntity extends Message {
  from: User;
  chat: Chat;
  date: number;
  text: string;
  message_id: number;
}
