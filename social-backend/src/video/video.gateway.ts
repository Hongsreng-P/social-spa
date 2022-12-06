import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { VideoService } from './video.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class VideoGateway {
  @WebSocketServer() server: Server
  constructor(private readonly videoService: VideoService) {}

  @SubscribeMessage('createRoom')
  async createRoom(@MessageBody() payload: {roomId: string}, @ConnectedSocket() client: Socket) {
    client.join(payload.roomId);
    console.log(`socket ${client.id} joined ${payload.roomId}`);
    return {roomId: payload.roomId};
  }

  @SubscribeMessage('joinRoom')
  async joinRoom(@MessageBody() payload: {roomId: string}, @ConnectedSocket() client: Socket) {
    client.join(payload.roomId);
    console.log(`socket ${client.id} joined ${payload.roomId}`);
    console.log("roomid", payload.roomId);
    this.server.to(payload.roomId).emit('joined', client.id);
    // client.broadcast.emit('joined', client.id);
    return {roomId: payload.roomId};
  }

  @SubscribeMessage('findAllClients')
  async findAllClients(@MessageBody() payload: {roomId:string}) {
    const sockets = await this.server.in(payload.roomId).fetchSockets();
    const socketIds = [];
    sockets.forEach(socket => {
      socketIds.push(socket.id);
    });
    return {socketIds};
  }
}
