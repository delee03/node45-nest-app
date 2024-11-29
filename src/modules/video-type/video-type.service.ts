import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import CreateVideoTypeDto from './dto/create-videotype.dto';

@Injectable()
export class VideoTypeService {
  constructor(public readonly prisma: PrismaService) {}
  async getVideoType() {
    const videoTypes = await this.prisma.video_type.findMany();
    // console.log('hello worlds');
    // console.log(videoTypes);
    return videoTypes;
  }

  async getVideoTypeById(id: number) {
    const videoTypeDetail = await this.prisma.video_type.findUnique({
      where: {
        type_id: +id,
      },
    });
    return videoTypeDetail;
  }

  async createVideoType(body: CreateVideoTypeDto) {
    const videoTypeNew = await this.prisma.video_type.create({
      data: {
        type_name: body.type_name,
        icon: body.icon,
      },
    });
    return videoTypeNew;
  }
}
