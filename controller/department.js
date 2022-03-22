const { json } = require('body-parser');
let conn  = require('../config/connect');
let db = conn.connection();
module.exports = {
    getAll : (req,res)=>{
        let sql =  'select * from dbo.departments'
        db.execute(sql,(err,result)=>{
            if (err) {
                res.status(400).send('Error inserting matches!');
                console.log(err);
              } else {
                console.log(result);
                res.json(result);
              }
        })
    },
    InsertOne : (req,res)=>{
     let {name, gender, groupname, email, phone, dob} = req.body;
     let sql = `CALL spInsertTeacher(${name},${gender},${groupname},${email},${phone},${dob})`
    }
 }