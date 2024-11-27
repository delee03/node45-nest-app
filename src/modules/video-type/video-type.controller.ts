import { Controller, Get } from '@nestjs/common';
import { VideoTypeService } from './video-type.service';

@Controller('video')
export class VideoTypeController {
  constructor(public videoTypeService: VideoTypeService) {}

  @Get('video-type')
  getVideoType() {
    this.videoTypeService.getVideoType();
  }
}
