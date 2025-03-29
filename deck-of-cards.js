/*

1. Make a request to the [Deck of Cards API](http://deckofcardsapi.com/) to request a single card from a newly
shuffled deck. Once you have the card, ***console.log*** the value and the suit (e.g. “5 of spades”, “queen of diamonds”).

2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card,
make a request to the same API to get one more card from the **same** deck.
    
    Once you have both cards, ***console.log*** the values and suits of both cards.
    
3. Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to
create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display
a new card, until there are no cards left in the deck.

*/

// doing everything in one

document.addEventListener('DOMContentLoaded', () => {
    let deck;
    const drawn = document.getElementById('drawn');

    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then(response => response.json())
        .then(response => {
            deck = response.deck_id;
            document.getElementById('deckID').innerHTML = deck;
            document.getElementById('drawCard').removeAttribute('disabled'); // prevents drawing a card until the deck is returned
        });

    document.getElementById('drawCard').addEventListener('click', () => {
        fetch(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`)
            .then(response => response.json())
            .then(response => {
                // if the deck runs out of cards, json returns a response with success = false
                if (!response.success) {
                    throw new Error(response.error);
                }

                // log and print the card
                const {value, suit} = response.cards[0];
                const r = `${value} of ${suit}`;
                console.log(r);
                drawn.innerHTML = 'Drew ' + r;

                // add the card img to page
                const img = document.createElement('img');
                img.src = response.cards[0].image;
                img.style.transform = `rotate(${Math.floor(Math.random() * 45)}deg)`
                img.style.left = (window.innerWidth / 2 - 136) + 'px';
                document.getElementById('cards').appendChild(img);
            })
            .catch(err => {
                console.log(err);
                drawn.innerHTML = '' + err;
            });
            
    });
});