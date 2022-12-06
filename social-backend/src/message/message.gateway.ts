import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Server, Socket } from 'socket.io';
import { Message } from './entities/message.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessageGateway {
  @WebSocketServer()
  server: Server;
  
  constructor(private readonly messageService: MessageService) {}

  @SubscribeMessage('createMessage')
  create(@MessageBody() createMessageDto: CreateMessageDto, @ConnectedSocket() client: Socket) {
    const {status, message} = this.messageService.create(createMessageDto);
    if (status === 'ok') {
      client.broadcast.emit('newMessage', message);
    }
    return {status, message};
  }

  @SubscribeMessage('findAllMessage')
  async findAll(): Promise<Message[]> {
    const messages = await this.messageService.findAll();
    return messages;
  }
}
