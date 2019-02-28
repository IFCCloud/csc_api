import * as express from 'express';
import * as azureJWT from '../../aadJwt';
import config from '../config/config';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as mongoose from 'mongoose';

import * as common from '../controller/common_controller';


class ServiceRoute {
    public express

    constructor() {
        this.express = express()
        this.defRoutes()
    }

    private defRoutes() :void {
        const apiRouter = express.Router();
        const anonymousRouter = express.Router();
        const authRouter = express.Router();
        
        /* include models */
        var normalizedPath = require("path").join(__dirname, "../schemas");
        require("fs").readdirSync(normalizedPath).forEach(function(file) {
            require("../schemas/" + file);
          });

         /* connect to mongo db */
        (<any>mongoose).Promise = global.Promise;
        mongoose.connect(config.database ,{useNewUrlParser: true});

        /* azure jwt security */
        const aadJwtOptions = {
            authority : config.aad_authority + config.aad_tenant,
            audience : config.aad_audience 
        }
        const aadJwt = new azureJWT(aadJwtOptions);

        anonymousRouter.use(function (req,res,next) {
            console.log(new Date().toString(), ' - Unrestricted access to %s', req.originalUrl);
            console.log('accessing from ',req.headers.referer);
            next();
        });

        apiRouter.route('/').get(anonymousRouter, function (req, res) {
            res.status(200).send({ message: "Express Cloud API unrestricted." })
        });

        authRouter.use(function(req,res,next) {
            console.log('Access request from - ' + req.originalUrl);
            
            aadJwt.validateRequest(req, function (authorized) {
                console.log(authorized);
                if (!authorized){
                console.log('Not Authorised to access');
                res.status(404).json({ message: "Not Authorised to access." });
                }
            });
            if (!res.headersSent)  next('router');
        });

        const commonController : common.Controller = new common.Controller();
        //const feeController = require("../controller/fee_controller");
             
        apiRouter.route('/seaports')
            .get(anonymousRouter, commonController.retrieve)
            .post(authRouter,commonController.insetMultipleEntry);
        apiRouter.route('/seaports/:id')
            .get(anonymousRouter,commonController.retrieve)
            .put(authRouter,commonController.update)
            .delete(authRouter,commonController.delete);
        apiRouter.route('/seaports/iso/:iso')
            .get(anonymousRouter, commonController.retrieveCollection);

        
        apiRouter.route('/airports')
            .get(anonymousRouter,commonController.retrieveCollection)
            .post(authRouter, commonController.insetMultipleEntry);

        apiRouter.route('/suburbs')
            .get(anonymousRouter,commonController.retrieveCollection)
            .post(authRouter, commonController.insetMultipleEntry);  
        apiRouter.route('/suburbs/iso/:iso')
            .get(anonymousRouter,commonController.retrieveCollection);
        apiRouter.route('/suburbs/iso/:iso/state/:state')
            .get(anonymousRouter,commonController.retrieveCollection);

        //apiRouter.route('/apipass').post(anonymousRouter,dataController.byPass);

        apiRouter.route('/accounts')
            .get(authRouter, commonController.retrieveCollection)
            .post(authRouter, commonController.insetMultipleEntry);
        apiRouter.route('/accounts/type/:account_type')
            .get(authRouter, commonController.retrieveCollection);

        apiRouter.route('/container')
            .get(authRouter, commonController.retrieveCollection)
            .post(authRouter, commonController.insetMultipleEntry);

       /* apiRouter.route('/get_fee_schema')
            .get(authRouter,feeController.get_fee_schema);
        apiRouter.route('/fee/sea')
            .get(authRouter,feeController.retrieve_collection)
            .post(authRouter,feeController.insert_many);
        */
        apiRouter.route('/filetemplate')
            .get(authRouter, commonController.retrieveCollection)
            .post(authRouter, commonController.insertSingleEntry);
        apiRouter.route('/filetemplate/:id')
            .post(authRouter,commonController.update);


        this.express.use(bodyParser.json({limit:'5mb'}));
        this.express.use(cors());
        this.express.use(apiRouter);
    }
}

export default new ServiceRoute().express

