import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UserStateEnum} from "./user-state.enum";
import {Auth} from "../../auth/auth.entity";
import {Game} from "../../game/entities/game.entity";
import {Playthrough} from "../../playthrough/entities/playthrough.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column({ default: UserStateEnum.Active })
    state: UserStateEnum;

    @OneToMany(() => Auth, (auth) => auth.user)
    auths: Auth[];

    @ManyToMany(() => Game)
    @JoinTable()
    games: Game[];

    @OneToMany(() => Playthrough, (playthrough) => playthrough.user)
    playthroughs: Playthrough[];
}
