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
let tech = 0;
let soc = 0;
let pol = 0;
let keep = [];
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

    for (var i = 0; i < cards.length; i++) {
      current = cards[i];
      console.log(current);
      card.innerHTML = `
        <img id="${current.id}" class="${current.category}" src="${current.img}">
      `;

      keepBtn.addEventListener('click', function() {
        chooseKeep(current);
        i++;
      });

      discardBtn.addEventListener('click', function() {
        chooseDiscard(current);
        i++;
      });

      function chooseKeep(card) {
        switch (card.category) {
          case 'technical':
            tech++;
            break;
          case 'social':
            soc++;
            break;
          case 'political':
            pol++;
            break;
          default:
            break;
        }
        keep.push(card);
      }

      function chooseDiscard(card) {
        discard.push(card);
      }

      // checkCards();
      //
      // choose3();
      //
      // choose2();
      //
      // choose1();
      //
      // end();



    }




    //
    // function checkCards() {
    //   if (cards.length > 0) {
    //     game();
    //   }
    // }
    //
    // function choose3(category) {
    //   switch (category) {
    //     case 'technical':
    //       play(arr)
    //   }
    // }
    //
    // function choose2(category) {
    //
    // }
    //
    // function choose1(category) {
    //
    // }
    //
    // function end() {
    //
    // }
    //
    // resetBtn.onclick(reset);
    //
    // function reset() {
    //   gameOn = false;
    //   start();
    // }

  })
  .catch(err => console.error(err));
