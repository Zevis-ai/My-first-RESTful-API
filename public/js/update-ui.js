const appdiv = document.getElementById('app');

export const updateUI = (_data) => {

    if (!_data || !_data.articles || !Array.isArray(_data.articles)) {
        console.error("לא נמצאו מאמרים או שהנתונים לא בפורמט נכון");
        return;
    }


    const articles = _data.articles;


    articles.forEach((article) => {
        const articleDiv = document.createElement('div');
        articleDiv.className = 'article';

      
        articleDiv.innerHTML = `
            <h2 class="article-title">${article.title}</h2>
            <p class="article-description">${article.description}</p>
            <p class="article-content">${article.content}</p>
            <img class="article-image" src="${article.image}" alt="${article.title}">
        `;

        appdiv.appendChild(articleDiv);
    });
};
