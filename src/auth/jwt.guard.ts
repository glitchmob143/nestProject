import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { Role } from "src/Decorators/roles.decorator";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){
}