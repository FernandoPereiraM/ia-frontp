import { Component, OnInit } from '@angular/core';
import { ChatMessage } from '../../interface/chat-message.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  messages: ChatMessage[] = [];
  newMessage: string = '';
  showBackground: boolean = true;
  savedUsername = localStorage.getItem('username') ?? 'User';

  constructor() { 
  }

  ngOnInit(): void {
    this.savedUsername;
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.messages.push({
        sender: this.savedUsername,
        content: this.newMessage,
        timestamp: new Date()
      });
      this.showBackground = true;
      // Respuesta del bot
      this.botResponse();

      this.newMessage = '';
    }
  }

  botResponse() {
    // Simulación de respuesta del bot
    const botMessage: ChatMessage = {
      sender: 'RecipeBot',
      content: '¡Hola! Soy un bot y estoy aquí para ayudarte.',
      timestamp: new Date()
    };
    this.messages.push(botMessage);
  }

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    // -------------
  }
}

