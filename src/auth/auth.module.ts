import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "src/user/user.repository";
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";
import { LocalAuthGuard } from "./Local.guard";
import { LocalStrategy } from "./local.strategy";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { JwtAuthGuard } from "./jwt.guard";
import { UserModule } from "src/user/user.module";

@Module({
  imports: [
    forwardRef(()=> UserModule),
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule,
    JwtModule.register({
      secret: "tejeswar",
      signOptions: {
        expiresIn: "2 days",
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, LocalAuthGuard, JwtStrategy, JwtAuthGuard],
  exports: [AuthService],
})
export class AuthModule {}
