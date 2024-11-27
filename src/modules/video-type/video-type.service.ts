import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class VideoTypeService {
  constructor(private readonly prisma: PrismaService) {}
  async getVideoType() {
    const videoTypes = await this.prisma.video_type.findMany();
    console.log('hello worlds');
    console.log(videoTypes);
  }
}
