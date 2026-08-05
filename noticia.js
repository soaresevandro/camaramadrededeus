import dados from "./dados.js";

const parametros = new URLSearchParams(window.location.search);
const id = Number(parametros.get("id"));

const noticia = dados.noticias.find(p => p.id === id);

if (!noticia) {
    document.body.innerHTML = "<h1>Notícia não encontrada.</h1>";
    throw new Error("Notícia não encontrada.");
}

document.getElementById("imagem").src = noticia.imagem;
document.getElementById("tag").textContent = noticia.tag;
document.getElementById("nome").textContent = noticia.nome;
document.getElementById("descricao").textContent = noticia.descricao;
document.getElementById("detalhamento").textContent = noticia.detalhamento;