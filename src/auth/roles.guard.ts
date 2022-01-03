import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "src/Decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private reflector: Reflector){}
    canActivate(context: ExecutionContext): boolean {
        const tiers = this.reflector.getAll<Role[]>('roles',[context.getHandler()]);
        
        if(!tiers){
            return true;
        }
        const {user} = context.switchToHttp().getRequest();
        
        return tiers.some((tier)=> user.tier===tier);

    }
}