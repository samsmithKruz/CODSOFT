let keypad = document.querySelector(".keypad");
keypad.addEventListener("click", ({ target }) => {
    if (target.classList.contains("keypad")) return 0;
    let displayInput = document.querySelector(".display .input"), displayOutput = document.querySelector(".display .output");
    if (Boolean(Object.keys(target.dataset).length)) {
        // An operator 
        let num_precision = (val) => {
            try {
                if (Number.isInteger(val)) {
                    return val;
                } else if (!Number.isNaN(val)) {
                    return parseFloat(val.toFixed(8));
                }
            } catch (e) {
                return "NaN";
            }
        }
        switch (target.dataset.key) {
            case "/":
                displayInput.textContent = displayInput.textContent + "/";
                return 0;
            case "*":
            case "+":
            case "-":
                displayInput.textContent = displayInput.textContent + `${target.dataset.key}`;
                return 0;
            case "=":
                try {
                    let val = eval(displayInput.textContent);
                    displayOutput.textContent = num_precision(val);
                } catch (e) {
                    displayOutput.textContent = "NaN";
                }
                return 0;
            case "%":
                try {
                    let i = eval(displayInput.textContent);
                    i = i / 100;
                    displayInput.textContent = num_precision(i);
                    displayOutput.textContent = num_precision(i);
                } catch (e) {
                    displayOutput.textContent = "NaN";
                }
                return 0;
            case "ac":
                displayInput.textContent = 0;
                displayOutput.textContent = 0;
                return 0;
            case "backspace":
                displayInput.textContent = (displayInput.textContent.length == 1) ? 0 :
                    displayInput.textContent.slice(0, displayInput.textContent.length - 1);
                return 0;


        }
    }
    displayInput.textContent = displayInput.textContent == 0 ? target.textContent : displayInput.textContent + "" + target.textContent;
})