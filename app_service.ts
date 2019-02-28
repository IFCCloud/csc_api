import app from './src/route/route';
import config from './src/config/config';


const port = process.env.port || process.env.PORT || 3000;

app.listen(port, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(`${config.app_name} listening on port  %s`, port);
});  
