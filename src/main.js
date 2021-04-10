let btnSimulate = document.querySelector(".simulate");
let btnRe = document.querySelector(".reSimulate");

let simulator = document.querySelector('.simulator');
let result = document.querySelector('.result');

let name = document.getElementById("name");
let fee = document.getElementById("fee");
let time = document.getElementById("time");
let rate = document.getElementById("rate");
let para = document.querySelector('.show');

btnSimulate.addEventListener('click', function (event) {
    event.preventDefault();
    
    fetch('https://api.mathjs.org/v4/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "expr": `${fee.value} * (((1 + ${Number(rate.value)/100}) ^ (${time.value} * 12) - 1) / ${Number(rate.value)/100})` }),
    })
    .then( function(response) {
        return response.json()
    })
    .then( function(json) {
        
        para.textContent = `Olá ${name.value} juntando R$ ${fee.value} todo mês, você terá R$ ${json['result']} em ${time.value} anos.`;
        simulator.classList.add('hide');
        result.classList.remove('hide');
    })
    .catch(function(error){
        console.log("Error message: "+error);
    });  
});

btnRe.addEventListener('click', function(event){
    event.preventDefault();
    document.querySelector('form').reset();
    para.textContent = "";
    simulator.classList.remove('hide');
    result.classList.add('hide');
});
