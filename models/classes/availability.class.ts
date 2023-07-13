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

    constructor(index: number, available: boolean, day?: Day) {
        const dayoff = new DayClass(false)
        this.index = index;
        this.available = available;
        this.monday = day ?? dayoff;
        this.tuesday = day ?? dayoff;
        this.wednesday = day ?? dayoff;
        this.thursday = day ?? dayoff;
        this.friday = day ?? dayoff;
        this.saturday = day ?? dayoff;
        this.sunday = day ?? dayoff;
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

/**
 * Year of work with 5 random weeks off
 */
export class YearFull implements Availability {
    public available: boolean;
    public weeks: Week[] = [];
    constructor(begin: number, end: number) {
        this.available = true;
        const random: number[] = [];
        for (let j = 0; j < 5; j += 1){
            random.push(Math.floor(Math.random() * 52) + 1);
        }
        for (let i = 1; i <= 52; i += 1){
            let weekclass = new WeekClass(i, true, new DayClass(true, begin, end));
            for (let r of random) {
                if (i === r) {
                    weekclass = new WeekClass(i, false);
                    break;
                }
            }
            this.weeks.push(weekclass);
        }
    }
}

export class DayClass implements Day {
    public available: boolean;
    public time: { begin: number ; end: number } | undefined;

    constructor(available: boolean, begin?: number, end?: number) {
        this.available = available;
        this.time = ( begin && end ) ? {begin: begin, end: end} : undefined
    }
}