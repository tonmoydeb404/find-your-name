// VARRIABLES
const btns = [...document.querySelectorAll('.box .btn')];
const display = document.getElementById('display');
let selectedBtn = null;
let clickable = true;
let text = '';


// FUNCTIONS

const getText = () => {
    text = prompt('Enter Your Name');

    if(text === null){
        text = "TONMOY"
    }if(text.length > 10) {
        alert('Maximum name character length is 10');
        getText();
    }else{
        text= (text.replace(/\s/g, '')).toUpperCase()
    }
}

const loopInText = (func) => {
    for (const t of text) {
        func(t)
    }
}

const createDisplay = (value) => {
    const segment = document.createElement('span');
    segment.classList.add('segment');
    segment.dataset.value = value;
    segment.innerHTML = value;

    display.appendChild(segment);
}

const activeSegment = (value) => {
    const segment = [...display.childNodes].find(s => {
        return !s.classList.contains('active') && s.dataset.value === value;
    })

    segment.classList.add('active');
}

const randomDataButton = (value) => {
    const randomButton = btns[Math.floor(Math.random() * btns.length)];

    if(!randomButton.value.length){
        randomButton.value = value;
    }else{
        randomDataButton(value)
    }
}

const handleClick = (btn) => {

    btn.classList.add('clicked');

    if(selectedBtn  === null && btn.value === "") {
        btn.innerHTML = "😋";

        clickable = false;
        setTimeout(() => {
            clearBtn([btn])
        }, 500);
    }else if(selectedBtn  === null && btn.value) {
        btn.innerHTML = btn.value;
        selectedBtn = btn;

    } else if(selectedBtn  !== null && btn.value === "") {
        btn.innerHTML = "😋";

        clickable = false;
        setTimeout(() => {
            clearBtn([btn, selectedBtn]);
            selectedBtn = null;
        }, 500);
    }else if(selectedBtn  !== null && btn.value){
        btn.innerHTML = btn.value;

        if(btn.value === selectedBtn.value){
            console.log("matched")
            btn.classList.add('correct');
            selectedBtn.classList.add('correct');

            selectedBtn = null;
            activeSegment(btn.value)
            checkWinner()
        }else{
            clickable = false;
            setTimeout(() => {
                clearBtn([btn, selectedBtn]);
                selectedBtn = null;
            }, 500);
        }

    }
}

const checkWinner = () => {
    const isWinning = [...display.childNodes].every(x => x.classList.contains('active'));

    if(isWinning){
        if (confirm("Hurray You win😋 Let's Restart The Game")) {
            location.reload()
        }
    }else{
        return;
    }
}

const clearBtn = (arr) => {
    arr.map(a => {
        
        a.classList.remove('clicked');
        a.innerHTML = "❤";
    })
    clickable = true;
} 

// CALL FUNCTIONS
getText();
loopInText(createDisplay);
loopInText(randomDataButton);
loopInText(randomDataButton);

btns.forEach(btn => {
    btn.addEventListener('click', () => {
        if(clickable){
            handleClick(btn)
        }else{
            return;
        }
        
    })
});