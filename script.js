const socket = io('http://localhost:3000');

const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');


const myName = prompt("What is your name?");

appendMessage('You joined');
socket.emit('new-user', myName);

socket.on('chat-message', data => {
    appendMessage(`${data.myName}: ${data.message}`);
});

socket.on('user-connected', myName => {
    appendMessage(`${myName} connected`);
});



messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`You: ${message}`);
    socket.emit('send-chat-message', message)
    messageInput.value = '';
});

function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.append(messageElement);
};