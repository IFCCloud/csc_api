import * as express from 'express';
import { model }  from 'mongoose';
import config from '../config/config';

module Common {

    export class Controller {            

        public retrieve(req: express.Request, res: express.Response ) {
            let schema = req.path.split("/")[1];
            (model(config.mroutes[schema])).findById(req.params.id, function (err, result) {
                if(err) res.send(err); res.json(result);
            });	
        }

        public retrieveCollection (req: express.Request, res: express.Response, next: express.NextFunction) {
            let schema = req.path.split("/")[1];	
            let collection = null;
            console.log(req.query);
            if (req.query.page && req.query.limit) {
                collection = (model(config.mroutes[schema])).paginate(req.params, 
                    { page : parseInt(req.query.page), limit : parseInt(req.query.limit) },
                    function (err, result) {  if(err) res.send(err); res.json(result);
                });
            } else {
                collection = (model(config.mroutes[schema])).find(req.params, function (err, result) {            
                    if(err) res.send(err); res.json(result);          
                });
            }
            
            if (collection != null && req.query.sort) {
                collection.sort(req.query.sort); 
            }
        }


        public insertSingleEntry(req: express.Request, res: express.Response ) {
            let schema = req.path.split("/")[1];           
            (model(config.mroutes[schema])).collection.insert(req.body, function(err, result){
                if(err) res.send(err); res.json(result);
            });
        }

        public insetMultipleEntry(req: express.Request, res: express.Response ) {
            let schema = req.path.split("/")[1];
            
            (model(config.mroutes[schema])).collection.insertMany(req.body, function(err, result){
                if(err) res.send(err); res.json(result);
            });
        }

        public update(req: express.Request, res: express.Response ) {
            let schema = req.path.split("/")[1];

            (model(config.mroutes[schema])).findOneAndUpdate({_id: req.params.id},req.body,{new : true},function (err, result) {
                if (err) res.send(err); res.json(result);
            });
        }

        public delete(req: express.Request, res: express.Response ) {
            let schema = req.path.split("/")[1];

            (model(config.mroutes[schema])).remove({_id : req.params.id}, function (err) {
                if (err) res.send(err); res.json({ message : 'deleted' });
            });
        } 

    }

}

export = Common;