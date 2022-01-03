import { IsEnum, IsNotEmpty, IsOptional, IsString } from "@nestjs/class-validator";
import { StatusEnum } from "../device.entity";

export class CreateDeviceDto{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    status: StatusEnum;

    @IsOptional()
    tier: number;
}