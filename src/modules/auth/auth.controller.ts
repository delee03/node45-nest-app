import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import LoginDto from './dto/login.dto';
import { log } from 'console';
import { Public } from 'src/common/decorater/public.decorater';
import { LoggingInterceptor } from 'src/common/interceptor/loggin.interceptor';
import { ResponseMessage } from 'src/common/decorater/response-message.decorator';

@Controller('auth')
@UseInterceptors(LoggingInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ResponseMessage('Login success')
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
