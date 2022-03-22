let conn  = require('../config/connect');
let db = conn.connection();
module.exports = {
    InsertOne : async (req,res)=>{
        let {name, gender, groupname, email, phone, dob, department} = req.body;
       
         await db.query(
            'CALL `dbo`.`spInsertTeacherInfor`(?,?,?,?,?,?)',
            [`${name}`,`${gender}`,`${phone}`,`${groupname}`,`${email}`,`${dob}`],
            (err,result)=>{
                  if (err) {
                    res.status(400).send(err);
                      console.log(err);
                    } else {
                      
                      console.log(result);
                      db.query(
                        'CALL `dbo`.`spInsertDepartmentByTeacher`(?, ?)',
                        [`${department}`,`${email}`],
                        (err,result)=>{
                          if (err) {
                            res.status(400).send(err);
                              console.log(err);
                            } else {
                              res.status(200).send('Success');
                              console.log(result);
                            }
                          }
                      );
                    }
            });

        
    },
    InsertMulti : (req,res)=>{

      
    },
    FindOne:   (req,res) =>{
      let id = req.params.id;
      let dep = [];
      let sub = [];
      let infor = [];
     

         db.query(
          'CALL `dbo`.`spGetTeacherInforById`(?)',
          [id],
           (err,result1)=>{
            if (err) {
              res.status(400).send(err);
                console.log(err);
              } else {
                infor.push(result1[0][0])
                console.log( infor)
              }
            }
        );
         db.query(' CALL `dbo`.`spGetDepartmentByTeacher`(?)',[id],
        (err,result2)=>{
          if (err) {
            res.status(400).send(err);
              console.log(err);
            } else {
              dep.push(result2[0][0] ? result2[0][0].DepartmentName : '') ;
              console.log(dep);
            } 
        });
  
         db.query(' CALL `dbo`.`spGetSubjectByTeacher`(?)',[id],
        (err,result3)=>{
          if (err) {
            res.status(400).send(err);
              console.log(err);
            } else {
             sub.push(result3[0][0] ? result3[0][0].SubjectName : '') ;
             console.log(sub);
             infor[0].DepartmentName = dep;
             infor[0].SubjectName = sub;
            
             res.status(200).json(infor);
            } 
        });
      
      }
    
    // infor = JSON.parse(infor);
    
    
 }