/* eslint-disable prettier/prettier */
import { Device } from 'src/device/device.entity';
import { Column, Entity, ObjectIdColumn, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  _id: string;

  //  @PrimaryColumn()
  // id: string;

  @Column({unique: true})
  name: string;

  @Column({unique: true})
  username: string;

  @Column()
  password: string;

  @Column()
  token: string;

  @Column({enum:[1,2,3,4], default: 4})
  tier: number;

  @OneToMany((type)=>Device, (device)=>device.user, {eager: false, onUpdate: 'CASCADE'})
  devices: Device[];

}
