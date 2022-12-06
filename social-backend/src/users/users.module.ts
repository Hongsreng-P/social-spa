import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.enitity';
import { AuthModule } from 'src/auth/auth.module';
import { UserInfo } from './entities/user-info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserInfo]), forwardRef(() => AuthModule)],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
