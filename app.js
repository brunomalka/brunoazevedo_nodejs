// Carregando Modulos
    const express = require("express")
    const handlebars = require("express-handlebars")
    const bodyParser = require("body-parser")
    const mongoose = require("mongoose")
    const app = express()
    const admin = require('./routes/admin')
    const path = require('path')
    const session = require('express-session')
    const flash = require('connect-flash')
// Configurações
    // Sessão
        app.use(session({
            secret:"teste",
            resave:true,
            saveUninitialized:true
        }))
        app.use(flash())
    // Middleware
        app.use((req, res, next) => {
            res.locals.success_msg = req.flash("success_msg")
            res.locals.error_msg = req.flash("error_msg")
            next()
        })
    // Body Parser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())
    // Handlebars
        app.engine('handlebars', handlebars({defaultLayout:'main'}))
        app.set('view engine', 'handlebars')
    // Mongoose
        //provide a sensible default for local development
        const db_name = "blogapp";
        mongodb_connection_string = 'mongodb://127.0.0.1:27017/' + db_name;
        //take advantage of openshift env vars when available:
        if(process.env.OPENSHIFT_MONGODB_DB_URL){
            mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + db_name;
        }
        mongoose.Promise = global.Promise;
        mongoose.connect(mongodb_connection_string).then(()=>{
            console.log('conectado ao mongo;')
        }).catch((err)=>{
            console.log('erro ao se conectar : '+err)
        })
    // Outras
    // Public
        app.use(express.static(path.join(__dirname, "public")))
// Rotas
    app.use('/admin', admin)
// Outros


var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.listen(server_port, server_ip_address, () =>  {
    console.log("Servidor Rodando "+server_ip_address+":"+server_port)
})