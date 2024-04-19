import { Component } from '@angular/core';
import { ChatMessage } from '../../interface/chat-message.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  messages: ChatMessage[] = [];
  newMessage: string = '';
  savedUsername = localStorage.getItem('username') ?? 'User';

  constructor() { 
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.messages.push({
        sender: this.savedUsername,
        content: this.newMessage,
        timestamp: new Date()
      });

      // Respuesta del bot
      this.botResponse();

      this.newMessage = '';
    }
  }

  botResponse() {
    // Simulación de respuesta del bot (puedes reemplazar esto con la lógica real del bot)
    const botMessage: ChatMessage = {
      sender: 'RecipeBot',
      content: '¡Hola! Soy un bot y estoy aquí para ayudarte.',
      timestamp: new Date()
    };
    this.messages.push(botMessage);
  }
}

