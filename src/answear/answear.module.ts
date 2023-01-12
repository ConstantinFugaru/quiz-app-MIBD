import { Module } from '@nestjs/common';
import { AnswearService } from './answear.service';

@Module({
  providers: [AnswearService]
})
export class AnswearModule {}
