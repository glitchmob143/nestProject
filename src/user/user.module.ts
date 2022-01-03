import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthModule } from 'src/auth/auth.module';
import { LocalAuthGuard } from 'src/auth/Local.guard';
import { DeviceModule } from 'src/device/device.module';

@Module({
  imports: [forwardRef(()=> AuthModule) , forwardRef(()=>DeviceModule), TypeOrmModule.forFeature([UserRepository])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
