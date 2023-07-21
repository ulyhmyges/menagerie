// import { Model } from "mongoose";
// import { Visit } from "../models/interfaces/visit.interface";

// export class VisitService {
//     readonly visitModel: Model<Visit>;

//     constructor() {
//         this.visitModel = VisitModel;
//     }

//     async createVisit(visit: Visit): Promise<Visit | null> {
//         try {
//             return await this.visitModel.create(visit);
//         } catch (e: unknown) {
//             console.log(e);
//             return null;
//         }
//     }

//     async getDailyStats(areaId: string): Promise<number> {
//         const startOfToday = new Date();
//         startOfToday.setHours(0, 0, 0, 0);

//         try {
//             return await this.visitModel.countDocuments({ 
//                 areaId: areaId, 
//                 visitedAt: { $gte: startOfToday }
//             });
//         } catch (e: unknown) {
//             console.log(e);
//             return null;
//         }
//     }

//     async getWeeklyStats(areaId: string): Promise<number> {
//         const oneWeekAgo = new Date();
//         oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

//         try {
//             return await this.visitModel.countDocuments({ 
//                 areaId: areaId, 
//                 visitedAt: { $gte: oneWeekAgo }
//             });
//         } catch (e: unknown) {
//             console.log(e);
//             return null;
//         }
//     }

//     async getRealTimeStats(areaId: string): Promise<number> {
//         const oneHourAgo = new Date();
//         oneHourAgo.setHours(oneHourAgo.getHours() - 1);

//         try {
//             return await this.visitModel.countDocuments({ 
//                 areaId: areaId, 
//                 visitedAt: { $gte: oneHourAgo }
//             });
//         } catch (e: unknown) {
//             console.log(e);
//             return null;
//         }
//     }
// }
