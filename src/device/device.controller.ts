import { Body, Controller, DefaultValuePipe, Get, Param, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt.guard";
import { RolesGuard } from "src/auth/roles.guard";
import { GetUser } from "src/Decorators/get-user.decorator";
import { Role, Roles } from "src/Decorators/roles.decorator";
import { User } from "src/user/user.entity";
import { UserService } from "src/user/user.service";
import { Device, StatusEnum } from "./device.entity";
import { DeviceService } from "./device.service";
import { CreateDeviceDto } from "./dto/create-device.dto";

@Controller("device")
@UseGuards(JwtAuthGuard)
export class DeviceController {
  constructor(private readonly deviceService: DeviceService, private readonly userService: UserService) {}
  //create a device
  @Post("/create")
  @Roles(Role.tier1)
  @UseGuards(RolesGuard)
  async create(@Body() createDeviceDto: CreateDeviceDto, @GetUser() paramuser: User): Promise<any> {
    const {user, ...rest}: Device  = await this.deviceService.create(createDeviceDto, paramuser);
    console.log(1);
    // await this.userService.addDevice(rest, user);
    console.log(2);
    
    return {...rest};
  }
  //assign a device
  @Post("/assign/:name")
  async assign(@Param("name") name: string, @GetUser() user: User): Promise<Device> {
    return await this.deviceService.assign(name, user);
  }
  //free a device
  @Post("/free/:name")
  async free(@Param("name") name: string, @GetUser() user: User): Promise<Device> {
    return await this.deviceService.free(name, user);
  }

  @Get('/allDevices')
  async getAllDevices(@GetUser() user: User){
    return await this.deviceService.deviceRepository.find({tier: user.tier});
  }

  @Get('/deviceDatabase')
  async deviceDatabase(){
    return await this.deviceService.deviceRepository.find({relations: ['user']});
  }

  @Get('/allDevices/available')
  async availableDevices(@GetUser() user: User){
    return await this.deviceService.deviceRepository.find({tier: user.tier, status: StatusEnum.DISABLE});
  }

  @Get('/allDevices/unavailable')
  async unavailableDevices(@GetUser() user: User){
    return await this.deviceService.deviceRepository.find({tier: user.tier, status: StatusEnum.ENABLE});
  }

  @Get('/yourDevices')
  async yourDevics(@GetUser() user: User){
    return await this.deviceService.deviceRepository.find({user, status: StatusEnum.ENABLE});
  }
}
