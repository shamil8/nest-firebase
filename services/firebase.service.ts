import { Injectable } from '@nestjs/common';
import { LoggerService } from '@app/logger/services/logger.service';
import * as admin from 'firebase-admin';

import config from '../../../config';
import { FirebaseConfig } from '../config/firebase.config';
import { NoticeContent } from '../interfaces/notice-i18n.interface';
import {
  SendFcmTokenInterface,
  TopicType,
} from '../interfaces/send-fcm-token.interface';

@Injectable()
export class FirebaseService {
  private readonly firebaseApp: admin.app.App;

  constructor(
    private readonly logger: LoggerService,
    private readonly firebaseConfig: FirebaseConfig,
  ) {
    this.firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(
        JSON.parse(this.firebaseConfig.accountSecret),
      ),
    });
  }

  async subscribeTokenMsgHandler(msg: SendFcmTokenInterface): Promise<void> {
    this.logger.debug('subscribeTokenMsgHandler', msg);

    /** Create user own topic by userId */
    if (typeof msg.token === 'string') {
      await this.subscribeToTopic(msg.token, msg.userId);
    }

    /** Create common topics */
    for (const topic of msg.topics) {
      await this.subscribeToTopic(msg.token, topic);
    }

    /** Unsubscribe from common topics (because user change langCode) */
    if (msg.unTopics) {
      for (const unTopic of msg.unTopics) {
        await this.unsubscribeFromTopic(msg.token, unTopic);
      }
    }
  }

  async sendByToken(message: admin.messaging.Message): Promise<void> {
    try {
      const res = await this.firebaseApp.messaging().send(message);

      this.logger.debug('Notification sent successfully:', res);
    } catch (err: any) {
      this.logger.error('Error sending notification by token:', {
        message: err.message,
        stack: this.sendByToken.name,
        extra: err,
      });

      throw err;
    }
  }

  async sendByTopic(
    topic: TopicType | string,
    notification: NoticeContent,
  ): Promise<void> {
    try {
      const res = await this.firebaseApp
        .messaging()
        .send({ topic, notification });

      this.logger.debug('Notification sent successfully:', res);
    } catch (err: any) {
      this.logger.error('Error sending notification:', {
        topic,
        errorMessage: err.message,
        stack: this.sendByTopic.name,
        extra: err,
      });

      throw err;
    }
  }

  private async subscribeToTopic(
    tokens: string | string[],
    topic: TopicType | string,
  ): Promise<void> {
    try {
      const response = await this.firebaseApp
        .messaging()
        .subscribeToTopic(tokens, this.getTopic(topic));

      this.logger.debug('Successfully subscribed to topic:', response);
    } catch (err: any) {
      this.logger.error('Error subscribeToTopic:', {
        stack: this.subscribeToTopic.name,
        extra: err,
      });
    }
  }

  private async unsubscribeFromTopic(
    tokens: string | string[],
    topic: TopicType,
  ): Promise<void> {
    try {
      const response = await this.firebaseApp
        .messaging()
        .unsubscribeFromTopic(tokens, this.getTopic(topic));

      this.logger.debug('Successfully unsubscribe from topic:', response);
    } catch (err: any) {
      this.logger.error('Error unsubscribeFromTopic:', {
        stack: this.unsubscribeFromTopic.name,
        extra: err,
      });
    }
  }

  private getTopic(topic: TopicType | string): string {
    return config.isDev ? `test${topic}` : topic;
  }
}
