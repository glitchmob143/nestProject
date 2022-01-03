import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/create-user.dto';
import { UserRepository } from 'src/user/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository) private userRepository: UserRepository,
        private readonly jwtService: JwtService
      ){}

    async createUser(createUserDto: CreateUserDto){
        const {password} = createUserDto;
        const hashedPAssword  = await bcrypt.hash(password, 8);
        return hashedPAssword;
    }

    async login(username: string, pass: string){        
        const {password, ...result}  = await this.userRepository.findOne({username});
        if(await bcrypt.compare(pass, password)){
            result.token = await this.jwtSign(result.username, result._id);
            this.userRepository.save(result);
            return result;
        }
    }

    async jwtSign(username: string, id: string) {
        const payload: JwtPayload = {
            username,
            sub: id
        };
        const token = this.jwtService.sign(payload);
        return token;
        
    }
}
