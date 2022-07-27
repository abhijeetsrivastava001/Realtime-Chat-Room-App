const socket = io('http://localhost:8000');

const form = document.getElementById('input-section-form');
const msgInput = document.querySelector('input');
const msg = document.getElementById('message');
const user_joined = document.getElementById('user-joined')
const user_name = document.getElementById('user-name');
const uName = document.getElementById('uName');

const appendInfo = (message,id,position) => {
    const messageElement = document.createElement('p');
    const text = message + ' joined the chat.'
    messageElement.innerText = text; 
    messageElement.classList.add(position);
    msg.append(messageElement);
    const messageDiv = document.createElement('div');
    messageDiv.id = id;
    messageDiv.innerHTML = `<div class="card">
                              <img src="user.jpg">
                              <h4>${message}</h4>
                            </div>`;
    user_name.append(messageDiv);
}
const appendleft = (message,id,position) => {
    const messageElement = document.createElement('p');
    const text = message + ' left the chat.'
    messageElement.innerText = text; 
    messageElement.classList.add(position);
    msg.append(messageElement);
    const card = document.getElementById(id);
    if(card != null){
        card.remove();
    }
}
const appendMsg = (message,position) => {
    const messageElement = document.createElement('p');
    messageElement.innerText = message; 
    messageElement.classList.add(position);
    msg.append(messageElement);
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const mInput = msgInput.value;
    appendMsg(`${mInput}`,'right');
    socket.emit('send',mInput);
    msgInput.value = ''
})

const userName = prompt("Enter your user name: ");
uName.innerHTML = `<h3>UserName: ${userName}</h3>`;

socket.emit('new-user-joined', userName);


socket.on('user-joined', data => {
    appendInfo(`${data.user_name}`,`${data.id}`, 'center');
})


socket.on('receive', data => {
    appendMsg(`${data.name}: ${data.message}`, 'left');
})

socket.on('leave', data => {
    appendleft(`${data.user_name}`,`${data.id}`, 'center');
})
