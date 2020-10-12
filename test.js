const db= require('./db')
const createProffy = require('./createProffy')

db.then(async(db)=>{
    /* inserir dados */
    proffyValue={
        name:"Maikon Fernandes",
        avatar:"https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp:"89987654534",
        bio:"instrutor de ef fisica"
    }
    classValue={
        
        subject:"1",
        cost:"20"
        /* proffy_id vira pelo banco de dados */
    }
    classScheduleValues=[
    {
        weekday:1,
        time_from:720,
        time_to:1220
    },
    {
        weekday:0,
        time_from:520,
        time_to:1220
    }
    
    ]
   await createProffy(db,{proffyValue,classValue,classScheduleValues})
 

    const selectedProffys=await db.all("SELECT * FROM proffys")
/*     console.log(selectedProffys)
 */
    const selectClassesAndProffys= await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id=proffys.id)
        WHERE classes.proffy_id=1;
    `)
     console.log(selectClassesAndProffys)

/*     o horario que a pessoa trabalha 
        time_from menor ou igual
        time_to acima*/
        const selectClassesSchedule= await db.all (`
        SELECT *
        FROM class_schedule
        WHERE class_schedule.class_id=1
        AND class_schedule.weekday="0"
        AND class_schedule.time_from <="420"
        AND class_schedule.time_to >"420"
        `) 
        
        console.log(selectClassesSchedule)
})