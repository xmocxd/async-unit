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

document.addEventListener('DOMContentLoaded', () => {
    let deck;
    fetch('https://deckofcardsapi.com/api/deck/new/')
        .then(response => response.json())
        .then(response => {
            deck = response.deck_id;
            document.getElementById('deckID').innerHTML = deck;
        });
});