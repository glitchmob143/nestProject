import { SetMetadata } from "@nestjs/common";

export enum Role{
    tier1 = 1,
    tier2 = 2,
    tier3 = 3,
    tier4 = 4,

}
export const Roles = (role : Role) => SetMetadata('roles', role);