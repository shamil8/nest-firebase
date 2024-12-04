import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from '@app/logger/logger.module';

import { FirebaseConfig } from './config/firebase.config';
import { FirebaseService } from './services/firebase.service';

@Module({
  imports: [ConfigModule, LoggerModule],
  controllers: [],
  providers: [
    // configs
    FirebaseConfig,

    // services
    FirebaseService,
  ],
  exports: [FirebaseService],
})
export class FirebaseModule {}
