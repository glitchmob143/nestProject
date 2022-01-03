import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, ObjectID, ObjectIdColumn, OneToOne } from "typeorm";


export enum StatusEnum {
    ENABLE = 'ENABLED',
    DISABLE = 'DISABLED'
}

@Entity()
export class Device{
    @ObjectIdColumn()
    _id: ObjectID;
    
    @Column({unique: true})
    name: string;

    @Column({type: 'enum', enum: StatusEnum, default: StatusEnum.DISABLE})
    status: StatusEnum;

    @Column({enum: [1,2,3,4], default: 4})
    tier: number;

    @ManyToOne((type)=>User, (user)=>user.devices, {eager: true, onUpdate: 'CASCADE'})
    @JoinColumn({name: 'userId'}) ////hfiasgfigasfhgashufg
    user: User;
}
