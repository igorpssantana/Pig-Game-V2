'use strict';

// Objects

const dice = {
  sortDice: function () {
    let diceNumber = Math.round(Math.random() * 5) + 1;

    return diceNumber;
  },
  showDice: val => {
    this.value = val;
    this.source = ` dice-${this.value}.png`;
    document.querySelector('.dice').src = this.source;

    return;
  },
};

document.querySelector('#score--0').textContent = '0';
document.querySelector('#score--1').textContent = '0';

// Functions and variables

let current = 0;
let index = 0;

const rollDice = document.querySelector('.btn--roll');
const holdValue = document.querySelector('.btn--hold');
const restartGame = document.querySelector('.btn--new');

const player_0 = document.querySelector('.player--0'),
  player_1 = document.querySelector('.player--1');

const changePlayer = index => {
  if (index === 0) {
    player_0.classList.remove('player--active');
    player_1.classList.add('player--active');
  } else {
    player_1.classList.remove('player--active');
    player_0.classList.add('player--active');
  }

  return;
};

var addCurrent = (index, val) => {
  if (val === 1) {
    if (index === 0) document.querySelector('#current--0').textContent = '0';
    else document.querySelector('#current--1').textContent = '0';
  } else if (
    Number(document.querySelector('#score--0').textContent) < 100 ||
    Number(document.querySelector('#score--1').textContent) < 100
  ) {
    if (index === 0)
      document.querySelector('#current--0').textContent = String(
        Number(document.querySelector('#current--0').textContent) + val
      );
    else
      document.querySelector('#current--1').textContent = String(
        Number(document.querySelector('#current--1').textContent) + val
      );
  }
  return;
};

var getValue = (index, current) => {
  index === 0
    ? (document.querySelector('#score--0').textContent = String(
        Number(document.querySelector('#score--0').textContent) + current
      ))
    : (document.querySelector('#score--1').textContent = String(
        Number(document.querySelector('#score--1').textContent) + current
      ));

  return;
};

//Event Listeners

const rollingTheDice = rollDice.addEventListener('click', () => {
  if (
    Number(document.querySelector(`#score--0`).textContent) >= 100 ||
    Number(document.querySelector(`#score--1`).textContent) >= 100
  )
    return;

  current = dice.sortDice();
  dice.showDice(current);

  if (current === 1) {
    addCurrent(index, current);
    changePlayer(index);
    index === 0 ? (index = 1) : (index = 0);
  } else {
    addCurrent(index, current);
  }
});

const keepValue = holdValue.addEventListener('click', () => {
  if (
    Number(document.querySelector(`#score--0`).textContent) >= 100 ||
    Number(document.querySelector(`#score--1`).textContent) >= 100
  )
    return;
  index === 0
    ? getValue(index, Number(document.querySelector('#current--0').textContent))
    : getValue(
        index,
        Number(document.querySelector('#current--1').textContent)
      );
  if (Number(document.querySelector(`#score--${index}`).textContent) >= 100)
    document.querySelector(`.player--${index}`).classList.add('player--winner');

  current = 1;
  addCurrent(index, current);
  changePlayer(index);
  index === 0 ? (index = 1) : (index = 0);
});

restartGame.addEventListener('click', () => {
  document.querySelector('#score--0').textContent = '0';
  document.querySelector('#score--1').textContent = '0';
  document.querySelector('#current--0').textContent = '0';
  document.querySelector('#current--1').textContent = '0';
  if (document.querySelector('.player--0').classList.contains('player--winner'))
    document.querySelector('.player--0').classList.remove('player--winner');
  else if (
    document.querySelector('.player--1').classList.contains('player--winner')
  )
    document.querySelector('.player--1').classList.remove('player--winner');
  if (index === 1) changePlayer(index);

  index = 0;
});
