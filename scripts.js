
const API_URL = "https://yellow-flamingo-602325.hostingersite.com";

const list = document.querySelector(".list");
const dotsContainer = document.querySelector(".dots");
const numberIndicator = document.querySelector(".numbers");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

let active = 0;
let items = [];
let dots = [];

// =====================================================
// CARREGAR NOTÍCIAS DA API
// =====================================================

async function carregarNoticias() {
    try {
        const response = await fetch(`${API_URL}/api/noticias`);

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const dados = await response.json();

        // Filtra apenas as notícias com tipo "N"
        const noticiasN = dados.noticias.filter((noticia) => noticia.tipo === "N")

        criarNoticias(noticiasN);

    } catch (error) {
        console.error("Erro ao carregar notícias:", error);

        list.innerHTML = `
            <div class="erro">
                Não foi possível carregar as notícias.
            </div>
        `;
    }
}

// =====================================================
// CRIAR NOTÍCIAS NA PÁGINA
// =====================================================

function criarNoticias(noticias) {

    list.innerHTML = "";
    dotsContainer.innerHTML = "";

    noticias.forEach((noticia, index) => {

        const item = document.createElement("div");

        item.className = `item ${index === 0 ? "active" : ""}`;

        // =================================================
        // URL DA IMAGEM
        // =================================================

        let imagemUrl = "";

        if (noticia.imagem) {

            // Se a API já retornar uma URL completa
            if (
                noticia.imagem.startsWith("http://") ||
                noticia.imagem.startsWith("https://")
            ) {
                imagemUrl = noticia.imagem;
            }
            // Se for apenas o nome do arquivo
            else {
                imagemUrl = `${API_URL}/uploads/${noticia.imagem}`;
            }
        }

        item.innerHTML = `
            <div class="notice-img">
                <img 
                    src="${imagemUrl}" 
                    alt="${noticia.titulo || "Notícia"}"
                    onerror="this.src='img/sem-imagem.png'"
                >
            </div>

            <div class="content">

                <p class="notice-tag">
                    ${noticia.titulo || ""}
                </p>

                <h2 class="notice-name">
                    ${noticia.resumo || ""}
                </h2>

                <p class="description">
                    ${noticia.conteudo || ""}
                </p>

                <button 
                    class="btn" 
                    data-id="${noticia.id}"
                >
                    Saiba mais
                </button>

            </div>
        `;

        list.appendChild(item);

        // =================================================
        // DOT
        // =================================================

        const dot = document.createElement("div");

        dot.className = `dot ${index === 0 ? "active" : ""}`;

        dotsContainer.appendChild(dot);
    });

    // Atualiza referências
    items = document.querySelectorAll(".item");
    dots = document.querySelectorAll(".dot");

    active = 0;

    if (items.length > 0) {
        numberIndicator.textContent = "01";
    } else {
        numberIndicator.textContent = "00";
    }
}

// =====================================================
// BOTÃO ANTERIOR
// =====================================================

prevButton.addEventListener("click", () => {

    if (items.length === 0) return;

    updateCarousel(-1);
});

// =====================================================
// BOTÃO PRÓXIMO
// =====================================================

nextButton.addEventListener("click", () => {

    if (items.length === 0) return;

    updateCarousel(1);
});

// =====================================================
// BOTÃO SAIBA MAIS
// =====================================================

document.addEventListener("click", (e) => {

    if (e.target.matches(".btn")) {

        const id = e.target.dataset.id;

        window.location.href = `noticia.html?id=${id}`;
    }
});

// =====================================================
// CARROSSEL
// =====================================================

function updateCarousel(direction) {

    if (items.length === 0) return;

    items[active].classList.remove("active");
    dots[active].classList.remove("active");

    active += direction;

    if (active >= items.length) {
        active = 0;
    }

    if (active < 0) {
        active = items.length - 1;
    }

    items[active].classList.add("active");
    dots[active].classList.add("active");

    numberIndicator.textContent =
        String(active + 1).padStart(2, "0");
}

// =====================================================
// AUTO PLAY
// =====================================================

setInterval(() => {

    if (items.length > 0) {
        updateCarousel(1);
    }

}, 5000);

// =====================================================
// INICIAR
// =====================================================

carregarNoticias();