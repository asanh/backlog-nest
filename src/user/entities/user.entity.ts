import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UserStateEnum} from "./user-state.enum";
import {Auth} from "../../auth/auth.entity";

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

    @OneToMany(() => Auth, (auth) => auth.user)
    auths: Auth[];
}
