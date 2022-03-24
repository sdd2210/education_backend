let conn = require('../config/connect');
let db = conn.connection();

module.exports = {
    GetOne : (req,res)=>{
        let id = req.params.id;
        let sql = 'select * from dbo.teachergroups where TeacherGroupId = ?'
        db.query(sql,[id],(error,result)=>{
            if(error) {
                res.status(400).send(error);
            }else{
                res.status(200).json(result);
            }
        })
    },
    GetAll : (req,res)=>{
        let sql = 'select * from dbo.teachergroups'
        db.query(sql,(error,result)=>{
            if(error) {
                res.status(400).send(error);
            }else{
                res.status(200).json(result);
            }
        })
    }
}