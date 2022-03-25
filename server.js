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
conn.connectToServer();
app.use(require('./route/route'));
app.listen(3000,()=>{
    console.log('listen port http://localhost:3000/')
});