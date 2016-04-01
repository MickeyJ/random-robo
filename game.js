'use strict';
const EventEmitter = require('events').EventEmitter;
const colors = require('colors');

const Play = function(timeLimit){
  var e = new EventEmitter();
  process.nextTick(() =>{
    e.emit('start');
    let plays = 0,
        pOnePoints  = 0,
        pTwoPoints  = 0;
    const gamePlay = setInterval(() =>{
      plays++;
      let pOnePlay = Math.floor(Math.random() * (Math.floor(Math.random() * 600)) * 100);
      let pTwoPlay = Math.floor(Math.random() * (Math.floor(Math.random() * 600)) * 100);

      pOnePoints += pOnePlay * Math.floor(Math.random() * 1000);
      pTwoPoints += pTwoPlay * Math.floor(Math.random() * 1000);
      e.emit('playing', plays, pOnePoints, pTwoPoints);

      if(plays === timeLimit){
        clearInterval(gamePlay);
        e.emit('end', pOnePoints, pTwoPoints);
      }
    }, 60)
  });
  return e
};


const Game = Play(200);

Game.on('start',() =>{
  console.log('GO!');
});

Game.on('playing',(plays, p1, p2) =>{
  if(p1 > p2){
    console.log(`Go Player One!`.blue.inverse);
  }
  else if(p1 < p2){
    console.log(`Go Player Two!`.red.inverse);
  }
  console.log(`Plays:`+ `${plays}`.cyan);
  console.log(`playerOne: `+ `${p1}`.green.bold.inverse);
  console.log(`playerTwo: `+ `${p2}\n`.yellow.bold.inverse);
});

Game.on('end', (p1, p2) =>{
  if(p1 > p2){
    console.log(`Player One Wins with ${p1} points!`.inverse.bold);
    console.log(`Player Two: ${p2}`.magenta);
  } else {
    console.log(`Player Two Wins with ${p2} points!`.inverse.bold);
    console.log(`Player one: ${p1}`.magenta);
  }
});

