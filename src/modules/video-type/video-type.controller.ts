import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { VideoTypeService } from './video-type.service';
import { access } from 'fs';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import CreateVideoTypeDto from './dto/create-videotype.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

// export type TVideoType = {
//   type_name: string;
//   icon: string;
// };

@Controller('video')
@ApiTags('VideoTypes')
export class VideoTypeController {
  constructor(public videoTypeService: VideoTypeService) {}

  // @UseGuards(AuthGuard('protect'))
  // @UseGuards(JwtAuthGuard)
  @Get('video-type')
  async getVideoType(
    @Query(`pageIndex`) page: string,
    @Headers('accessToken') accessToken: string,
    @Req() req: Request,
  ) {
    // console.log(page);
    // console.log(accessToken);
    // console.log({ req });
    console.log({ user: req.user });
    return await this.videoTypeService.getVideoType();
  }

  @Get('video-type/:id')
  async getVideoTypeById(@Param('id') videoId: number) {
    console.log(videoId);
    return await this.videoTypeService.getVideoTypeById(videoId);
  }

  @Post('create-video-type')
  async createVideoType(@Body() body: CreateVideoTypeDto) {
    console.log(body);
    return await this.videoTypeService.createVideoType(body);
  }
}
