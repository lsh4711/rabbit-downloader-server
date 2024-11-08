import { AppModule } from '#@/app.module';
import { AuthService } from '#@/auth/auth.service';
import { Member, MemberRole } from '#@/member/entities/member.entity';
import { MemberService } from '#@/member/member.service';
import type { MemberPayload } from '#@/types/common';
import { TestUtil } from '#@/utils/test.util';
import { MikroORM } from '@mikro-orm/mysql';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

let app: INestApplication;
let orm: MikroORM;
let moduleRef: TestingModule;
let token: string;

beforeAll(async () => {
  moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  app = moduleRef.createNestApplication();
  orm = app.get(MikroORM);

  await orm.schema.refreshDatabase();
  token = await TestUtil.generateTestToken(app);

  await app.init();

  // Wait common notice and playwright init.
  await new Promise((resolve) => setTimeout(resolve, 1000));
});

beforeEach(jest.restoreAllMocks);

afterAll(async () => {
  await orm.schema.dropDatabase();
  await orm.close(true);
  await moduleRef.close();
  await app.close();
});

describe('DownloadController', () => {
  test('should return parsed text', async () => {
    // It seems strange, but this is the actual data format.
    const html = `

              <div class="view-img">
  </div>

              <div class="ce708b33748">

                                  <h1 style="font-size:36px;">제01화</h1>

  <h2 style="font-size:27px;">01화</h2>


  <p>테스트 문장 1.</p>
  <p>'테스트 문장 2.'</p>
  <p>“테스트 문장 3.”</p>

              </div>

                      `;
    expect(html).toMatchSnapshot();

    const res = await request(app.getHttpServer(), {})
      .post('/download/parse')
      .set('cookie', `rabbit=${token}`)
      .send({ html });

    expect(res.status).toBe(HttpStatus.OK);
    expect(res.text).toMatchSnapshot();
  });

  test('should return decoded html tag', async () => {
    const code =
      '3C.64.69.76.20.63.6C.61.73.73.3D.22.76.69.65.77.2D.69.6D.67.22.3E.0A.3C.2F.64.69.76.3E.0A.0D.0A.20.20.20.20.20.20.20.20.20.20.20.20.3C.64.69.76.20.63.6C.61.73.73.3D.22.6B.62.38.62.61.66.37.38.36.34.34.22.3E.0D.0A.0D.0A.20.20.20.20.20.20.20.20.20.20.20.20.20.20.20.20.20.20.20.20.20.20.20.20.20.20.20.20.20.20.20.20.20.20.20.20.20.20.20.20.20.20.20.20.20.20.20.20.3C.69.6D.67.20.73.72.63.3D.22.2F.69.6D.67.2F.6C.6F.61.64.69.6E.67.2D.69.6D.61.67.65.2E.67.69.66.22.20.64.61.74.61.2D.6D.61.36.64.30.33.63.63.38.36.35.3D.22.68.74.74.70.73.3A.2F.2F.69.6D.67.32.2E.6E.65.77.74.6F.6B.69.32.30.2E.6F.72.67.2F.64.61.74.61.2F.66.69.6C.65.2F.63.6F.6D.69.63.2F.34.36.36.34.32.32.2F.34.38.32.35.34.37.2F.77.31.35.37.35.34.39.37.37.30.34.31.39.33.32.5F.35.64.65.38.32.66.65.38.32.66.32.39.38.2E.6A.70.67.22.20.2F.3E.3C.69.6D.67.20.73.72.63.3D.22.2F.69.6D.67.2F.6C.6F.61.64.69.6E.67.2D.69.6D.61.67.65.2E.67.69.66.22.20.64.61.74.61.2D.6D.61.36.64.30.33.63.63.38.36.35.3D.22.68.74.74.70.73.3A.2F.2F.69.6D.67.32.2E.6E.65.77.74.6F.6B.69.32.30.2E.6F.72.67.2F.64.61.74.61.2F.66.69.6C.65.2F.63.6F.6D.69.63.2F.34.36.36.34.32.32.2F.34.38.32.35.34.37.2F.77.31.35.37.35.34.39.37.37.30.34.31.39.34.31.5F.35.64.65.38.32.66.65.38.32.66.36.36.38.2E.6A.70.67.22.20.2F.3E.3C.69.6D.67.20.73.72.63.3D.22.2F.69.6D.67.2F.6C.6F.61.64.69.6E.67.2D.69.6D.61.67.65.2E.67.69.66.22.20.64.61.74.61.2D.6D.61.36.64.30.33.63.63.38.36.35.3D.22.68.74.74.70.73.3A.2F.2F.69.6D.67.32.2E.6E.65.77.74.6F.6B.69.32.30.2E.6F.72.67.2F.64.61.74.61.2F.66.69.6C.65.2F.63.6F.6D.69.63.2F.34.36.36.34.32.32.2F.34.38.32.35.34.37.2F.77.31.35.37.35.34.39.37.37.30.34.31.39.34.38.5F.35.64.65.38.32.66.65.38.32.66.39.30.61.2E.6A.70.67.22.20.2F.3E.3C.69.6D.67.20.73.72.63.3D.22.2F.69.6D.67.2F.6C.6F.61.64.69.6E.67.2D.69.6D.61.67.65.2E.67.69.66.22.20.64.61.74.61.2D.6D.61.36.64.30.33.63.63.38.36.35.3D.22.68.74.74.70.73.3A.2F.2F.69.6D.67.32.2E.6E.65.77.74.6F.6B.69.32.30.2E.6F.72.67.2F.64.61.74.61.2F.66.69.6C.65.2F.63.6F.6D.69.63.2F.34.36.36.34.32.32.2F.34.38.32.35.34.37.2F.77.31.35.37.35.34.39.37.37.30.34.31.39.35.35.5F.35.64.65.38.32.66.65.38.32.66.62.39.31.2E.6A.70.67.22.20.2F.3E.3C.69.6D.67.20.73.72.63.3D.22.2F.69.6D.67.2F.6C.6F.61.64.69.6E.67.2D.69.6D.61.67.65.2E.67.69.66.22.20.64.61.74.61.2D.6D.61.36.64.30.33.63.63.38.36.35.3D.22.68.74.74.70.73.3A.2F.2F.69.6D.67.32.2E.6E.65.77.74.6F.6B.69.32.30.2E.6F.72.67.2F.64.61.74.61.2F.66.69.6C.65.2F.63.6F.6D.69.63.2F.34.36.36.34.32.32.2F.34.38.32.35.34.37.2F.77.31.35.37.35.34.39.37.37.30.34.31.39.36.31.5F.35.64.65.38.32.66.65.38.32.66.65.31.33.2E.6A.70.67.22.20.2F.3E.3C.69.6D.67.20.73.72.63.3D.22.2F.69.6D.67.2F.6C.6F.61.64.69.6E.67.2D.69.6D.61.67.65.2E.67.69.66.22.20.64.61.74.61.2D.6D.61.36.64.30.33.63.63.38.36.35.3D.22.68.74.74.70.73.3A.2F.2F.69.6D.67.32.2E.6E.65.77.74.6F.6B.69.32.30.2E.6F.72.67.2F.64.61.74.61.2F.66.69.6C.65.2F.63.6F.6D.69.63.2F.34.36.36.34.32.32.2F.34.38.32.35.34.37.2F.77.31.35.37.35.34.39.37.37.30.34.31.39.37.5F.35.64.65.38.32.66.65.38.33.30.31.62.32.2E.6A.70.67.22.20.2F.3E.3C.69.6D.67.20.73.72.63.3D.22.2F.69.6D.67.2F.6C.6F.61.64.69.6E.67.2D.69.6D.61.67.65.2E.67.69.66.22.20.64.61.74.61.2D.6D.61.36.64.30.33.63.63.38.36.35.3D.22.68.74.74.70.73.3A.2F.2F.69.6D.67.32.2E.6E.65.77.74.6F.6B.69.32.30.2E.6F.72.67.2F.64.61.74.61.2F.66.69.6C.65.2F.63.6F.6D.69.63.2F.34.36.36.34.32.32.2F.34.38.32.35.34.37.2F.77.31.35.37.35.34.39.37.37.30.34.31.39.37.37.5F.35.64.65.38.32.66.65.38.33.30.34.37.30.2E.6A.70.67.22.20.2F.3E.3C.69.6D.67.20.73.72.63.3D.22.2F.69.6D.67.2F.6C.6F.61.64.69.6E.67.2D.69.6D.61.67.65.2E.67.69.66.22.20.64.61.74.61.2D.6D.61.36.64.30.33.63.63.38.36.35.3D.22.68.74.74.70.73.3A.2F.2F.69.6D.67.32.2E.6E.65.77.74.6F.6B.69.32.30.2E.6F.72.67.2F.64.61.74.61.2F.66.69.6C.65.2F.63.6F.6D.69.63.2F.34.36.36.34.32.32.2F.34.38.32.35.34.37.2F.77.31.35.37.35.34.39.37.37.30.34.31.39.38.34.5F.35.64.65.38.32.66.65.38.33.30.37.35.39.2E.6A.70.67.22.20.2F.3E.3C.69.6D.67.20.73.72.63.3D.22.2F.69.6D.67.2F.6C.6F.61.64.69.6E.67.2D.69.6D.61.67.65.2E.67.69.66.22.20.64.61.74.61.2D.6D.61.36.64.30.33.63.63.38.36.35.3D.22.68.74.74.70.73.3A.2F.2F.69.6D.67.32.2E.6E.65.77.74.6F.6B.69.32.30.2E.6F.72.67.2F.64.61.74.61.2F.66.69.6C.65.2F.63.6F.6D.69.63.2F.34.36.36.34.32.32.2F.34.38.32.35.34.37.2F.77.31.35.37.35.34.39.37.37.30.34.31.39.39.31.5F.35.64.65.38.32.66.65.38.33.30.39.65.63.2E.6A.70.67.22.20.2F.3E.3C.69.6D.67.20.73.72.63.3D.22.2F.69.6D.67.2F.6C.6F.61.64.69.6E.67.2D.69.6D.61.67.65.2E.67.69.66.22.20.64.61.74.61.2D.6D.61.36.64.30.33.63.63.38.36.35.3D.22.68.74.74.70.73.3A.2F.2F.69.6D.67.32.2E.6E.65.77.74.6F.6B.69.32.30.2E.6F.72.67.2F.64.61.74.61.2F.66.69.6C.65.2F.63.6F.6D.69.63.2F.34.36.36.34.32.32.2F.34.38.32.35.34.37.2F.77.31.35.37.35.34.39.37.37.30.34.31.39.39.37.5F.35.64.65.38.32.66.65.38.33.30.63.31.64.2E.6A.70.67.22.20.2F.3E.3C.69.6D.67.20.73.72.63.3D.22.2F.69.6D.67.2F.6C.6F.61.64.69.6E.67.2D.69.6D.61.67.65.2E.67.69.66.22.20.64.61.74.61.2D.6D.61.36.64.30.33.63.63.38.36.35.3D.22.68.74.74.70.73.3A.2F.2F.69.6D.67.32.2E.6E.65.77.74.6F.6B.69.32.30.2E.6F.72.67.2F.64.61.74.61.2F.66.69.6C.65.2F.63.6F.6D.69.63.2F.34.36.36.34.32.32.2F.34.38.32.35.34.37.2F.77.31.35.37.35.34.39.37.37.30.34.32.30.30.33.5F.35.64.65.38.32.66.65.38.33.30.65.38.35.2E.6A.70.67.22.20.2F.3E.3C.69.6D.67.20.73.72.63.3D.22.2F.69.6D.67.2F.6C.6F.61.64.69.6E.67.2D.69.6D.61.67.65.2E.67.69.66.22.20.64.61.74.61.2D.6D.61.36.64.30.33.63.63.38.36.35.3D.22.68.74.74.70.73.3A.2F.2F.69.6D.67.32.2E.6E.65.77.74.6F.6B.69.32.30.2E.6F.72.67.2F.64.61.74.61.2F.66.69.6C.65.2F.63.6F.6D.69.63.2F.34.36.36.34.32.32.2F.34.38.32.35.34.37.2F.77.31.35.37.35.34.39.37.37.30.34.32.30.31.5F.35.64.65.38.32.66.65.38.33.31.31.31.30.2E.6A.70.67.22.20.2F.3E.3C.69.6D.67.20.73.72.63.3D.22.2F.69.6D.67.2F.6C.6F.61.64.69.6E.67.2D.69.6D.61.67.65.2E.67.69.66.22.20.64.61.74.61.2D.6D.61.36.64.30.33.63.63.38.36.35.3D.22.68.74.74.70.73.3A.2F.2F.69.6D.67.32.2E.6E.65.77.74.6F.6B.69.32.30.2E.6F.72.67.2F.64.61.74.61.2F.66.69.6C.65.2F.63.6F.6D.69.63.2F.34.36.36.34.32.32.2F.34.38.32.35.34.37.2F.77.31.35.37.35.34.39.37.37.30.34.32.30.31.35.5F.35.64.65.38.32.66.65.38.33.31.33.32.31.2E.6A.70.67.22.20.2F.3E.3C.69.6D.67.20.73.72.63.3D.22.2F.69.6D.67.2F.6C.6F.61.64.69.6E.67.2D.69.6D.61.67.65.2E.67.69.66.22.20.64.61.74.61.2D.6D.61.36.64.30.33.63.63.38.36.35.3D.22.68.74.74.70.73.3A.2F.2F.69.6D.67.32.2E.6E.65.77.74.6F.6B.69.32.30.2E.6F.72.67.2F.64.61.74.61.2F.66.69.6C.65.2F.63.6F.6D.69.63.2F.34.36.36.34.32.32.2F.34.38.32.35.34.37.2F.77.31.35.37.35.34.39.37.37.30.34.32.30.32.31.5F.35.64.65.38.32.66.65.38.33.31.35.37.36.2E.6A.70.67.22.20.2F.3E.3C.69.6D.67.20.73.72.63.3D.22.2F.69.6D.67.2F.6C.6F.61.64.69.6E.67.2D.69.6D.61.67.65.2E.67.69.66.22.20.64.61.74.61.2D.6D.61.36.64.30.33.63.63.38.36.35.3D.22.68.74.74.70.73.3A.2F.2F.69.6D.67.32.2E.6E.65.77.74.6F.6B.69.32.30.2E.6F.72.67.2F.64.61.74.61.2F.66.69.6C.65.2F.63.6F.6D.69.63.2F.34.36.36.34.32.32.2F.34.38.32.35.34.37.2F.77.31.35.37.35.34.39.37.37.30.34.32.30.32.36.5F.35.64.65.38.32.66.65.38.33.31.37.39.34.2E.6A.70.67.22.20.2F.3E.3C.69.6D.67.20.73.72.63.3D.22.2F.69.6D.67.2F.6C.6F.61.64.69.6E.67.2D.69.6D.61.67.65.2E.67.69.66.22.20.64.61.74.61.2D.6D.61.36.64.30.33.63.63.38.36.35.3D.22.68.74.74.70.73.3A.2F.2F.69.6D.67.32.2E.6E.65.77.74.6F.6B.69.32.30.2E.6F.72.67.2F.64.61.74.61.2F.66.69.6C.65.2F.63.6F.6D.69.63.2F.34.36.36.34.32.32.2F.34.38.32.35.34.37.2F.77.31.35.37.35.34.39.37.37.30.34.32.30.33.32.5F.35.64.65.38.32.66.65.38.33.31.39.63.63.2E.6A.70.67.22.20.2F.3E.3C.69.6D.67.20.73.72.63.3D.22.2F.69.6D.67.2F.6C.6F.61.64.69.6E.67.2D.69.6D.61.67.65.2E.67.69.66.22.20.64.61.74.61.2D.6D.61.36.64.30.33.63.63.38.36.35.3D.22.68.74.74.70.73.3A.2F.2F.69.6D.67.32.2E.6E.65.77.74.6F.6B.69.32.30.2E.6F.72.67.2F.64.61.74.61.2F.66.69.6C.65.2F.63.6F.6D.69.63.2F.34.36.36.34.32.32.2F.34.38.32.35.34.37.2F.77.31.35.37.35.34.39.37.37.30.34.32.30.34.31.5F.35.64.65.38.32.66.65.38.33.31.64.32.62.2E.6A.70.67.22.20.2F.3E.3C.69.6D.67.20.73.72.63.3D.22.2F.69.6D.67.2F.6C.6F.61.64.69.6E.67.2D.69.6D.61.67.65.2E.67.69.66.22.20.64.61.74.61.2D.6D.61.36.64.30.33.63.63.38.36.35.3D.22.68.74.74.70.73.3A.2F.2F.69.6D.67.32.2E.6E.65.77.74.6F.6B.69.32.30.2E.6F.72.67.2F.64.61.74.61.2F.66.69.6C.65.2F.63.6F.6D.69.63.2F.34.36.36.34.32.32.2F.34.38.32.35.34.37.2F.77.31.35.37.35.34.39.37.37.30.34.32.30.35.5F.35.64.65.38.32.66.65.38.33.32.30.65.34.2E.6A.70.67.22.20.2F.3E.3C.69.6D.67.20.73.72.63.3D.22.2F.69.6D.67.2F.6C.6F.61.64.69.6E.67.2D.69.6D.61.67.65.2E.67.69.66.22.20.64.61.74.61.2D.6D.61.36.64.30.33.63.63.38.36.35.3D.22.68.74.74.70.73.3A.2F.2F.69.6D.67.32.2E.6E.65.77.74.6F.6B.69.32.30.2E.6F.72.67.2F.64.61.74.61.2F.66.69.6C.65.2F.63.6F.6D.69.63.2F.34.36.36.34.32.32.2F.34.38.32.35.34.37.2F.77.31.35.37.35.34.39.37.37.30.34.32.30.35.37.5F.35.64.65.38.32.66.65.38.33.32.33.62.30.2E.6A.70.67.22.20.2F.3E.3C.69.6D.67.20.73.72.63.3D.22.2F.69.6D.67.2F.6C.6F.61.64.69.6E.67.2D.69.6D.61.67.65.2E.67.69.66.22.20.64.61.74.61.2D.6D.61.36.64.30.33.63.63.38.36.35.3D.22.68.74.74.70.73.3A.2F.2F.69.6D.67.32.2E.6E.65.77.74.6F.6B.69.32.30.2E.6F.72.67.2F.64.61.74.61.2F.66.69.6C.65.2F.63.6F.6D.69.63.2F.34.36.36.34.32.32.2F.34.38.32.35.34.37.2F.77.31.35.37.35.34.39.37.37.30.34.32.30.36.33.5F.35.64.65.38.32.66.65.38.33.32.36.30.64.2E.6A.70.67.22.20.2F.3E.3C.69.6D.67.20.73.72.63.3D.22.2F.69.6D.67.2F.6C.6F.61.64.69.6E.67.2D.69.6D.61.67.65.2E.67.69.66.22.20.64.61.74.61.2D.6D.61.36.64.30.33.63.63.38.36.35.3D.22.68.74.74.70.73.3A.2F.2F.69.6D.67.32.2E.6E.65.77.74.6F.6B.69.32.30.2E.6F.72.67.2F.64.61.74.61.2F.66.69.6C.65.2F.63.6F.6D.69.63.2F.34.36.36.34.32.32.2F.34.38.32.35.34.37.2F.77.31.35.37.35.34.39.37.37.30.34.32.30.37.5F.35.64.65.38.32.66.65.38.33.32.38.38.37.2E.6A.70.67.22.20.2F.3E.3C.69.6D.67.20.73.72.63.3D.22.2F.69.6D.67.2F.6C.6F.61.64.69.6E.67.2D.69.6D.61.67.65.2E.67.69.66.22.20.64.61.74.61.2D.6D.61.36.64.30.33.63.63.38.36.35.3D.22.68.74.74.70.73.3A.2F.2F.69.6D.67.32.2E.6E.65.77.74.6F.6B.69.32.30.2E.6F.72.67.2F.64.61.74.61.2F.66.69.6C.65.2F.63.6F.6D.69.63.2F.34.36.36.34.32.32.2F.34.38.32.35.34.37.2F.77.31.35.37.35.34.39.37.37.30.34.32.30.37.36.5F.35.64.65.38.32.66.65.38.33.32.61.63.62.2E.6A.70.67.22.20.2F.3E.0D.0A.20.20.20.20.20.20.20.20.20.20.20.20.3C.2F.64.69.76.3E.0D.0A.0D.0A.20.20.20.20.20.20.20.20.20.20.20.20.';
    expect(code).toMatchSnapshot();

    const res = await request(app.getHttpServer(), {})
      .post('/download/decode')
      .set('cookie', `rabbit=${token}`)
      .send({ code });

    expect(res.status).toBe(HttpStatus.OK);
    expect(res.text).toMatchSnapshot();
  });
});

