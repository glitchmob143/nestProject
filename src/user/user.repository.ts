/* eslint-disable prettier/prettier */
import { forwardRef, HttpException, Inject } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { AllExceptionsFilter } from "src/exception-filters/exception.filter";
import { EntityRepository, MongoError, Repository } from "typeorm";
import { CreateUserDto } from "./create-user.dto";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    // constructor( @Inject(forwardRef(() => AuthService)) private readonly authService: AuthService){
    //     super();
    // }

    async createUser(createUserDto: CreateUserDto, hashedPAssword: string): Promise<User>{
        try{
        const {name, username, tier} = createUserDto;
        console.log(name, username, hashedPAssword);
        const user = new User();
        user.name = name;         
        user.username = username;
        user.password= hashedPAssword;
        user.tier = tier;
        return await this.save(user);
        } catch(e){
            e.message = "Username/ Name already taken!"
            throw e ;
        }
        
    }
}
