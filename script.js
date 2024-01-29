let boxElements = document.querySelectorAll('.game-box');
let resetBtnElement = document.querySelector('#reset-btn');
let resultElement = document.querySelector('.result');

let turnO = true;

const winningChances = [
  [0,1,2],
  [0,4,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [2,4,6],
  [3,4,5],
  [6,7,8],
];

let count = 0;
boxElements.forEach((box)=>{
  box.addEventListener('click',()=>{
    // console.log('button clicked');
    if(turnO){
      box.innerText = `O`;
      turnO = false;
    } else {
      box.innerText = `X`;
      turnO = true;
    }
    count++;
    box.disabled = true;
    let isWin = checkWinner();
    // console.log(count);
    if(!isWin && count === 9){
      gameDraw();
    }
  });
});


const checkWinner = () => {
  for (let chances of winningChances){
    let posOne = boxElements[chances[0]].innerText;
    let posTwo = boxElements[chances[1]].innerText;
    let posThree = boxElements[chances[2]].innerText;

    if(posOne !='' && posTwo !='' && posThree !=''){
      if(posOne===posTwo && posTwo===posThree){
        showWinner(posOne);
        return true;
      }
    }
  }
}

const showWinner = (winner) => {
  // console.log(`Winner is ${winner}`);
  resultElement.innerHTML = `<h1> Winner is ${winner} </h1>`;
  resultElement.classList.remove('hide');
  disableBoxes();
}

const gameDraw = () => {
  resultElement.innerHTML = `<h1> Game is drawn </h1>`;
  resultElement.classList.remove('hide');
  disableBoxes();
}

const disableBoxes = () => {
  for (let box of boxElements) {
    box.disabled = true;
  }
}

const enableBoxes = () => {
  for (let box of boxElements){
    box.disabled = false;
    box.innerText = '';
  }
}

const resetGame = () => {
  resultElement.classList.add('hide');
  turnO = true;
  count = 0;
  enableBoxes();
} 
resetBtnElement.addEventListener('click',resetGame);