import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Genre} from "../../genre/entities/genre.entity";
import {Platform} from "../../platform/entities/platform.entity";
import {Playthrough} from "../../playthrough/entities/playthrough.entity";

@Entity()
export class Game {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    img: string;

    @ManyToMany(() => Genre)
    @JoinTable()
    genres: Genre[];

    @Column({ nullable: true })
    howLongToBeat: string;

    @ManyToMany(() => Platform)
    @JoinTable()
    platforms: Platform[];

    @Column({ nullable: true })
    developer: string;

    @Column({ nullable: true })
    publisher: string;

    @Column({ type: 'date', nullable: true })
    releaseDate: string;

    @OneToMany(() => Playthrough, (playthrough) => playthrough.game)
    playthroughs: Playthrough[];
}
