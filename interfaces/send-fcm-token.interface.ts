import { LanguageCode } from '@shared/core/system/enums/language-code';

import { FcmTopicType } from '../enums/fcm-topic-type';

export type TopicMainType = FcmTopicType | LanguageCode;
export type TopicType = TopicMainType | `test${TopicMainType}`;

export interface SendFcmTokenInterface {
  userId: string;
  token: string | string[];
  topics: TopicType[];
  unTopics?: TopicType[];
}
