import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

class CreateVideoTypeDto {
  @IsString({
    message: 'Trường type_name phải là chuỗi',
  })
  @ApiProperty({
    example: 'Nhạc Tóp tóp',
    description: 'Tên thể loại video',
    enum() {
      return ['VNPAY', 'MOMO', 'ZALO', 'OTHER'];
    },
  })
  type_name: string;
  @IsString({ message: 'Trường icon phải là chuỗi' })
  icon: string;
}

export default CreateVideoTypeDto;
