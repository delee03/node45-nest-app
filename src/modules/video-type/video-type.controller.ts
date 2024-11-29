import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { VideoTypeService } from './video-type.service';
import { access } from 'fs';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';

export type TVideoType = {
  type_name: string;
  icon: string;
};

@Controller('video')
@ApiTags('VideoTypes')
export class VideoTypeController {
  constructor(public videoTypeService: VideoTypeService) {}

  @Get('video-type')
  async getVideoType(
    @Query(`pageIndex`) page: string,
    @Headers('accessToken') accessToken: string,
    @Req() req: Request,
  ) {
    // console.log(page);
    // console.log(accessToken);
    // console.log({ req });
    return await this.videoTypeService.getVideoType();
  }

  @Get('video-type/:id')
  async getVideoTypeById(@Param('id') videoId: number) {
    console.log(videoId);
    return await this.videoTypeService.getVideoTypeById(videoId);
  }

  @Post('create-video-type')
  async createVideoType(@Body() body: TVideoType) {
    console.log(body);
    return await this.videoTypeService.createVideoType(body);
  }
}
