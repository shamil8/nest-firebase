import { LanguageCode } from '@shared/core/system/enums/language-code';

export interface NoticeContent {
  title: string;
  body: string;
}

export type NoticeI18nType = {
  [key in keyof typeof LanguageCode]: NoticeContent;
};
