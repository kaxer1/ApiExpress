"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
// llamar a las rutas del servidor
const producto_1 = __importDefault(require("./routes/producto"));
const categoria_1 = __importDefault(require("./routes/categoria"));
class Server {
    constructor() {
        // iniciaizar el modulo de express
        this.app = express_1.default();
        this.config();
        this.routers();
    }
    config() {
        // inicializar el puerto de express
        this.app.set('port', process.env.PORT || 3000);
        // VER LAS RUTAS QUE SE ESTAN SOLICITANDO 
        this.app.use(morgan_1.default('dev'));
        // COMPRESIÓN DE LAS RESPUESTAS
        this.app.use(compression_1.default());
        // PARA LA CONEXIÓN CON EL FRONTEND
        this.app.use(cors_1.default());
        // RECIBIR Y ENVIAR LAS RESPUESTAS DE TIPO JSON
        this.app.use(express_1.default.json());
        // SOPORTE PARA EL ENVIO DE FORMULARIOS
        this.app.use(express_1.default.urlencoded({ extended: false }));
        // CONEXIÓN A LA BDD
        const MONGO_URI = 'mongodb://localhost:27017/tienda';
        mongoose_1.default.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => {
            console.log("BDD OK");
        });
    }
    routers() {
        this.app.use('/api/categoria', categoria_1.default);
        this.app.use('/api/producto', producto_1.default);
        //this.app.get('/', (req,res)=>{res.send("SERVIDOR DE NODE FUNCIONANDO xD ")});
    }
    start() {
        // inicializar el servidor de express
        this.app.listen(this.app.get('port'), () => {
            console.log("SERVIDOR FUNCIONANDO");
        });
    }
}
// INSTANCIAR LA CLASE
const server = new Server();
server.start();
