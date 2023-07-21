// import { Visit } from '../interfaces/visit.interface';
// import { Area } from '../interfaces/area.interface';

// export class VisitClass implements Visit {
//     public _id: string;
//     public area: Area;
//     public visitedAt: Date;

//     constructor(area: Area, visitedAt?: Date) {
//         this._id = this.generateId();
//         this.area = area;
//         this.visitedAt = visitedAt ?? new Date();
//     }
//     areaId!: string;
//     ticketId!: string;

//     private generateId(): string {
//         // We'll use the current timestamp as a simple method to generate unique IDs
//         return new Date().getTime().toString();
//     }
// }
