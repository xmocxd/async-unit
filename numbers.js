/*
1. Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number.
(Make sure you get back JSON by including the ***json*** query key, specific to this API.
[Details](http://numbersapi.com/#json).

2. Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back,
put all of the number facts on the page.

3. Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page.
It’s okay if some of the facts are repeats.
    
    *(Note: You’ll need to make multiple requests for this.)*
*/


// ...
// just combine everything, gets X facts for 1 or multiple numbers depending on input

const numbers = [8];
const numfacts = 10;

const facts = {};
const requests = [];

for (let i = 0; i < numfacts; i++) {
    requests.push(fetch('http://numbersapi.com/' + numbers.join() + '?json').then(response => response.json()));
}

Promise.all(requests).then((values) => {
    // the json return format is different if you have one or multiple numbers (batch)
    if (numbers.length === 1) {
        const f = values.map(v => v.text);
        // dedupe
        facts[numbers[0]] = f.filter((v, i, self) => { return self.indexOf(v) === i });
    } else {
        for (num of numbers) {
            facts[num] = [];
            const f = values.map(v => v[num]);
            // dedupe
            facts[num].push(...f.filter((v, i, self) => { return self.indexOf(v) === i }));
        }
    }
    console.log(facts);
    //console.log(values);
});