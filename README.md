# General Assembly Web Development Immersive Project 0: Battleships!

### To play, see the [live version](https://robo2323.github.io/battleships/) 

## Installation
After cloning this repository to your own machine, in the root of the project directory run:
```
npm install
```
This will install dependencies (including Webpack).

## To build the project (Webpack) run:
```
npm run build
```
This will build the bundle.js file into the _**dist**_ directory.
Open _**index.html**_ in the _**dist**_ directory to play the game.

## About
I think I was trying to structure the project a bit like a React app without realising it, with partial success. Looking at it now (I am writing this a couple months after coding it) it is quite a strange way I have structured it, injecting that whole chunk of back-tick wrapped HTML from the index.js to the DOM. I'm sure I had a logical reason for doing that at the time....Perhaps I should re-build this actually using React

## TODOs
- [ ] Refactor code so logic and DOM stuff are completely separate
- [ ] Rebuild in React?
- [ ] Remove use of global variables
- [ ] Restructure code to take full advantage of Webpack, separating all functions out into their own files.
- [ ] Make network play possible
- [ ] Improve AI (using probabilities or dynamic programming?)  
- [ ] More game modes
- [ ] players alternate turns between games
## License
Dual MIT & GPL



