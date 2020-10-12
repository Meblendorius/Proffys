/*dados */

/* servidor */

const {pagelanding,
    pagestudy,
    pagegiveclasses,
    saveclasses}= require('./page')
const express=require('express')
const server=express()
const nunjucks=require('nunjucks')


nunjucks.configure('src/views',{
    express:server,
    noCache:true,
})

/* rotas da aplicação */
server
.use(express.urlencoded({extended: true}))
.use(express.static("public"))

.get("/", pagelanding)
.get("/study",pagestudy)
.get("/give-classes",pagegiveclasses)
.post("/save-class",saveclasses)
.listen(5500)




