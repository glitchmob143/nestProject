
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NotFoundError } from "rxjs";
import { User } from "src/user/user.entity";
import { UserRepository } from "src/user/user.repository";
import { UserService } from "src/user/user.service";
import { EntityRepository, ObjectID, Repository } from "typeorm";
import { Device, StatusEnum } from "./device.entity";
import { CreateDeviceDto } from "./dto/create-device.dto";

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device) public deviceRepository: Repository<Device>,
    private  userService: UserService
  ) {}

  async create({ name, tier }: CreateDeviceDto, user: User): Promise<any> {
    const device: Device = this.deviceRepository.create({ name, tier, status: StatusEnum.DISABLE});
    // const foundUser: User = await this.userService.userRepository.findOne({username: user.username});
    if(!tier){
        device.tier = 4;
    }
    // if(!foundUser.devices)
    // foundUser.devices = []
    // foundUser.devices.push(device);
    // console.log(foundUser);
    return await this.deviceRepository.save(device);
    // return await this.userService.userRepository.save(foundUser);
  }

  async assign(name: string, user: User) {
    const device = await this.deviceRepository.findOne({ name, tier: user.tier});
    if(!device){
        throw new NotFoundException("Device not found!")
    }
    if(device.status === StatusEnum.ENABLE){
        throw new NotFoundException("Device in use!")
    }
    device.status = StatusEnum.ENABLE;
    device.user = user;
    console.log(device.user); 
    
    return this.deviceRepository.save(device);
  }

  async free(name: string, user: User) {
    const device = await this.deviceRepository.findOne({ name, tier: user.tier});
    console.log(device);
    
    if(!device || device['userId']!==user._id){
        throw new NotFoundException("device not found!")
    }
    console.log(device);
    if(device.status === StatusEnum.DISABLE){
        throw new NotFoundException("Device was free already!")
    }     
    device.status = StatusEnum.DISABLE; 
    // device[0].user = null;
    return this.deviceRepository.save(device);
  }
}
