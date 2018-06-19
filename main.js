"use strict;"

let card = document.getElementById('card');
let modal = document.getElementById('start-modal');
let modalBtn = document.getElementById('modal-btn');
let keepBtn = document.getElementById('keep');
let discardBtn = document.getElementById('discard');
let resetBtn = document.getElementById('reset');
let gameOn;
let tech = 0;
let soc = 0;
let pol = 0;
let keep = [];
let discard = [];

fetch('cards.json')
  .then(res => res.json())
  .then(cards => {
    console.log(cards);
    for (var i = 0; i < cards.length; i++) {
      card.innerHTML = `
        <img id="${cards[i].id}" class="${cards[i].category}" src="${cards[i].img}">
      `;
    }
  })
  .catch(err => console.error(err));

function start() {
  modal.style.display = "block";
  modalBtn.onclick = () => {
    modal.style.display = "none";
    gameOn = true;
    // cards get sorted randomly and a card fills in the first spot
    game();
  }
}

function game() {
  /* game starts, the first card is out, if the player chooses to keep the card, the card get placed in the keep array, if discarded it goes in the discarded array, a number gets added to one of the categories based on what card category is chosen, next card goes out, same thing, at the end, depending on which category has the most choices, the player chooses 3 cards, then 2 then 1, respectively according to each category, at the end the player gets a message depending on what categories they chose most. */

  // play(cardsArray);

  // choose();
  //
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

// function choose() {
//   if (keepBtn.click()) {
//     switch (category) {
//       case tech:
//         tech++;
//         break;
//       case soc:
//         soc++;
//         break;
//       case pol:
//         pol++;
//         break;
//       default:
//         break;
//     }
//     keep.push(card);
//     cards.filter(i => i !== keep[i]);
//   } else if (discardBtn.click()) {
//     discard.push(card);
//     cards.filter(i => i !== discard[i]);
//   }
//
// }
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
