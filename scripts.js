import dados from "./dados.js";

const list = document.querySelector(".list");
const dotsContainer = document.querySelector(".dots");
const numberIndicator = document.querySelector(".numbers");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

let active = 0;

dados.noticias.forEach((noticias, index) => {
    const item = document.createElement("div");
    item.className = `item ${index === 0 ? "active" : ""}`;
    item.innerHTML = `
        <div class="notice-img">
            <img src="${noticias.imagem}" alt="${noticias.nome}">
        </div>
        <div class="content">
            <p class="notice-tag">${noticias.tag}</p>
            <h2 class="notice-name">
                ${noticias.nome}
            </h2>
            <p class="description">
                ${noticias.descricao}
            </p>
            <button class="btn" data-id="${noticias.id}">
                Saiba mais
            </button>
        </div>
    `;
    list.appendChild(item);
    const dot = document.createElement("div");
    dot.className = `dot ${index === 0 ? "active" : ""}`;
    dotsContainer.appendChild(dot);
});

const items = document.querySelectorAll(".item");
const dots = document.querySelectorAll(".dot");
const total = items.length;
numberIndicator.textContent = "01";

prevButton.addEventListener("click", () => {
    updateCarousel(-1);
});

nextButton.addEventListener("click", () => {
    updateCarousel(1);
});

document.addEventListener("click", (e) => {
    if (e.target.matches(".btn")) {
        const id = e.target.dataset.id;
        window.location.href = `noticia.html?id=${id}`;
    }
});

function updateCarousel(direction) {
    items[active].classList.remove("active");
    dots[active].classList.remove("active");
    active += direction;

    if (active >= total)
        active = 0;

    if (active < 0)
        active = total - 1;

    items[active].classList.add("active");
    dots[active].classList.add("active");

    numberIndicator.textContent = String(active + 1).padStart(2, "0");
}

// Auto Play
setInterval(() => {
    updateCarousel(1);
}, 5000);