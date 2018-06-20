"use strict;"

/* game starts, the first card is out, if the player chooses to keep the card, the card get placed in the keep array, if discarded it goes in the discarded array, a number gets added to one of the categories based on what card category is chosen, next card goes out, same thing, at the end, depending on which category has the most choices, the player chooses 3 cards, then 2 then 1, respectively according to each category, at the end the player gets a message depending on what categories they chose most. */

let card = document.getElementById('card');
let modal = document.getElementById('start-modal');
let modalBtn = document.getElementById('modal-btn');
let keepBtn = document.getElementById('keep');
let discardBtn = document.getElementById('discard');
let resetBtn = document.getElementById('reset');
let gameOn;
let current;
let cardsLeft;
let keepTech = [];
let keepSoc = [];
let keepPol = [];
let compareCategories = [keepTech.length, keepSoc.length, keepPol.length];
let largest;
let secondLargest;
let thirdLargest;
let discard = [];

function start() {
  modal.style.display = "block";
  modalBtn.onclick = () => {
    modal.style.display = "none";
    gameOn = true;
  }
}

function shuffle(arr) {
  let current = arr.length, temp, rand;

  while (0 !== current) {
    rand = Math.floor(Math.random() * current);
    current -= 1;

    temp = arr[current];
    arr[current] = arr[rand];
    arr[rand] = temp;
  }

  return arr;
}

fetch('cards.json')
  .then(res => res.json())
  .then(cards => {

    shuffle(cards);

    let i = 0;

    play();

    compareCategories = compareCategories.sort((a, b) => a + b);

    // pick3(compareCategories[0]);
    //
    // pick2(compareCategories[1]);
    //
    // pick1(compareCategories[2]);

    // end();

    function play() {
      console.log(i);
      current = cards[i];
      console.log(current);
      card.innerHTML = `
        <img id="${current.id}" class="${current.category}" src="${current.img}">
      `;

      keepBtn.addEventListener('click', function() {
        chooseKeep(current);
      });

      discardBtn.addEventListener('click', function() {
        chooseDiscard(current);
      });

      function chooseKeep(card) {
        switch (card.category) {
          case 'technical':
            keepTech.push(card);
            break;
          case 'social':
            keepSoc.push(card);
            break;
          case 'political':
            keepPol.push(card);
            break;
          default:
            break;
        }
        i++;
        current = cards[i];
        console.log(current);
      }

      function chooseDiscard(card) {
        discard.push(card);
        i++;
        // if (index === cardArr.length - 1) {
        //   // pick3();
        // } else {
        //   play(cardArr, index);
        // }
      }

    }

    // function pick3(categoryArr, index) {
    //   keepBtn.addEventListener('click', function() {
    //     chooseKeep(current);
    //   });
    //
    //   discardBtn.addEventListener('click', function() {
    //     chooseDiscard(current);
    //   });
    // }

    //
    // function end() {
    //
    // }
    //
    resetBtn.addEventListener('click', reset);

    function reset() {
      gameOn = false;
      start();
    }

  })
  .catch(err => console.error(err));
