import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  ParseFilePipeBuilder,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';
import { Multer } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import storage from 'src/common/multer/handleUploadLocal.multer';
import storageLocal from 'src/common/multer/handleUploadLocal.multer';
import storageCloud from 'src/common/multer/hanldeUploadCloud.multer';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileUploadDto } from './dto/file-upload.dto';
import { CustomFileInterceptor } from 'src/common/middlewares/file-upload.interceptor';

@Controller('user')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create new user' })
  @ApiBody({
    description: 'Create new user',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  async findAll(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ): Promise<any> {
    return await this.userService.findAll(page, pageSize);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  //Upload Avatar Local Handler
  @Post('avatar-local')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload avatar local' })
  @ApiBody({
    description: 'Avatar Local for User',
    type: FileUploadDto,
  })
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: storageLocal,
    }),
  )
  async uploadAvatarLocal(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    try {
      // Validation passed, now proceed with the file processing
      return this.userService.uploadAvatar(file);
    } catch (error) {
      // Handle validation or file upload errors here
      throw new Error('File upload failed. ' + error.message);
    }
  }

  //Upload Avatar Cloud
  @Post('avatar-cloud')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload avatar cloud' })
  @ApiBody({
    description: 'Avatar cloud for User',
    type: FileUploadDto,
  })
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: storageCloud,
    }),
  )
  uploadAvatarCloud(@UploadedFile() file: Express.Multer.File) {
    return this.userService.uploadAvatar(file);
  }
}
