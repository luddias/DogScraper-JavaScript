let number = document.getElementById("number");
let counter = 0;
setInterval(()=> {
    counter +=1;
    number.innerHTML = counter + "%";
},1000);

let progressValue = 0;
let progressEndValue = 65;
let speed = 50;

let progress = setInterval(()=>{
    progressValue++;
    valueContainer.textContent= '${}';
    if (progressValue == progressEndValue){
        clearInterval(progress);
    }
});