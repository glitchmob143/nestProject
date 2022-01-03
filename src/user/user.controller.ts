/* eslint-disable prettier/prettier */
import { Body, Controller, Get, NotFoundException, Post, Redirect, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { JwtAuthGuard } from "src/auth/jwt.guard";
import { LocalAuthGuard } from "src/auth/Local.guard";
import { AllCapsPipe } from "src/Pipes/all-caps.pipe";
import { CreateUserDto } from "./create-user.dto";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  //create user
  @Post()
  async createUser(@Body(AllCapsPipe) createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  //user login
  @UseGuards(LocalAuthGuard)
  @Get()
  async login(@Req() req: Request) {
    return req['user'];
    // return this.authService.login(username, password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/allUsers')
  async getAllUsers(): Promise<User[]>{ 
    const users =  await this.userService.userRepository.find({relations: ['devices']});
    if(!users){
      throw new NotFoundException()
    }
    return users;
  }
}
