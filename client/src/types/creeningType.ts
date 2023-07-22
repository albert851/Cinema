import { FilmsType } from "./films";

export interface ScreeningType {
    _id: string,
    filmId: FilmsType,
    dayId: String,
    day: String,
    time: String,
    seats: [Boolean],
}
