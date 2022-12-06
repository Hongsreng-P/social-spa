import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
  private messages: Message[] = [
    {
      author: "Hongsreng",
      content: "Hi!",
    },
  ]

  create(createMessageDto: CreateMessageDto) {
    if (createMessageDto.content === '') {
      return {status: 'bad'};
    }
    this.messages.push(createMessageDto);
    return {status: 'ok', message: createMessageDto};
  }

  findAll() {
    return this.messages;
  }
}
