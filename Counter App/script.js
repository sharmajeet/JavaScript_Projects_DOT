// parseInt() is used for parsing the string value to int value.
const countValue = document.querySelector('#counter');

// increment arrow function
const increment = () => {
    // step-1 : get value from UI
    let value = parseInt(countValue.innerText);
    // step-2 : Increment value
    value = value + 1;
    // step-3 : reassigned value
    countValue.innerText = value;
};

// decremt arrow function
const decrement = () => {
    // stpe-1 : get value from UI
    let value = parseInt(countValue.innerText);
    // step-2 : decrement value 
    value = value - 1;
    // step-3 : reassign value 
    countValue.innerText = value;

};
