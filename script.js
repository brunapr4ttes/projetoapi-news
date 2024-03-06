const container = document.querySelector(".container");
const optionsContainer = document.querySelector(".options-container");

const country = "us";
const apiKey = '91a31ae619a546cc853c3ff50e219e14';

const options = ["general", "entertainment", "health", "science", "sports", "technology"];

let apiURL;

const generateUI = (articles) => {
  for (const noticia of articles) {
    if(noticia.urlToImage === null) continue;

    const card = document.createElement("div");
    card.classList.add("news-card");
    card.innerHTML = `
        <div class="news-image-container">
            <img src="${noticia.urlToImage || "./newspaper.jpg"}" alt="" />
        </div>
        <div class="news-content">
            <div class="news-title">
                ${noticia.title}
            </div>
            <div class="news-description">
                ${noticia.description || noticia.content || ""}
            </div>
            <a href="${noticia.url}" target="_blank" class="view-button">READ MORE</a>
        </div>
    `;
    container.appendChild(card);
  }
};

const getNews = async () => {
  container.innerHTML = "";
  const response = await fetch(apiURL);
  if (!response.ok) {
    throw new Error(`Erro de rede! Código: ${response.status}`);
  }
  const data = await response.json();
  generateUI(data.articles);
  console.log(data)
};


const selectCategory = (e, category) => {
  const options = document.querySelectorAll(".option");
  options.forEach((element) => {
    element.classList.remove("active");
  });
  apiURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
  e.target.classList.add("active");
  getNews();
};

const createOptions = () => {
  for (const i of options) {
    let activeClass = "";
    if (i == "general") {
      activeClass = "active";
    }
    optionsContainer.innerHTML += `
    <button class="option ${activeClass}" onclick="selectCategory(event,'${i}')">
            ${i}
        </button>
    `;
  }
};


const init = () => {
  optionsContainer.innerHTML = "";
  getNews();
  createOptions();
};

window.onload = () => {
  apiURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=general&apiKey=${apiKey}`;
  init();
};