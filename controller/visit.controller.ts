// export class VisitController {
//     readonly _path: string = "/visits";
//     readonly visitService: VisitService;

//     constructor() {
//         this.visitService = new VisitService();
//     }

//     createVisit(req: Request, res: Response): void {
//         const visit: Visit = req.body;

//         this.visitService.createVisit(visit)
//             .then(visit => res.send(visit))
//             .catch(err => res.status(500).send(err));
//     }

//     getDailyStats(req: Request, res: Response): void {
//         const areaId = req.params.id;

//         this.visitService.getDailyStats(areaId)
//             .then(stats => res.send(stats))
//             .catch(err => res.status(500).send(err));
//     }

//     getWeeklyStats(req: Request, res: Response): void {
//         const areaId = req.params.id;

//         this.visitService.getWeeklyStats(areaId)
//             .then(stats => res.send(stats))
//             .catch(err => res.status(500).send(err));
//     }

//     getRealTimeStats(req: Request, res: Response): void {
//         const areaId = req.params.id;

//         this.visitService.getRealTimeStats(areaId)
//             .then(stats => res.send(stats))
//             .catch(err => res.status(500).send(err));
//     }

//     buildRoutes(): Router {
//         const router = Router();

//         router.post('/', this.createVisit.bind(this));
//         router.get('/:id/daily', this.getDailyStats.bind(this));
//         router.get('/:id/weekly', this.getWeeklyStats.bind(this));
//         router.get('/:id/realtime', this.getRealTimeStats.bind(this));

//         return router;
//     }
// }
