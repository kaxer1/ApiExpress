import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';

// llamar a las rutas del servidor
import producto from './routes/producto';
import categoria from './routes/categoria';

class Server {
    // especificar el tupo de dato para la variable APP
    public app: express.Application;

    constructor(){
        // iniciaizar el modulo de express
        this.app = express();
        this.config();
        this.routers();
    }

    config(){
        // inicializar el puerto de express
        this.app.set('port', process.env.PORT || 3000);

        // VER LAS RUTAS QUE SE ESTAN SOLICITANDO 
        this.app.use(morgan('dev'));
        // COMPRESIÓN DE LAS RESPUESTAS
        this.app.use(compression());
        // PARA LA CONEXIÓN CON EL FRONTEND
        this.app.use(cors());
        // RECIBIR Y ENVIAR LAS RESPUESTAS DE TIPO JSON
        this.app.use(express.json());
        // SOPORTE PARA EL ENVIO DE FORMULARIOS
        this.app.use(express.urlencoded({extended:false}));

        // CONEXIÓN A LA BDD
        const MONGO_URI = 'mongodb://localhost:27017/tienda'
        mongoose.connect(MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex:true}).then(()=>{
            console.log("BDD OK");
        });
    }

    routers(){
        this.app.use('/api/categoria',categoria);
        this.app.use('/api/producto',producto);
        //this.app.get('/', (req,res)=>{res.send("SERVIDOR DE NODE FUNCIONANDO xD ")});
    }

    start(){
        // inicializar el servidor de express
        this.app.listen(this.app.get('port'), () => {
            console.log("SERVIDOR FUNCIONANDO");
        });
    }

}

// INSTANCIAR LA CLASE
const server = new Server();
server.start();