describe('MemberController', () => {
  test('google oauth login', async () => {
    const res1 = await request(app.getHttpServer()).post('/members/login');

    expect(res1.status).toBe(HttpStatus.BAD_REQUEST);
    expect(res1.body).toEqual({
      error: 'Bad Request',
      message: 'body must contains token',
      statusCode: 400,
    });

    const testToken = 'test-token';
    const loadGoogleMember = jest.spyOn(
      app.get(AuthService),
      'loadGoogleMember',
    );

    const blockedMember = new Member({ oauthId: 'block', username: 'block' });
    blockedMember.role = MemberRole.BLOCK;
    loadGoogleMember.mockResolvedValue(blockedMember);

    const res2 = await request(app.getHttpServer())
      .post('/members/login')
      .send({ token: testToken });

    expect(loadGoogleMember).toHaveBeenCalledWith(testToken);
    expect(res2.status).toBe(HttpStatus.UNAUTHORIZED);
    expect(res2.body).toEqual({
      message: 'Unauthorized',
      statusCode: 401,
    });

    const member = new Member({ oauthId: 'member', username: 'member' });
    member.memberId = '2';
    member.role = MemberRole.MEMBER;
    loadGoogleMember.mockResolvedValue(member);
    const findByMemberId = jest
      .spyOn(app.get(MemberService), 'findByMemberId')
      .mockResolvedValue(member);

    const res3 = await request(app.getHttpServer())
      .post('/members/login')
      .send({ token: testToken });
    const payload = await app
      .get(JwtService)
      .verifyAsync<MemberPayload>(res3.headers['authorization']);

    expect(loadGoogleMember).toHaveBeenCalledWith(testToken);
    expect(findByMemberId).toHaveBeenCalledWith(member.memberId);
    expect(res3.status).toBe(HttpStatus.OK);
    expect(res3.body).toEqual(member);
    expect(payload).toHaveProperty('memberId', member.memberId);
    expect(payload).toHaveProperty('role', member.role);
    expect(payload).toHaveProperty('username', member.username);
  });
});
