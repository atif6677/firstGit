// Write your code below:
const head = document.createElement('h3');

const headText = document.createTextNode('Buy high quality organic fruits online')

head.appendChild(headText);

head.style.fontStyle = 'italic'

const divs = document.getElementsByTagName('div');

const firstDiv = divs[0];

firstDiv.appendChild(head)









const headr = document.createElement('p');

const headrText = document.createTextNode('Total fruits:4')

headr.appendChild(headrText);

const divsr = document.getElementsByTagName('div');

const secondDiv = divsr[1];

const fruits =document.querySelector('.fruits')
secondDiv.insertBefore(headr, fruits);

headr.id = 'fruits-total'