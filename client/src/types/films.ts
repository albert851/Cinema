export interface FilmsType {
    _id: string,
    title: string,
    genree: string,
    cast: string,
    director: string,
    age: string,
    pic: string,
    screeningTimes: [{
        day: string,
        times: [string],
        _id: string
    }],
    summary: string
}
