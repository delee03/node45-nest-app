import { BadRequestException, Injectable } from '@nestjs/common';
import LoginDto from './dto/login.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TUserExist } from 'src/common/types/common.type';
import {
  ACCESS_TOKEN_EXPIRE,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRE,
  REFRESH_TOKEN_SECRET,
} from 'src/common/constants/config.contant';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto) {
    //b1: nhận dữ liệu từ body
    const { email, pass_word } = loginDto;
    console.log({ email, pass_word });

    //b2: kiểm tra email tồn tại trong db hay chưa ?
    //TH1: - tồn tại => đi tiếp
    //TH2: - email không tồn tại => vui lòng đăng kí

    const userExist = await this.prisma.users.findFirst({
      where: {
        email: email,
      },
      select: {
        user_id: true,
        pass_word: true,
      },
    });
    if (!userExist) {
      throw new BadRequestException('User không tồn tại');
    }
    //B3: kiểm tra password
    console.log({ userExist });
    const isValidPassword = bcrypt.compareSync(pass_word, userExist.pass_word);
    if (!isValidPassword) {
      throw new BadRequestException('Sai mật khẩu');
    } //có thể trả về cho phép truy cập rồi tuy nhiên cần token và refresh token

    const tokens = this.createToken(userExist);

    return tokens;
  }

  async createToken(userExist: TUserExist) {
    console.log({
      token: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
    });
    const accessToken = this.jwtService.sign(
      { user_id: userExist.user_id },
      {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
        expiresIn: this.configService.get<string>('ACCESS_TOKEN_EXPIRE'),
      },
    );

    const refreshToken = this.jwtService.sign(
      { user_id: userExist.user_id },
      {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
        expiresIn: this.configService.get<string>('REFRESH_TOKEN_EXPIRE'),
      },
    );
    return { accessToken, refreshToken };
  }
}
