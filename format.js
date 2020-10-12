const subjects=[
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química"
]

const weekday=[
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
    
]

/* funcionalidades */
function getsubject(subjectnumber){
    const arrayposition= +subjectnumber-1
    return subjects[arrayposition]
}

function convertHoursToMinutes(time) {
    const [ hour, minutes ] = time.split(":")
    return Number((hour * 60) + minutes)
  }
module.exports={
    subjects,
    weekday,
    getsubject,
    convertHoursToMinutes

}