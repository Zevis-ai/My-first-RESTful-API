import { apiAddArticle, apiGetAllCategory} from "./api.js";

const appdiv = document.getElementById('app');
const main = document.querySelector("main");

export const updateUI = (_data) => {
    appdiv.innerHTML = ``
    if (!_data || !_data.articles || !Array.isArray(_data.articles)) {
        console.error("Invalid data format:", _data);
        return;
    }

    const articles = _data.articles;

    articles.forEach((article) => {
        
    const articleDiv = document.createElement('div');
    articleDiv.className = 'col-lg-4 col-md-6 col-sm-12 d-flex align-items-stretch mb-4';

    articleDiv.innerHTML = `
        <div class="card border-0 shadow-lg rounded-4 w-100 h-100" style="overflow: hidden;">
            <img src="${article.image}" class="card-img-top" alt="${article.title}" style="height: 300px; object-fit: cover;">
            <div class="card-body d-flex flex-column justify-content-between">
                <div>
                    <h5 class="card-title text-primary fw-bold">${article.title}</h5>
                    <p class="card-text text-muted">${article.description}</p>
                    <p class="card-text small"><strong>תוכן:</strong> ${article.content}</p>
                </div>
                <div class="text-center mt-3">
                    <a href="#" class="btn btn-outline-primary rounded-pill px-4 py-2 hover-grow"> ${article.categoryId.title }:קטגוריה</a>
                </div>
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
    main.innerHTML = ``
appdiv.innerHTML = `
        <div class="container mt-5 d-flex justify-content-center">
        <div class="card p-4 shadow-lg border-0 rounded-4" style="max-width: 600px; width: 100%; background: linear-gradient(135deg, #f9f9f9, #e3f2fd);">
        <h2 class="mb-4 text-center fw-bold text-primary">הוספת מאמר חדש</h2>
        <form id="articleForm" enctype="multipart/form-data">
            <div class="mb-3">
                <label for="title" class="form-label fw-semibold">כותרת</label>
                <input type="text" class="form-control rounded-pill shadow-sm" id="title" name="title" required />
            </div>
            <div class="mb-3">
                <label for="description" class="form-label fw-semibold">תיאור</label>
                <input type="text" class="form-control rounded-pill shadow-sm" id="description" name="description" required />
            </div>
            <div class="mb-3">
                <label for="content" class="form-label fw-semibold">תוכן</label>
                <textarea class="form-control rounded-3 shadow-sm" id="content" name="content" rows="4" required></textarea>
            </div>
            <div class="mb-3">
                <label for="categoryId" class="form-label fw-semibold">מזהה קטגוריה</label>
                <input type="text" class="form-control rounded-pill shadow-sm" id="categoryId" name="categoryId" required />
            </div>
            <div class="mb-3">
                <label for="image" class="form-label fw-semibold">תמונה</label>
                <input type="file" class="form-control rounded-pill shadow-sm" id="image" name="image" accept="image/*" required />
            </div>
            <button type="submit" class="btn btn-primary w-100 rounded-pill py-2 fs-5 shadow-sm hover-effect">📤 שלח מאמר</button>
        </form>
        <div id="formMessage" class="mt-4 text-center fw-semibold"></div>
    </div>
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

export const allCategory = async () => {
    const data = await apiGetAllCategory();
    
    const categories = data?.categories || [];


    main.innerHTML = `
        <div class="container mt-5">
            <h2 class="text-center mb-4">🌟 כל הקטגוריות 🌟</h2>
            <div class="row justify-content-center" id="categoryRow">
                ${categories.map(cat => `
                    <div class="col-md-4 mb-4">
                        <div class="card h-100 shadow-lg border-0 rounded-4">
                            <div class="card-body text-center">
                                <h5 class="card-title text-primary fw-bold">${cat.title}</h5>
                                <p class="card-text">${cat.description}</p>
                                <span class="badge bg-secondary">ID: ${cat._id}</span>
                            </div>
                            <div class="card-footer bg-light text-center">
                                <button class="btn btn-outline-primary w-100">📁 צפה בקטגוריה</button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
};
