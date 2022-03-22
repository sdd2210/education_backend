
let mysql = require('mysql2');

let conn = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'son22102001',
        DB: 'dbo'
    }
);


module.exports = {
    connectToServer : ()=>{
        conn.connect((err,arg) =>{
            if(err)
            {
                console.log(err);
            }else console.log('Connect database success');
        });
        
    },
    connection : ()=>{
     return conn;
    }
 }
 