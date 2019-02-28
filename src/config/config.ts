
import * as ld from 'lodash';
// module variables


class Config {
    public config

    constructor() {
        console.log("Config json parse ...");
        let configStr = JSON.stringify(require('../config.json'));

        let cfg = JSON.parse(configStr);
        let env = process.env.NODE_ENV || cfg.environment;
        this.config = ld.merge(cfg.development, cfg[env]);   
        
        // set the model routes 
        this.config.mroutes = cfg.route_model_map;
    }

}
export default new Config().config