"use strict;"

/* game starts, the first card is out, if the player chooses to keep the card, the card get placed in the keep array, if discarded it goes in the discarded array, a number gets added to one of the categories based on what card category is chosen, next card goes out, same thing, at the end, depending on which category has the most choices, the player chooses 3 cards, then 2 then 1, respectively according to each category, at the end the player gets a message depending on what categories they chose most. */

let currentCard = document.getElementById('card');
let list = document.getElementById('list');
let modal = document.getElementById('start-modal');
let modalBtn = document.getElementById('modal-btn');
let keepBtn = document.getElementById('keep');
let discardBtn = document.getElementById('discard');
let resetBtn = document.getElementById('reset');
let btnsContainer = document.getElementById('btns-container');
let directions = document.getElementById('directions');
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
let i = 0;

function start() {
  modal.style.display = "block";
  modalBtn.onclick = () => {
    modal.style.display = "none";
    gameOn = true;

    btnsContainer.style.display = 'block';
    currentCard.style.height = '325px';

    fetch('cards.json')
      .then(res => res.json())
      .then(cards => {

        shuffle(cards);

        i = 0;

        play();

        function play() {
          current = cards[i];
          currentCard.innerHTML = `
            <img id="${current.id}" class="${current.category}" src="${current.img}" width="325" height="325">
          `;

          keepBtn.addEventListener('click', function() {
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
              <img id="${current.id}" class="${current.category}" src="${current.img}" width="325" height="325">
            `;
          }

          function chooseDiscard(card) {
            discard.push(card);
            i++;
            current = cards[i];
            currentCard.innerHTML = `
              <img id="${current.id}" class="${current.category}" src="${current.img}" width="325" height="325">
            `;
          }

        }

        function pick3(categoryArr) {
          currentCard.style.height = '40px';
          currentCard.innerHTML = "Choose 3 qualities.";
          btnsContainer.style.display = 'none';
          directions.style.display = 'none';
          var threeCards = [];
          categoryArr.map(i => {
            list.innerHTML += `
              <li>
                <img id="${i.id}" class="${i.category}" src="${i.img}" width="300" height="300">
              </li>
            `;
          });

          let pick3Arr = document.getElementsByTagName("li");
          for (let card of pick3Arr) {
            card.addEventListener('click', function(e) {
              choose3Cards(e, card);
            });
          }

          function choose3Cards(e, card) {
            threeCards.push(e.target.id);
            card.parentNode.removeChild(card);
            if (threeCards.length === 3) {
              card.removeEventListener('click', function(){});
              pick2(compareCategories[1], categoryArr);
            }
          }

        }

        function pick2(categoryArr, biggestCategory) {
          currentCard.innerHTML = "Choose 2 qualities.";
          var twoCards = [];
          list.innerHTML = "";
          categoryArr.map(i => {
            list.innerHTML += `
              <li>
                <img id="${i.id}" class="${i.category}" src="${i.img}" width="300" height="300">
              </li>
            `;
          });

          let pick2Arr = document.getElementsByTagName("li");
          for (let card of pick2Arr) {
            card.addEventListener('click', function(e) {
              choose2Cards(e, card);
            });
          }

          function choose2Cards(e, card) {
            twoCards.push(e.target.id);
            card.parentNode.removeChild(card);
            if (twoCards.length === 2) {
              card.removeEventListener('click', function(){});
              pick1(compareCategories[2], biggestCategory);
            }
          }
        }

        function pick1(categoryArr, biggestCategory) {
          currentCard.innerHTML = "Choose a quality.";
          var oneCard = [];
          list.innerHTML = "";
          categoryArr.map(i => {
            list.innerHTML += `
              <li>
                <img id="${i.id}" class="${i.category}" src="${i.img}" width="300" height="300">
              </li>
            `;
          });

          let pick1Arr = document.getElementsByTagName("li");
          for (let card of pick1Arr) {
            card.addEventListener('click', function(e) {
              choose1Card(e, card);
            });
          }

          function choose1Card(e, card) {
            oneCard.push(e.target.id);
            card.parentNode.removeChild(card);
            if (oneCard.length === 1) {
              card.removeEventListener('click', function(){});
              compareCategories = [keepTech, keepSoc, keepPol].sort((a, b) => b.length - a.length);
              end(biggestCategory);
            }
          }
        }

        function end(biggestCategory) {
          list.innerHTML = "";
          switch (biggestCategory[0].category) {
            case 'technical':
              currentCard.innerHTML = "<p>Congrats, you are a technical person, you pay attention to detail to make sure everything goes as planned. You want to know the facts and a practical way to do things that make sense. You lead with having a high amount of skill in your preferred field and the knowledge to carry out tasks efficiently.</p>";
              break;
            case 'social':
              currentCard.innerHTML = '<p>Congrats, you are a social person, you love interacting with others in order to meet a common goal. You believe that there is power in the people and prefer helping and working with others in order to meet a challenge. You lead with having a large amount of people at your back ready to help you in any endeavor.</p>';
              break;
            case 'political':
              currentCard.innerHTML = '<p>Congrats, you are a political person, you love having power and respect from everyone. You are most likely a popular person who has many connections and is very persuasive. You lead through knowing all the right people in the highest places and while persuading others to agree with any opinion you have.</p>';
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
  location.reload();
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
