import { updateUI, loginAlertDiv, loginErrorAlertDiv, loader } from "./update-ui.js";

export const api = async () => {
    let url = "http://127.0.0.1:3000/articles";
    loader()
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
            console.log("token", data.token);
            localStorage.setItem("token", data.token);
            
            loginAlertDiv()
            console.log("Login response:", data);
            api();
        }
    } catch (err) {
        console.error("Error logging in:", err);
    }
}

export const apiSignup = async (name, email, password) => {
    let url = "http://127.0.0.1:3000/users/signup"
    try {
        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name, email, password })
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
        console.error("Error signing up:", err);
    }
}

export const apiAddArticle = async (form ,formData, message) => {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch('/articles', {
            method: 'POST',
            headers: {
            Authorization: `Bearer ${token}`,
        },
            body: formData,
        });
        const data = await res.json();
        if (res.ok) {
            message.innerHTML = `<div class="alert alert-success">✔ ${data.message}</div>`;
            form.reset();
        } else {
            message.innerHTML = `<div class="alert alert-danger">✖ ${data.message || 'שגיאה בשליחה'}</div>`;
        }
    } catch (err) {
        console.error(err);
        message.innerHTML = `<div class="alert alert-danger">⚠ שגיאת רשת</div>`;
    }
}

export const apiGetAllCategory = async () => {
    const url = "http://127.0.0.1:3000/categories";
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Categories:", data);
        return data;
    } catch (err) {
        console.error("Error fetching categories:", err);
        return null;
    }
};

