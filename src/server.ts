// app.ts
import express, { Application, Request, Response } from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import path from 'path';

class App {
    private app: Application;
    private http: http.Server;
    private io: Server;

    constructor() {
        this.app = express();
        this.http = http.createServer(this.app);
        this.io = new Server(this.http);
        this.listenSocket();
        this.setupRoutes();
    }

    listenServer() {
        this.http.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
    }

    listenSocket() {
        this.io.on('connection', (socket: Socket) => {
            console.log('Usuário conectado =>', socket.id);

            socket.on('message', (msg) => {
                this.io.emit('message', { id: msg.id, message: msg.message });
            });
        });
    }

    setupRoutes() {
        this.app.get('/', (req: Request, res: Response) => {
            res.sendFile(path.join(__dirname, '..', 'index.html'));
        });
    }
}

const app = new App();
app.listenServer();
