let conn = require('../config/connect');
let db = conn.connection();
module.exports = {
  InsertOne: async (req, res) => {
    let { name, gender, groupname, email, phone, dob, department } = req.body;
    let infor = [];
    await db.query(
      'CALL `dbo`.`spInsertTeacherInfor`(?,?,?,?,?,?)',
      [`${name}`, `${gender}`, `${phone}`, `${groupname}`, `${email}`, `${dob}`],
      (err, result) => {
        if (err) {
          res.status(400).send(err);
          console.log(err);
        } else {

          infor = result[0];
          db.query(
            'CALL `dbo`.`spInsertDepartmentByTeacher`(?, ?)',
            [`${department}`, `${email}`],
            (err, result) => {
              if (err) {
                res.status(400).send(err);
                console.log(err);
              } else {
                res.status(200).json(infor);
                console.log(result);
              }
            }
          );
        }
      });


  },

  FindOne: (req, res) => {
    let id = req.params.id;
    let dep = [];
    let sub = [];
    let infor = [];


    db.query(
      'CALL `dbo`.`spGetTeacherInforById`(?)',
      [id],
      (err, result1) => {
        if (err) {
          res.status(400).send(err);
          console.log(err);
        } else {
          infor.push(result1[0][0])
          console.log(infor)
        }
      }
    );
    db.query(' CALL `dbo`.`spGetDepartmentByTeacher`(?)', [id],
      (err, result2) => {
        if (err) {
          res.status(400).send(err);
          console.log(err);
        } else {
          dep.push(result2[0][0] ? result2[0][0].DepartmentName : '');
          console.log(dep);
        }
      });

    db.query(' CALL `dbo`.`spGetSubjectByTeacher`(?)', [id],
      (err, result3) => {
        if (err) {
          res.status(400).send(err);
          console.log(err);
        } else {
          sub.push(result3[0][0] ? result3[0][0].SubjectName : '');
          console.log(sub);
          infor[0].DepartmentName = dep;
          infor[0].SubjectName = sub;

          res.status(200).json(infor);
        }
      });

  }, GetAll : (req,res) =>{
    let pagesize = req.query.pagesize;
    let pagenum = req.query.pagenum;

    let sql = 'CALL `dbo`.`spGetTeacher`(?, ?);';

    db.query(sql,[pagenum,pagesize],(err,result)=>{
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(result[0]);
      }
    })
  },
  GetNew :(req,res)=>{
    let sql = 'SELECT * FROM `dbo`.`teachers` order by CreateDate limit 1;'
    
    db.query(sql,(err,result)=>{
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(result);
      }
    })
  },
  DeleteOne : (req,res)=>{
    let id = req.params.id;
    let sql = ` DELETE FROM dbo.teacher_departments WHERE TeacherId = ?;
                DELETE FROM dbo.teacher_subjects WHERE TeacherId = ?;
                DELETE FROM dbo.teachers WHERE TeacherId = ?;`
    
    db.query(sql,[id],(err,result)=>{
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send('Delete successfully');
      }
    })
  },
  UpdateOne : (req,res)=>{
    let id = req.params.id;
    let { name, gender, groupname, email, phone, dob, dayoff } = req.body;
    let sql = 'CALL `dbo`.`spUpdateTeacherInfor`(?, ?, ?, ?, ?, ?,?, ?);';
    db.query(sql,[id, `${name}`,`${gender}`,`${phone}`,`${groupname}`,`${email}`,`${dob}`,`${dayoff}`],(err,result)=>{
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send('Update successfully');
      }
    })
  },
  InsertMulti: (req, res) => {
    let departs = [];
    let count = 0;
    let error = false;
    let { department } = req.body;
    let teacherid = req.params.teacherid;

    departs = department;

    for (let i = 0; i < departs.length; i++) {
      db.promise().query('CALL `dbo`.`spInsertDepartment`(N?, ?)', [`${departs[i]}`, teacherid], (err, result) => { }).then(() => {
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
  DeleteMulti : (req,res)=>{
    let teachers = [];
    let { teacherid } = req.body;
    teachers = teacherid;
    console.log(teachers.toString());
    let sql = ` DELETE FROM dbo.teacher_departments WHERE TeacherId in  (${teachers.toString()} );
                DELETE FROM dbo.teacher_subjects WHERE TeacherId in  (${teachers.toString()} );
                DELETE FROM dbo.teachers WHERE TeacherId in  (${teachers.toString()} );`
    db.query(sql,(err,result)=>{
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send('Delete multi successfully');
      }
    })
  }
}