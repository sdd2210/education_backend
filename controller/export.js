let conn = require('../config/connect');
let db = conn.connection();
var xl = require('exceljs');
try {
  
} catch (error) {
  res.status(400).send(error);
}



module.exports = {
  

  ExportTeacher: async (req, res) => {

    // let path = req.query.path;
   
      let users = await db.promise().query(
        `SELECT teachers.TeacherId,
      teachers.TeacherCode,
      teachers.FullName,
      CASE  
      WHEN teachers.Gender = 1 then 'Nam' 
      WHEN teachers.Gender = 0 then 'Nữ'
      end as Gender,
      (select TeacherGroupName from dbo.teachergroups where TeacherGroupId = teachers.TeacherGroupId) as TeacherGroupName,
      teachers.Email,
      teachers.PhoneNumber,
      teachers.DateofBirth,
      teachers.QLTBTraing,
      teachers.DayOff
      FROM dbo.teachers`)
      console.log(users[0]);
      let user_er = await users[0];
      try{
      
   
    var wb = new xl.Workbook();
      
      var ws = wb.addWorksheet('Danh sách cán bộ',{views:[{state: 'frozen', ySplit:2}]});
      
      ws.columns = [  
        { header: 'STT', key: 'stt', width: 15 },
        { header: 'Mã giáo viên', key: 'magv', width: 15 },
        { header: 'Tên giáo viên', key: 'ten', width: 15 },
        { header: 'Giới tính', key: 'gen', width: 15 },
        { header: 'Nhóm giáo viên', key: 'nhom', width: 15 },
        { header: 'Email', key: 'email', width: 15 },
        { header: 'Số điện thoại', key: 'phone', width: 15 },
        { header: 'Ngày sinh', key: 'dob', width: 15 },
        { header: 'Đang làm việc', key: 'status', width: 15 },

      ];  
      ws.mergeCells('A1:I1');
      const Title = ws.getCell("A1");
      Title.font = {
        color : { argb: 'ff1edd04'},
        size : 16,
      }
      Title.alignment = {
        vertical: 'middle', horizontal: 'center'
      }
      Title.value = 'DANH SÁCH CÁN BỘ';
      
      ws.addRow(['STT','Mã giáo viên','Tên giáo viên','Giới tính','Nhóm giáo viên','Email','Số điện thoại','Ngày sinh','Đang làm việc'],)
      ws.getRow(2).font ={bold :true};
         for (let i = 0; i < user_er.length; i++) {
           ws.addRow(
             {
               stt : i+1,
               magv : user_er[i]['TeacherCode'],
               ten : user_er[i]['FullName'],
               gen : user_er[i]['Gender'],
               nhom : user_er[i]['TeacherGroupName'],
               email : user_er[i]['Email'],
               phone : user_er[i]['PhoneNumber'],
               dob : user_er[i]['DateofBirth'].toLocaleDateString(),
               status : user_er[i]['DayOff']== null ? 'x':''
             }
           )
        // ws.cell(i + 3, 1).string((i+1).toString())
        // ws.cell(i + 3, 2).string(user_er[i]['TeacherCode'])
        // ws.cell(i + 3, 3).string(user_er[i]['FullName'])
        // ws.cell(i + 3, 4).string(user_er[i]['Gender'])
        // ws.cell(i + 3, 5).string(user_er[i]['TeacherGroupName'])
        // ws.cell(i + 3, 6).string(user_er[i]['Email'])
        // ws.cell(i + 3, 7).string(user_er[i]['PhoneNumber'])
        // ws.cell(i + 3, 8).string(user_er[i]['DateofBirth'].toLocaleDateString())
        // ws.cell(i + 3, 9).string(user_er[i]['DayOff']== null ? 'x':'')
    }
      // ws.cell(1,5).string('DANH SÁCH CÁN BỘ').style({font: {bold: true,name: 'Helvetica'}});
      // ws.cell(2, 1).string('STT').style({font: {bold: true,name: 'Helvetica'}});
      // ws.cell(2, 2).string('Mã giáo viên').style({font: {bold: true,name: 'Helvetica'}});
      // ws.cell(2, 3).string('Tên giáo viên').style({font: {bold: true,name: 'Helvetica'}});
      // ws.cell(2, 4).string('Giới tính').style({font: {bold: true,name: 'Helvetica'}});
      // ws.cell(2, 5).string('Nhóm giáo viên').style({font: {bold: true,name: 'Helvetica'}});
      // ws.cell(2, 6).string('Email').style({font: {bold: true,name: 'Helvetica'}});
      // ws.cell(2, 7).string('SĐT').style({font: {bold: true,name: 'Helvetica'}});
      // ws.cell(2, 8).string('Ngày sinh').style({font: {bold: true,name: 'Helvetica'}});
      // ws.cell(2, 9).string('Đang làm việc').style({font: {bold: true,name: 'Helvetica'}});

      
      // ws.row(1).setHeight(20);
      // ws.row(2).filter();
      // ws.row(2).freeze();

     wb.xlsx.writeFile(`teacher.xlsx`).then(()=>{
      res.status(200).json([{Payload: 'Success'}])
    }).catch(err=>{res.status(400).send(err); console.log(err)})
    // wb.write(`teacher.xlsx`);
     
    } catch(err)
    {
     
      res.status(400).send('err');
    }
    
  
  }
}