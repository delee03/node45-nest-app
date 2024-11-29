import { ConfigurableModuleBuilder, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoTypeModule } from './modules/video-type/video-type.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    VideoTypeModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

//command for creating a new module
// nest g module modules/user
// nest g controller modules/user
// nest g service modules/user  (--no-spec if you don't want to create a test file)

//command for creating a new controller shorthand
// nest g resource modules/user
