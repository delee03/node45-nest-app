import { Injectable, Req } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(page: number, pageSize: number) {
    // let { page, pageSize } = req.query as any;
    console.log(page, pageSize);

    page = Number(page) > 0 ? Number(page) : 1;
    pageSize = Number(pageSize) > 0 ? Number(pageSize) : 3;

    const skip = (page - 1) * pageSize;

    //console.log(req.query, skip);

    const totalItems = await this.prisma.users.count();
    const totalPages = Math.ceil(totalItems / pageSize);

    const users = await this.prisma.users.findMany({
      take: pageSize,
      skip: skip, //tính ra được index bắt đầu lấy cho pageIndex
      orderBy: {
        created_at: 'desc',
      },
    });

    // console.log(result);

    return {
      page,
      pageSize,
      totalPages: totalPages,
      totalItems: totalItems,
      items: users || [],
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  uploadAvatar(file: Express.Multer.File) {
    console.log(file);
    return 'upload avatar local';
  }
}
