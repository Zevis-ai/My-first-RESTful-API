const appdiv = document.getElementById('app');
const main = document.querySelector("main");

export const updateUI = (_data) => {

    if (!_data || !_data.articles || !Array.isArray(_data.articles)) {
        console.error("Invalid data format:", _data);
        return;
    }


    const articles = _data.articles;


    articles.forEach((article) => {
        const articleDiv = document.createElement('div');
        articleDiv.className = 'col-lg-4 col-md-6 col-sm-12 mb-4';
        
        articleDiv.innerHTML = `
            <div class="card shadow-sm">
                <img src="${article.image}" class="card-img-top" alt="${article.title}">
                <div class="card-body">
                    <h5 class="card-title">${article.title}</h5>
                    <p class="card-text">${article.description}</p>
                    <p class="card-text"><strong>Content:</strong> ${article.content}</p>
                    <a href="#" class="btn btn-primary">Read more</a>
                </div>
            </div>
        `;

        appdiv.appendChild(articleDiv);
    });
};


export const loginAlertDiv = () => {
    
    const alertDiv = document.createElement("div");
    alertDiv.className = "alert alert-success position-fixed top-0 start-50 translate-middle-x mt-3 shadow";
    alertDiv.setAttribute("role", "alert");
    alertDiv.style.zIndex = "1050"
    alertDiv.innerHTML = "✅ Login successful! Welcome";
    main.innerHTML = ``
    main.appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

export const loginErrorAlertDiv = (message = "❌ Login failed! Please check your credentials.") => {
    const alertDiv = document.createElement("div");
    alertDiv.className = "alert alert-danger position-fixed top-0 start-50 translate-middle-x mt-3 shadow";
    alertDiv.setAttribute("role", "alert");
    alertDiv.style.zIndex = "1050";
    alertDiv.innerHTML = message;
    main.appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
};

