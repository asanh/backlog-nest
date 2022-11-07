import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {UserStateEnum} from "./user-state.enum";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ default: 'User' })
    name: string;

    @Column({ default: UserStateEnum.Active })
    state: UserStateEnum;
}
