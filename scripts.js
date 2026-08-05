import dados from "./dados.js";

const list = document.querySelector(".list");
const dotsContainer = document.querySelector(".dots");
const numberIndicator = document.querySelector(".numbers");

const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

let active = 0;

dados.produtos.forEach((produto, index) => {
    const item = document.createElement("div");
    item.className = `item ${index === 0 ? "active" : ""}`;
    item.innerHTML = `
        <div class="product-img">
            <img src="${produto.imagem}" alt="${produto.nome}">
        </div>
        <div class="content">
            <p class="product-tag">${produto.tag}</p>
            <h2 class="product-name">
                ${produto.nome}
            </h2>
            <p class="description">
                ${produto.descricao}
            </p>
            <button class="btn" data-link="${produto.link}">
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

    numberIndicator.textContent =
        String(active + 1).padStart(2, "0");

}

// Auto Play
setInterval(() => {
    updateCarousel(1);
}, 5000);

// Botão Saiba Mais
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn")) {
        const link = e.target.dataset.link;
        window.location.href = link;
    }
});