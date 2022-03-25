let conn = require('../config/connect');
let db = conn.connection();
module.exports = {
    GetOne : (req,res)=>{
        let id = req.params.id;
        let sql = 'select * from dbo.subjects where SubjectId = ?'
        db.query(sql,[id],(error,result)=>{
            if(error) {
                res.status(400).send(error);
            }else{
                res.status(200).json(result);
            }
        })
    },
    GetAll : (req,res)=>{
        let sql = 'select * from dbo.subjects'
        db.query(sql,(error,result)=>{
            if(error) {
                res.status(400).send(error);
            }else{
                res.status(200).json(result);
            }
        })
    },
    InsertMulti: (req, res) => {
        let subs = [];
        let count = 0;
        let error = false;
        let { subject } = req.body;
        let teacherid = req.params.teacherid;
    
        subs = subject;
    
        for (let i = 0; i < subs.length; i++) {
          db.promise().query('CALL `dbo`.`spInsertSubject`(N?, ?)', [`${subs[i]}`, teacherid], (err, result) => { }).then(() => {
            count++;
            console.log("count ", count)
            if (error) {
              res.status(400).send(error);
            }
    
            console.log(count, departs.length)
            if (count == departs.length) res.status(200).send('Success');
            // else res.status(400).send('Có trường dữ liệu đã tồn tại');
          })
            .catch((err) => {
              if (err) {
                error = true;
                res.status(400).send('Có trường dữ liệu đã tồn tại');
              }
            })
    
    
        }
    
      },
      GetByTeacher: (req,res)=>{
        let teacherid = req.params.id;
        let sql = 'CALL `dbo`.`spGetSubjectByTeacher`(?);'
        db.query(sql,[teacherid],(err, result) => {
          if (err) {
            res.status(400).send(err);
          } else {
            res.status(200).json(result);
          }
        })
      }
}