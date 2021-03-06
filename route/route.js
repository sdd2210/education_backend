const express = require('express');


const recordRoutes = express();

let department = require('../controller/department') 
let teacher = require('../controller/teacher') 
let teachergroup = require('../controller/teachergroup') 
let subject = require('../controller/subject')
let export_file = require('../controller/export')

//--department
 //get
 recordRoutes.get('/department',department.getAll);
 //getbyteacherid /department/teacher/:id
 recordRoutes.get('/department/teacher/:id',department.GetByTeacher);
 //getone /department/:id
 recordRoutes.get('/department/:id',department.GetOne)
 //insert multi /department/:teacherid
 recordRoutes.post('/department/:teacherid',department.InsertMulti);
 
//---teacher
 //insertone
recordRoutes.post('/teacher',teacher.InsertOne);
 //getbyid
recordRoutes.get('/teacher/:id',teacher.FindOne);
 //insert multi /teacher/full
recordRoutes.post('/teacher/full',teacher.InsertMulti);
 //getall   /teacher?pagenum=&pagesize=
 recordRoutes.get('/teacher',teacher.GetAll);
 //update  /teacher/:id
 recordRoutes.put('/teacher/:id',teacher.UpdateOne);
 //deleteOne  /teacher/:id
 recordRoutes.delete('/teacher/:id',teacher.DeleteOne);
 //deletemulti /teacher
 recordRoutes.delete('/teacher/',teacher.DeleteMulti);
 //getnew  /teacher/new
 recordRoutes.get('/teacher/new',teacher.GetNew);
//getbyName
 recordRoutes.get('/teacher/name/:name',teacher.FindbyName);
//---subject
  //getall
  recordRoutes.get('/subject/',subject.GetAll);
  //getbyteacherid /subject/teacher/:id
  recordRoutes.get('/subject/teacher/:id',subject.GetAll);
  //insert multi /subject/:teacherid
  recordRoutes.post('/subject/:teacherid',subject.InsertMulti);
  //getOne /subject/:id
  recordRoutes.get('/subject/:id',subject.GetOne);

//---teachergroup
  //getAll
  recordRoutes.get('/teachergroup/',teachergroup.GetAll);
  //getOne /teachergroup/:id
  recordRoutes.get('/teachergroup/:id',teachergroup.GetOne);
//--export
recordRoutes.get('/export',export_file.ExportTeacher)


module.exports = recordRoutes;