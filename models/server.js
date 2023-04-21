import express from 'express';
import cors from 'cors';
import * as http from "http";
import {Server as SocketServer} from "socket.io";
import {socketController} from "../sockets/controller.js";

export class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = http.createServer(this.app);
    this.io = new SocketServer(this.server);

    this.paths = {}

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();

    // Sockets
    this.sockets();
  }

  middlewares() {

    // CORS
    this.app.use(cors());

    // Directorio Público
    this.app.use(express.static('public'));

  }

  routes() {
  }

  sockets() {
    this.io.on('connection', socketController);
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log('Servidor corriendo en puerto', this.port);
    });
  }
}