import { Member } from '@/member/entities/member.entity';
import { EntityRepository } from '@mikro-orm/mysql';

export class MemberRepository extends EntityRepository<Member> {}
