import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

class LoginDto {
  @IsNotEmpty()
  @IsString({ message: 'Trường email phải là chuỗi' })
  @ApiProperty()
  @IsEmail(
    {
      allow_display_name: true,
    },
    { message: 'Email không đúng định dạng' },
  )
  email: string;

  @IsString({ message: 'Trường password phải là chuỗi' })
  @IsNotEmpty()
  @ApiProperty()
  pass_word: string;
}

export default LoginDto;
