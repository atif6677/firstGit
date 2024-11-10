// Write your code below:
const mainHeading = document.querySelector('#main-heading');
mainHeading.style.textAlign = 'right';


const fruits = document.querySelector('.fruits');

fruits.style.backgroundColor = 'grey';
fruits.style.padding = '30px';
fruits.style.margin = '30px';
fruits.style.width = '50%';
fruits.style.borderRadius = '5px';
fruits.style.listStyleType = 'none';

const basketHeading = document.querySelector('#basket-heading');
basketHeading.style.marginleft = '30px';
basketHeading.style.color = 'brown';


const fruitItem = document.querySelectorAll('.fruit');

for (let i = 0; i < fruitItem.length; i++) {

    fruitItem[i].style.backgroundColor = 'white'
        fruitItem[i].style.padding = '10px'
        fruitItem[i].style.margin = '10px'
        fruitItem[i].style.borderRadius = '5px'


}


const OddFruitItems = document.querySelectorAll('.fruit:nth-child(odd)');

for (let j = 0; j < OddFruitItems.length; j++)
{
    OddFruitItems[j].style.backgroundColor='lightgrey'
}


// Write answer to the questions asked below:

const EvenFruitItems = document.querySelectorAll('.fruit:nth-child(even)');

for (let j = 0; j < EvenFruitItems.length; j++)
{
    EvenFruitItems[j].style.backgroundColor='brown'
    EvenFruitItems[j].style.color='white'
}