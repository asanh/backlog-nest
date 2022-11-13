import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {PlaythroughStatusEnum} from "../enums/playthrough-status.enum";
import {User} from "../../user/entities/user.entity";
import {Game} from "../../game/entities/game.entity";

@Entity()
export class Playthrough {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "enum",
        enum: PlaythroughStatusEnum,
        default: PlaythroughStatusEnum.BACKLOG
    })
    status: PlaythroughStatusEnum;

    @Column({ nullable: true })
    score: string;

    @Column({ nullable: true })
    hours: string;

    @Column({ nullable: true })
    store: string;

    @Column({ nullable: true })
    notes: string;

    @Column({ type: 'date', nullable: true })
    completedOn: string;

    @ManyToOne(() => User, (user) => user.playthroughs)
    user: User;

    @ManyToOne(() => Game, (game) => game.playthroughs)
    game: Game;
}
