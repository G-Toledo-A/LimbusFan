//popstate listener detecta quando o usuário usa o botão "Voltar" e carrega o conteúdo correto.
window.addEventListener("popstate", function(event) {
    if (event.state && event.state.page) {
        loadPage(event.state.page, false); // Carrega a página sem adicionar novo estado ao histórico
    }
});

function loadPage(page, addHistory = true) {
    fetch(page + ".html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("content").innerHTML = data;

            // Remove o active de todos os botões
            document.querySelectorAll(".grupo-nav-2 .nav-link")
                .forEach(link => {
                    link.classList.remove("active");
                    link.removeAttribute("aria-current");
                });

            // Procura o botão correspondente à página
            const activeLink = document.querySelector(
                `.grupo-nav-2 .nav-link[data-page="${page}"]`
            );

            // Coloca o active nele
            if (activeLink) {
                activeLink.classList.add("active");
                activeLink.setAttribute("aria-current", "page");
            }
            
            if (addHistory) {
                history.pushState({ page: page }, "", "#" + page);
            }
        })
        .catch(error => console.error("Erro ao carregar a página:", error));
}

// Define um estado inicial no carregamento da página
document.addEventListener("DOMContentLoaded", function () {
    const initialPage = location.hash ? location.hash.substring(1) : "../home";
    loadPage(initialPage, false);
});