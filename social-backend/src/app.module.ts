import { SavedPostContainerModule } from './saved-posts/saved-post.module';
import { RolesGuard } from './roles.guard';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './database.config';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { MessageModule } from './message/message.module';
import { VideoModule } from './video/video.module';


@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), PostsModule, AuthModule, UsersModule, SavedPostContainerModule, MessageModule, VideoModule],
  providers: [
    // setting jwtAuthGuard for everyroute execept those with @Public decorator
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, 
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard, 
    },
  ]
})
export class AppModule {}
