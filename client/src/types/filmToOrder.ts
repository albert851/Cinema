import { FilmsType } from "./films";

export interface FilmsToOrderType {
    day: string,
    dayId: string,
    _id: string,
    filmId: FilmsType,
    seats: boolean[],
    time: string
}