const chart = document.querySelector(".chart");
const canvas = document.createElement('canvas');
const shed = document.querySelector("body");
canvas.width = 60;
canvas.height = 56;
chart.appendChild(canvas);
const ctx = canvas.getContext('2d');

function drawCircle(color, ratio, anticlockwise){
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.lineWidth = 6;
    ctx.arc(canvas.width/2, canvas.height/2, 25, 0, ratio*2*Math.PI, anticlockwise)
    ctx.stroke()
} 

function updateChart(theIncome, theExpense){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    let incratio = -(theIncome/(theIncome + theExpense));
    let expratio = 1 - incratio;
   
    if(shed.classList.contains("dark")){
        drawCircle("orangered", expratio, false);
        drawCircle(`rgb(11,226,18)`, incratio, true);
    }else{
        drawCircle("orangered", expratio, false);
        drawCircle("rebeccapurple", incratio, true);
    }
}
