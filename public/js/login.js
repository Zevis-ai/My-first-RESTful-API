import { apiLogin, apiSignup } from "./api.js";
const main = document.querySelector("main");


export const login = async () => {
    loginDiv()
    const signupLink = document.getElementById("signupLink");

    signupLink.addEventListener("click", (e) => {
        signupDiv()
        addEventListeners();
    })
};


const addEventListeners = () => {
    const loginLink = document.getElementById("loginLink");
    if (loginLink) {
        loginLink.addEventListener("click", (e) => {
            loginDiv();
            addEventListeners();
        });
    }
};

const loginDiv = () =>{
    main.innerHTML = `
        <div class="container d-flex justify-content-center align-items-center min-vh-100">
            <div class="login-form shadow-lg p-4 rounded-3 bg-light w-100" style="max-width: 500px;">
                <h1 class="text-center mb-4 text-primary">Login</h1>
                <form id="loginForm">
                    <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" class="form-control" id="email" required placeholder="Enter your email">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" required placeholder="Enter your password">
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <button type="submit" class="btn btn-primary w-100">Login</button>
                    </div>
                    <p class="text-center mt-3">
                        Don't have an account? <a href="#" id="signupLink" class="text-primary">Sign up</a>
                    </p>
                </form>
            </div>
        </div>
    `;

    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            
            // console.log("Logging in with:", { email, password });
            apiLogin(email, password)
            .then((response) => {
                console.log("Login successful:", response);
            })
        });
    }

}

const signupDiv = () =>{
    main.innerHTML = `
            <div class="container d-flex justify-content-center align-items-center min-vh-100">
                <div class="signup-form shadow-lg p-4 rounded-3 bg-light w-100" style="max-width: 500px;">
                    <h1 class="text-center mb-4 text-primary">Sign Up</h1>
                    <form id="signupForm">
                        <div class="mb-3">
                            <label for="name" class="form-label">name</label>
                            <input type="" class="form-control" id="name" required placeholder="Enter your name">
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" class="form-control" id="email" required placeholder="Enter your email">
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password" required placeholder="Enter your password">
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <button type="submit" class="btn btn-primary w-100">Sign Up</button>
                        </div>
                        <p class="text-center mt-3">
                            Already have an account? <a href="#" id="loginLink" class="text-primary">Login</a>
                        </p>
                    </form>
                </div>
            </div>
        `;

    const signupForm = document.getElementById("signupForm");
    if (signupForm) {
        signupForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            apiSignup(name, email, password)
            .then((response) => {
                console.log("Signup successful:", response);
            })
        });
    }
}