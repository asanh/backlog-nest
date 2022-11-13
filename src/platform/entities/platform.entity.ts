import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Platform {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
