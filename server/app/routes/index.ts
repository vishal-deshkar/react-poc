// /app/routes/index.ts
import {Request, Response} from "express";
import CatCtrl from "../controllers/cat";
import UserCtrl from "../controllers/user";

export class Routes { 

    catCtrl:CatCtrl = new CatCtrl();
    userCtrl:UserCtrl = new UserCtrl();
    public routes(app: any): void {
        app.route('/').get((req: Request, res: Response) => {            
            res.status(200).send('Hello Test World!');
        });
        // Cats
        app.route('/cats').get(this.catCtrl.getAll);
        app.route('/cats/count').get(this.catCtrl.count);
        app.route('/cat').post(this.catCtrl.insert);
        app.route('/cat/:id').get(this.catCtrl.get);
        app.route('/cat/:id').put(this.catCtrl.update);
        app.route('/cat/:id').delete(this.catCtrl.delete);

        // Users
        app.route('/login').post(this.userCtrl.login);
        app.route('/register').post(this.userCtrl.register);
        app.route('/users').get(this.userCtrl.getAll);
        app.route('/users/count').get(this.userCtrl.count);
        app.route('/user').post(this.userCtrl.insert);
        app.route('/user/:id').get(this.userCtrl.get);
        app.route('/user/:id').put(this.userCtrl.update);
        app.route('/user/:id').delete(this.userCtrl.delete);

    }
}
