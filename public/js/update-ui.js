const appdiv = document.getElementById('app');

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
