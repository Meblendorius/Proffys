const Database= require('./database/db')



const{
    subjects,
    weekday,
    getsubject,
    convertHoursToMinutes
 }=require('./utils/format')


function pagelanding(req,res){
    return res.render("index.html")
}

async function pagestudy(req,res){
    const filters=req.query
    if(!filters.subject||!filters.weekday||!filters.time){
        return res.render("study.html",{filters,subjects,weekday})
    }
    //converter horas em minutos
    const timeToMinutes=convertHoursToMinutes(filters.time)
    console.log('não tem campos vazios')
    const query= `
    SELECT classes.*, proffys.*
    FROM proffys
    JOIN classes ON (classes.proffy_id = proffys.id)
    WHERE EXISTS (
      SELECT class_schedule.*
      FROM class_schedule
      WHERE class_schedule.class_id = classes.id
      AND class_schedule.weekday = ${filters.weekday}
      AND class_schedule.time_from <= ${timeToMinutes}
      AND class_schedule.time_to > ${timeToMinutes}
    )
    AND classes.subject = ${filters.subject}
  `

    try {
        const db= await Database
        const proffys= await db.all(query)
        proffys.map((proffy) => {
          proffy.subject = getsubject(proffy.subject)
        })
        return res.render('study.html', {proffys, subjects,filters,weekday})

        
    } catch (error) {
        console.log(error)
        
    }
   
}
function pagegiveclasses(req,res){
   
 
    return res.render("give-classes.html",{subjects,weekday})
    
}

async function saveclasses(req, res) {
    const createProffy = require('./database/createProffy')
    
    const proffyValue = {
      name: req.body.name,
      avatar: req.body.avatar,
      whatsapp: req.body.whatsapp,
      bio: req.body.bio
    }
  
    const classValue = {
      subject: req.body.subject,
      cost: req.body.cost
    }
  
    const classScheduleValues = req.body.weekday.map((weekday, index) => {
      return {
        weekday,
        time_from: convertHoursToMinutes(req.body.time_from[index]),
        time_to: convertHoursToMinutes(req.body.time_to[index])
      }
    })
    
    try {
      const db = await Database
      await createProffy(db, { proffyValue, classValue, classScheduleValues })
  
      let queryString = "?subject=" + req.body.subject
      queryString += "&weekday=" + req.body.weekday[0]
      queryString += "&time=" + req.body.time_from[0]
  
      return res.redirect("/study" + queryString)
    } catch (error) {
      console.log(error)
    }
    
  } 

module.exports={
    pagelanding,
    pagestudy,
    pagegiveclasses,
    saveclasses
}