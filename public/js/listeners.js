import { api } from './api.js';
import { updateUIAdd ,allCategory, updateUIHome} from './update-ui.js';
import { loginDiv } from './login.js';

const main = document.querySelector("main");
const appdiv = document.getElementById('app');

export const listener = () => {
    document.addEventListener('DOMContentLoaded', () => {
    const buttonContainer = document.querySelector('.position-absolute');

    buttonContainer.addEventListener('click', (event) => {
        const clickedButton = event.target.closest('button');
        if (clickedButton) {
        const value = clickedButton.value;

        if(value === `articles`){
            api() 
        }
        if (value === "home") {
            updateUIHome()
        }
        if(value === "connection"){
            loginDiv()
        }
        if (value === 'category'){
            allCategory()
        }
        if (value === 'add') {
            updateUIAdd();
        } else {
            console.log('Clicked button text:', clickedButton.textContent);
        }
        }
    });
    });
};
