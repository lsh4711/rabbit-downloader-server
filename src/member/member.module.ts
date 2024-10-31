import { AuthModule } from '@/auth/auth.module';
import { Member } from '@/member/entities/member.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';

@Module({
  imports: [MikroOrmModule.forFeature([Member]), AuthModule],
  controllers: [MemberController],
  providers: [MemberService],
  exports: [MemberService],
})
export class MemberModule {}
