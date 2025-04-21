import { apiAddArticle} from "./api.js";

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

export const updateUIAdd = () => {
main.innerHTML = `
        <div class="container mt-5">
            <h2 class="mb-4 text-center">הוספת מאמר חדש</h2>
            <form id="articleForm" enctype="multipart/form-data">
                <div class="mb-3">
                    <label for="title" class="form-label">כותרת</label>
                    <input type="text" class="form-control" id="title" name="title" required />
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">תיאור</label>
                    <input type="text" class="form-control" id="description" name="description" required />
                </div>
                <div class="mb-3">
                    <label for="content" class="form-label">תוכן</label>
                    <textarea class="form-control" id="content" name="content" rows="5" required></textarea>
                </div>
                <div class="mb-3">
                    <label for="categoryId" class="form-label">מזהה קטגוריה</label>
                    <input type="text" class="form-control" id="categoryId" name="categoryId" required />
                </div>
                <div class="mb-3">
                    <label for="image" class="form-label">תמונה</label>
                    <input type="file" class="form-control" id="image" name="image" accept="image/*" required />
                </div>
                <button type="submit" class="btn btn-primary w-100">שלח</button>
            </form>
            <div id="formMessage" class="mt-3 text-center"></div>
        </div>
`
const form = document.getElementById('articleForm');
const message = document.getElementById('formMessage');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
        apiAddArticle(form, formData, message)
    });
};
