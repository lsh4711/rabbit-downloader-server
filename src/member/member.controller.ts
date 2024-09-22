import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { MemberService } from './member.service';

class LoginDto {
  token: string;
}

type GoogleUserInfo = {
  sub: string;
  name: string;
  given_name: string;
  picture: string;
  email: string;
  email_verified: true;
};

@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post('login')
  async login(@Body() { token }: LoginDto) {
    const { email, sub }: GoogleUserInfo = await fetch(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      { headers: { Authorization: `Bearer ${token}` } },
    ).then<GoogleUserInfo>((r) => r.json());

    // const oauthId = `google_${sub}`;
    // const username = email.replace(/@.+/, '');
    //
    // const member: Member = new Member();

    return 'login';
  }

  // @Get('login')
  // @UseGuards(GoogleOauthGuard)
  // // @UseGuards(AuthGuard('oauth-google'))
  // async login() {}

  // @Get('callback')
  // @UseGuards(GoogleOauthGuard)
  // // @UseGuards(AuthGuard('oauth-google'))
  // async loginUsingCode(@Req() req: Request) {
  //   // console.log(req['user']);
  //   return 'ok';
  // }

  // @UseGuards(AuthGuard('oauth-google'))
  // @Get('callback')
  // async loginUsingToken(@Req() req: Request) {
  //   console.log(req['user']);
  //   return 'ok';
  // }

  @Post()
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.memberService.create(createMemberDto);
  }

  @Get()
  findAll() {
    return this.memberService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memberService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.memberService.update(+id, updateMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.memberService.remove(+id);
  }
}
