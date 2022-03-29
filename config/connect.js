
let mysql = require('mysql2');

let conn = mysql.createPool(
    {
        connectionLimit: 100,
        host: 'localhost',
        user: 'root',
        password: 'son22102001',
        DB: 'dbo',
        debug: false
    }
);


module.exports = {
    connectToServer: () => {
        conn.getConnection((err, arg) => {
            if (err) {
                console.log(err);
            } else console.log('Connect database success');
        });

    },
    connection: () => {
        return conn;
    }
}
