import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { MemberService } from './member.service';

// class LoginDto {
//   token: string;
// }

@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  // @UseGuards(AuthGuard('google'))
  // @Get('login')
  // // async login(@Body() { token }: LoginDto) {
  // async login(@Req() req: Request) {
  //   //   // const result = await fetch(
  //   //   //   'https://www.googleapis.com/oauth2/v3/userinfo',
  //   //   //   { headers: { Authorization: `Bearer ${token}` } },
  //   //   // ).then((r) => r.json());
  //   //   //
  //   //   // console.log(result);
  //   //   //
  //   //   // return 'login';
  // }

  @UseGuards(AuthGuard('oauth-google'))
  @Get('login')
  async login() {}

  @UseGuards(AuthGuard('oauth-google'))
  @Get('callback')
  async loginUsingCode(@Req() req: Request) {
    console.log(req['user']);
    return 'ok';
  }

  @UseGuards(AuthGuard('oauth-google'))
  @Get('callback')
  async loginUsingToken(@Req() req: Request) {
    console.log(req['user']);
    return 'ok';
  }

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
