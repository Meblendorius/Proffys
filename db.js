const database= require('sqlite-async')


function execute(db){
    return db.exec(
    /* //criar as tabelas do bd, use crase */
    `
        CREATE TABLE IF NOT EXISTS proffys(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            whatsapp TEXT,
            bio TEXT
        );
        CREATE TABLE IF NOT EXISTS classes(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject INTEGER,
            cost TEXT,
            proffy_id INTEGER
        );
        
        CREATE TABLE IF NOT EXISTS class_schedule(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            class_id INTEGER,
            weekday INTEGER,
            time_from INTEGER,
            time_to INTEGER
        );
    `)
    
}
 /* module.exports está exportando esse comando para outros arquivos */
module.exports=database.open(__dirname+'/database.sqlite').then(execute)