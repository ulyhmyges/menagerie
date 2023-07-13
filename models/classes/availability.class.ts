import {Availability, Day, Week} from "../interfaces";

export class WeekClass implements Week {
    public index: number;
    public available: boolean;
    public monday: Day
    public tuesday: Day
    public wednesday: Day
    public thursday: Day
    public friday: Day
    public saturday: Day
    public sunday: Day
    public dayoff: Day = {available: false, time: undefined};

    constructor(index: number, available: boolean, day?: Day) {
        this.index = index;
        this.available = available;
        this.monday = day ?? this.dayoff;
        this.tuesday = day ?? this.dayoff;
        this.wednesday = day ?? this.dayoff;
        this.thursday = day ?? this.dayoff;
        this.friday = day ?? this.dayoff;
        this.saturday = day ?? this.dayoff;
        this.sunday = day ?? this.dayoff;
    }


}
export class YearOff implements Availability {
    public available: boolean;
    public weeks: Week[] = [];

    constructor() {
        this.available = false;
        for (let i = 1; i <= 52; i += 1){
            this.weeks.push(new WeekClass(i, false));
        }
    }



}