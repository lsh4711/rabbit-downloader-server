import { Member } from '@/member/entities/member.entity';
import { MemberRepository } from '@/member/member.repository';
import { Transactional } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class MemberService {
  constructor(private readonly memberRepository: MemberRepository) {}

  async create(member: Member) {
    await this.memberRepository.insert(member);
    return member;
  }

  findAll() {
    return `This action returns all members`;
  }

  findOne(id: number) {
    return `This action returns a #${id} member`;
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${id} member`;
  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }

  async findByOauthId(oauthId: string) {
    return this.memberRepository.findOne({ oauthId });
  }

  async findByMemberId(memberId: bigint) {
    return this.memberRepository.findOne({ memberId });
  }

  manage(member: Member) {
    this.memberRepository.create(member);
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

  // async flush() {
  //   await this.memberRepository.getEntityManager().flush();
  // }
}
