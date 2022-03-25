let express =  require('express');
let conn = require('./config/connect');
const bodyparser = require('body-parser');
let morgan = require('morgan');

// set up dependencies
const app = express();
app.use(morgan("dev"))
app.use(bodyparser.json());
app.get('/',(req,res)=>{
    res.status(200).json({
        message: 'Welcome to Project with Nodejs Express and MongoDB',
      });
})
let port = process.env.PORT||3000;
conn.connectToServer();
app.use(require('./route/route'));
app.listen(port,()=>{
    console.log(`listen port http://localhost:${port}/`)
});