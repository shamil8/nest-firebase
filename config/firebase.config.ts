import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFileSync } from 'node:fs';
import path from 'path';

@Injectable()
export class FirebaseConfig {
  /** Path to Firebase service account key file */
  public readonly accountSecret: string;

  constructor(private readonly configService: ConfigService) {
    this.accountSecret = readFileSync(
      path.resolve(
        this.configService.getOrThrow<string>('FIREBASE_ACCOUNT_PATH'),
      ),
      'utf8',
    );
  }
}
