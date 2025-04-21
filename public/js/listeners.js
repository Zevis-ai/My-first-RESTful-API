import { updateUIAdd } from './update-ui.js';

export const listener = () => {
    document.addEventListener('DOMContentLoaded', () => {
    const buttonContainer = document.querySelector('.position-absolute');

    buttonContainer.addEventListener('click', (event) => {
        const clickedButton = event.target.closest('button');
        if (clickedButton) {
        const value = clickedButton.value;

        if (value === 'add') {
            updateUIAdd();
        } else {
            console.log('Clicked button text:', clickedButton.textContent);
        }
        }
    });
    });
};
