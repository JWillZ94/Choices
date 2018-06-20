"use strict;"

/* game starts, the first card is out, if the player chooses to keep the card, the card get placed in the keep array, if discarded it goes in the discarded array, a number gets added to one of the categories based on what card category is chosen, next card goes out, same thing, at the end, depending on which category has the most choices, the player chooses 3 cards, then 2 then 1, respectively according to each category, at the end the player gets a message depending on what categories they chose most. */

let currentCard = document.getElementById('card');
let list = document.getElementById('list');
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
let compareCategories;
let largest;
let secondLargest;
let thirdLargest;
let discard = [];

function start() {
  modal.style.display = "block";
  modalBtn.onclick = () => {
    modal.style.display = "none";
    gameOn = true;

    fetch('cards.json')
      .then(res => res.json())
      .then(cards => {

        shuffle(cards);

        let i = 0;

        play();

        //
        // pick2(compareCategories[1]);
        //
        // pick1(compareCategories[2]);

        // end();

        function play() {
          current = cards[i];
          currentCard.innerHTML = `
            <img id="${current.id}" class="${current.category}" src="${current.img}">
          `;

          keepBtn.addEventListener('click', function() {
            console.log(i);
            if (i === cards.length - 1) {
              keepBtn.removeEventListener('click', function(){});
              discardBtn.removeEventListener('click', function(){});
              compareCategories = [keepTech, keepSoc, keepPol].sort((a, b) => b.length - a.length);
              pick3(compareCategories[0]);
            } else {
              chooseKeep(current);
            }
          });

          discardBtn.addEventListener('click', function() {
            if (i === cards.length - 1) {
              keepBtn.removeEventListener('click', function(){});
              discardBtn.removeEventListener('click', function(){});
              compareCategories = [keepTech, keepSoc, keepPol].sort((a, b) => b.length - a.length);
              pick3(compareCategories[0]);
            } else {
              chooseDiscard(current);
            }
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
            currentCard.innerHTML = `
              <img id="${current.id}" class="${current.category}" src="${current.img}">
            `;
          }

          function chooseDiscard(card) {
            discard.push(card);
            i++;
            current = cards[i];
            currentCard.innerHTML = `
              <img id="${current.id}" class="${current.category}" src="${current.img}">
            `;
          }

        }

        function pick3(categoryArr) {
          currentCard.innerHTML = "PICK 3 CARDS";
          var threeCards = [];
          categoryArr.map(i => {
            list.innerHTML += `
              <li>
                <img id="${i.id}" class="${i.category}" src="${i.img}" width="300" height="300">
              </li>
            `;
          });

          let pick3Arr = document.getElementsByTagName("img");
          for (let card of pick3Arr) {
            card.addEventListener('click', function(e) {
              choose3Cards(e);
              if (threeCards.length === 3) {
                card.removeEventListener('click', function(){});
                pick2(compareCategories[1], categoryArr);
              }
            });
          }

          function choose3Cards(e) {
            threeCards.push(e.target.id);
          }

        }

        function pick2(categoryArr, biggestCategory) {
          currentCard.innerHTML = "PICK 2 CARDS";
          var twoCards = [];
          list.innerHTML = "";
          categoryArr.map(i => {
            list.innerHTML += `
              <li>
                <img id="${i.id}" class="${i.category}" src="${i.img}" width="300" height="300">
              </li>
            `;
          });

          let pick2Arr = document.getElementsByTagName("img");
          for (let card of pick2Arr) {
            card.addEventListener('click', function(e) {
              if (twoCards.length === 2) {
                card.removeEventListener('click', function(){});
                pick1(compareCategories[2], biggestCategory);
              }
              choose2Cards(e);
            });
          }

          function choose2Cards(e) {
            twoCards.push(e.target.id);
          }
        }

        function pick1(categoryArr, biggestCategory) {
          currentCard.innerHTML = "PICK 1 CARD";
          var oneCard = [];
          list.innerHTML = "";
          categoryArr.map(i => {
            list.innerHTML += `
              <li>
                <img id="${i.id}" class="${i.category}" src="${i.img}" width="300" height="300">
              </li>
            `;
          });

          let pick1Arr = document.getElementsByTagName("img");
          for (let card of pick1Arr) {
            card.addEventListener('click', function(e) {
              if (oneCard.length === 1) {
                card.removeEventListener('click', function(){});
                compareCategories = [keepTech, keepSoc, keepPol].sort((a, b) => b.length - a.length);
                end(biggestCategory);
              }
              choose1Card(e);
            });
          }

          function choose1Card(e) {
            oneCard.push(e.target.id);
          }
        }

        function end(biggestCategory) {
          list.innerHTML = "";
          switch (biggestCategory[0].category) {
            case 'technical':
              currentCard.innerHTML = "Technique Freak";
              break;
            case 'social':
              currentCard.innerHTML = 'social butterfly';
              break;
            case 'political':
              currentCard.innerHTML = 'political playa';
              break;
            default:
              break;
          }
        }


      })
      .catch(err => console.error(err));

  }
}

resetBtn.addEventListener('click', reset);

function reset() {
  gameOn = false;
  start();
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
