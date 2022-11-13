import {PlaythroughStatusEnum} from "../enums/playthrough-status.enum";

export class PlaythroughRequestDto {
    status: PlaythroughStatusEnum;
    score: string;
    hours: string;
    store: string;
    notes: string;
    completedOn: string;
}
