let buttonsArray = Array.from(document.querySelectorAll('.button'));
let problem = document.querySelector('.problem');
let hotAnswer = document.querySelector('.hotAnswer');
let calculator = document.querySelector('.calculator');
let toggleSpace = document.querySelector('.toggleSpace');
let toggleButton = document.querySelector('.toggleButton');
let calculatorScreen = document.querySelector('.calculatorScreen');

let calculate = (buttonPressed) => {
    switch (buttonPressed) {

        case 'C':
            problem.innerText = 0;
            hotAnswer.innerText = '';
            break;
        
        case '<i class="fa-solid fa-delete-left"></i>':
            problem.innerText = (problem.innerText == 0 || problem.innerText.length == 1 || problem.innerText == 'Error') ? 0 : problem.innerText.slice(0, -1);

        case '=':
            try{

                let calculation = eval(problem.innerText);
                problem.innerText = (!Number.isNaN(calculation) && Number.isInteger(calculation)) ? calculation : calculation.toFixed(4);
                
            }catch{
                problem.innerText = 'Error';
            }

            hotAnswer.innerText = '';
            problem.innerText = problem.innerText.length > 8 ? parseInt(problem.innerText).toExponential() : problem.innerText;
            break;

        default:
            problem.innerText = (problem.innerText == 0 || problem.innerText == 'Error') ? problem.innerText = buttonPressed : problem.innerText += buttonPressed;
            try{

                let calculation = eval(problem.innerText);
                hotAnswer.innerText = (!Number.isNaN(calculation) && Number.isInteger(calculation)) ? calculation : calculation.toFixed(4);
                
            }catch{
                hotAnswer.innerText = problem.innerText;
            }
            break;
    }
}

buttonsArray.map((button) => {
    button.addEventListener('click', () => {
        let buttonPressed = button.innerHTML;
        calculate(buttonPressed);
    });
})

window.onkeyup = (e) => {
    let operators = ['+','=','-','*','/','(',')'];
    if(!isNaN(parseInt(e.key)) || operators.includes(e.key) || e.key == 'Backspace' || e.key == 'Enter' || e.key == 'e'){
        let keyPressed = e.key;
        keyPressed = keyPressed == "Backspace" ? '←' : keyPressed;
        keyPressed = keyPressed == "Enter" ? '=' : keyPressed;
        calculate(keyPressed);
    }
}

// Toggle Dark Mode
let onlightmode = () => {
    document.body.style.background = 'rgb(245,245,245)';
    document.body.style.color = "#121212";
    calculator.style.boxShadow = '0px 0px 16px 0px rgba(100,100,100,0.2)';
    calculator.style.background = '#fff';
    toggleButton.style.background = '#fff';
    toggleSpace.style.background = '#121212';
    toggleSpace.style.justifyContent = 'right';
    calculatorScreen.style.borderColor = 'rgb(245,245,245)';
    localStorage.setItem('calculatorIsDark', 0);
}

let ondarkmode = () => {
    document.body.style.background = '#121212';
    document.body.style.color = "white";
    calculator.style.boxShadow = 'none';
    calculator.style.background = '#181818';
    toggleButton.style.background = '#121212';
    toggleSpace.style.background = '#fff';
    toggleSpace.style.justifyContent = 'left';
    calculatorScreen.style.borderColor = '#121212';
    localStorage.setItem('calculatorIsDark', 1);
}

let toggleOnButtonClick = ()=> {
    if(localStorage.getItem('calculatorIsDark') == 1){
        onlightmode();
    }else if(localStorage.getItem('calculatorIsDark') == 0){
        ondarkmode();
    }
}

let toggleModeOnStart = () => {
    if(localStorage.getItem('calculatorIsDark') == 1){
        ondarkmode();
    }else if(localStorage.getItem('calculatorIsDark') == 0){
        onlightmode();
    }
}