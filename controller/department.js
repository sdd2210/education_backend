const { json } = require('body-parser');
let conn = require('../config/connect');
let db = conn.connection();
module.exports = {
  getAll: (req, res) => {
    let sql = 'select * from dbo.departments'
    db.execute(sql, (err, result) => {
      if (err) {
        res.status(400).send('Error inserting matches!');
        console.log(err);
      } else {
        console.log(result);
        res.json(result);
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
  GetOne: (req, res) => {
    let id = req.params.id;
    let sql = 'SELECT * From dbo.departments where DepartmentId = ?';
    db.query(sql, [id], (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(result);
      }
    })
  },

  GetByTeacher: (req,res)=>{
    let teacherid = req.params.id;
    let sql = 'CALL `dbo`.`spGetDepartmentByTeacher`(?);'
    db.query(sql,[teacherid],(err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(result[0]);
      }
    })
  }
}