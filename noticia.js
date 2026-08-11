const API_URL = "https://yellow-flamingo-602325.hostingersite.com";

const parametros = new URLSearchParams(window.location.search);
const id = Number(parametros.get("id"));

async function carregarNoticia() {
    try {
        const response = await fetch(`${API_URL}/api/noticias`);
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const dados = await response.json();

        // Filtra apenas a notícia com o id informado
        const noticia = dados.noticias.find(
            (p) => p.id === id && p.tipo === "N" && p.publicar
        );

        if (!noticia) {
            document.body.innerHTML = "<h1>Notícia não encontrada.</h1>";
            return;
        }

        // Monta a URL da imagem
        let imagemUrl = "";
        if (noticia.imagem) {
            if (
                noticia.imagem.startsWith("http://") ||
                noticia.imagem.startsWith("https://")
            ) {
                imagemUrl = noticia.imagem;
            } else {
                imagemUrl = `${API_URL}/uploads/${noticia.imagem}`;
            }
        }

        // Preenche os elementos da página
        document.getElementById("imagem").src = imagemUrl;
        document.getElementById("titulo").textContent = noticia.titulo;
        document.getElementById("resumo").textContent = noticia.resumo;
        document.getElementById("conteudo").textContent = noticia.conteudo;
        document.getElementById("detalhamento").textContent = noticia.detalhamento;

    } catch (error) {
        console.error("Erro ao carregar notícia:", error);
        document.body.innerHTML = "<h1>Erro ao carregar notícia.</h1>";
    }
}

carregarNoticia();
