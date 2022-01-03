import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthService } from "src/auth/auth.service";
import { Device } from "src/device/device.entity";
import { CreateUserDto } from "./create-user.dto";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) public userRepository: UserRepository,
    private readonly authService: AuthService
  ){}

  async createUser(createUserDto: CreateUserDto): Promise<User>{
    try{
      const hashedPAssword =  await this.authService.createUser(createUserDto);    
      const user: User =  await this.userRepository.createUser(createUserDto, hashedPAssword);
      const token = await this.authService.jwtSign(user.username, user._id);    
      user.token = token;
      return await this.userRepository.save(user);
    } catch (e){
      throw e;
    }
  }

  async addDevice(device: any, user: User){
    console.log(3);
    
    const foundUser = await this.userRepository.findOne({username: user.username});
    if(!foundUser.devices){
      foundUser.devices = [];
    }
    foundUser.devices.push(device);
    console.log(foundUser);
    
    return await this.userRepository.save(foundUser);
  }

}
