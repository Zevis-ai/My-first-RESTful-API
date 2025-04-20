import { updateUI, loginAlertDiv, loginErrorAlertDiv } from "./update-ui.js";

export const api = async () => {
    let url = "http://127.0.0.1:3000/articles";
    try {
        let response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let data = await response.json();
        console.log("Articles:", data);
        updateUI(data);
    } catch (err) {
        console.error("Error fetching articles:", err);
    }
};


export const apiLogin = async (email, password) => {
    let url = "http://127.0.0.1:3000/users/login"
    try {
        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            loginErrorAlertDiv()
            throw new Error(`HTTP error! Status: ${response.status}`);
        } else {
            let data = await response.json();
            loginAlertDiv()
            console.log("Login response:", data);
            api();
        }
    } catch (err) {
        console.error("Error logging in:", err);
    }
}