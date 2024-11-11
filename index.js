// Write your code below:
// Add the Edit Button:



const divs = document.getElementsByTagName('li');

for (let i = 0; i < divs.length; i++) {
  const editButton = document.createElement('button');
  const editText = document.createTextNode('Edit');
  editButton.appendChild(editText);
  editButton.classList.add('edit-btn');
  divs[i].appendChild(editButton);
}




// Implement the code as in video but with one extra 'Edit'

const form = document.querySelector('form');
const fruits = document.querySelector('.fruits');
form.addEventListener('submit', function (event)
{

  event.preventDefault();

  const fruitToAdd = document.getElementById('fruit-to-add');

  const newLi = document.createElement('li');

  newLi.classList.add('fruit')
  newLi.innerHTML = fruitToAdd.value + '<button class="delete-btn">x</button>';

  const editButton = document.createElement('button');
  editButton.classList.add('edit-btn');
  editButton.textContent = 'Edit';
  newLi.appendChild(editButton);

  newLi.classList.add('fruit')
  fruits.appendChild(newLi);
})

fruits.addEventListener('click', function (event) {

  if (event.target.classList.contains('delete-btn')) {
    const fruitToDelete = event.target.parentElement;

    fruits.removeChild(fruitToDelete);
  };

});