const mysql=require("mysql2")


const db=mysql.createConnection({
      user:"root",
      host:"localhost",
      password:"root",
      database:"main_db",
  });

  db.connect(function(err) {
    if (err) throw err;
    console.log('Database is connected successfully !');
  });

  module.exports=db;
