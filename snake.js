class snakeSquare{
    constructor(left,top){
        this.left=left;
        this.top=top;
    }
}
console.log("we are connected")
let direction=[];
let snake=[];
let score=1;
let apple;
let id;
function startGame(){
    score=0;
    document.getElementById("start").style.display="none";
    let initial=document.getElementById("snake");
    let first=initial.getElementsByTagName("span");
    let endText=document.getElementsByTagName("p");
    if(endText[0]!==undefined){
        endText[0].remove();
    }
    
    document.getElementById("apple").style.display="initial";
    first[0].style.display="initial";
    let firstLeft=parseInt(window.getComputedStyle(first[0]).left);
    let firstTop=parseInt(window.getComputedStyle(first[0]).top);
    console.log(firstLeft +" " + firstTop);
    snake[0]=new snakeSquare(firstLeft,firstTop);
    newApple();
    direction[0]=0;
    direction[1]=-1;
    detectDir();
    id=setInterval(move,100);
}
function endGame(){
    if(snake[0].left==-20||snake[0].left==800||snake[0].top==-20||snake[0].top==600 ||snakeColision()) return true;
    return false;
}
function pauseGame(){};
function move(){
    for(let i=snake.length-1; i>=0; i--){
        if(i==0){
            snake[i].left+=direction[0]*20;
            snake[i].top+=direction[1]*20;
        }
        else{
            snake[i].left=snake[i-1].left;
            snake[i].top=snake[i-1].top;
        }

    }
    appleEated();
    displaySnake();
   
    if(endGame()){
        clearInterval(id);
        snake=[];
        document.getElementById("snake").innerHTML="<span></span>"
        document.getElementById("start").innerHTML="play again".toUpperCase();
        document.getElementById("start").style.display="initial";
        let endState=document.createElement("p");
        endState.innerHTML=  "game over".toUpperCase()+ "<br>" + " <span> your score is: ".toUpperCase() + score +".</span>"; 
        let scoreText= endState.getElementsByTagName("span");
        scoreText[0].style.color="green"
        Object.assign(endState.style, {
            left : "50%",
            top:"10%",
            transform:"translatex(-50%)",
            position:"absolute",
            color: "red",
            fontWeight: "bold",
            lineHeight: "2",
            textAlign: "center",
            fontSize: "26px"
          });
        document.getElementById("apple").style.display="none";
        document.getElementById("con").appendChild(endState);
    }
}

function appleEated(){
    if(snake[0].left==apple.left && snake[0].top==apple.top){
        prevLast=snake[snake.length-1];
        for(let i=1;i<4;i++){
            snake.push(new snakeSquare(prevLast.left-direction[0]*i*20,prevLast.top-direction[1]*i*20));
            let span=document.createElement("span");
            document.getElementById("snake").appendChild(span);
        }
        newApple();
        score++;
        console.log("left:"+apple.left+" top: "+ apple.top)
    }

}
function newApple(){
    let appleLeft=Math.floor((Math.random()*780+1)/20)*20;
    let appleTop=Math.floor((Math.random()*580+1)/20)*20;
    for(let i=0;i<snake.length;i++){
        if(snake[i].left==appleLeft && snake[i].top==appleTop)
            newApple();
    }
    
    apple=new snakeSquare(appleLeft,appleTop);
    let accessApple=document.getElementById("apple");
    accessApple.style.left=apple.left +"px";
    accessApple.style.top=apple.top + "px";
}
function displaySnake(){
    let pageSnake=document.getElementById("snake");
    let partsOfSnake=pageSnake.getElementsByTagName("span");
    for(let i=0;i<partsOfSnake.length;i++){
        partsOfSnake[i].style.left=snake[i].left +"px";
        partsOfSnake[i].style.top=snake[i].top +"px";
    }
    console.log(partsOfSnake.length);
}
function detectDir(){
    document.addEventListener("keydown", function(event) {
        
        switch (event.key) {
            case "ArrowUp":
                if(direction[1]==1)break;
                event.preventDefault();
                direction[0]=0;
                direction[1]=-1;
                break;
            case "ArrowDown":
                if(direction[1]==-1)break;
                event.preventDefault();
                direction[0]=0;
                direction[1]=1;
                break;
            case "ArrowLeft":
                if(direction[0]==1)break;
                direction[1]=0;
                direction[0]=-1;
                break;
            case "ArrowRight":
                if(direction[0]==-1)break;
                direction[1]=0;
                direction[0]=1;
                break;
        }
    });
}
function snakeColision(){
    let head=snake[0];
    for(let i=snake.length-1;i>1;i--){
        if(snake[0].left==snake[i].left && snake[0].top==snake[i].top)
            return true;
    }
    return false;

}


