const express = require('express');


const recordRoutes = express();

let department = require('../controller/department') 
let teacher = require('../controller/teacher') 


recordRoutes.get('/department',department.getAll);
recordRoutes.post('/teacher',teacher.InsertOne);
recordRoutes.get('/teacher/:id',teacher.FindOne);
module.exports = recordRoutes;