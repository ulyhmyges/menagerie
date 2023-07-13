export interface Day {
    available: boolean,
    time: {begin: number, end: number} | undefined
}

export interface Week {
    index?: number,
    available?: boolean,
    monday?: Day,
    tuesday?: Day,
    wednesday?: Day,
    thursday?: Day,
    friday?: Day,
    saturday?: Day,
    sunday?: Day,
}

export interface Availability {
    available: boolean,
    weeks?: Week[]
}

export enum EmployeeType {
    zookeeper= "Zookeeper",
    veterinary = "Veterinary",
    host = "Host",
    janitor = "Janitor",
    salesman = "Salesman"
}

export interface Staff {
    _id?: string,
    name: string;
    type?: EmployeeType;
    availability?: Availability
}