import { Member, MemberRole } from '@/member/entities/member.entity';
import { MemberRepository } from '@/member/member.repository';
import { type FilterQuery, Transactional } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MemberService {
  constructor(private readonly memberRepository: MemberRepository) {}

  @Transactional()
  async create(member: Member) {
    member.role = MemberRole.MEMBER;
    return this.memberRepository.create(member);
  }

  @Transactional()
  async findOrCreate(member: Member) {
    const findMember = await this.findByOauthId(member.oauthId);

    if (findMember) {
      findMember.username = member.username;
      return findMember;
    }

    return this.create(member);
  }

  async findByOauthId(oauthId: string) {
    return this.memberRepository.findOne({ oauthId });
  }

  async findByMemberId(memberId: string) {
    return this.memberRepository.findOne({ memberId });
  }

  async exist(where: FilterQuery<Member>) {
    return this.memberRepository.count(where).then(Boolean);
  }
}
