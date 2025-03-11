document.addEventListener("DOMContentLoaded", function (): void {
    carregarPagina(window.location.pathname);
    configurarLinksDeNavegacao();
});

function carregarPagina(caminho: string): void {
    let pagina: string;

    switch (caminho) {
        case "/":
        case "/dashboard.html":
            pagina = "pages/dashboard.html";
            break;
        case "/projects.html":
            pagina = "pages/projects.html";
            break;
        case "/tasks.html":
            pagina = "pages/tasks.html";
            break;
        case "/teams.html":
            pagina = "pages/teams.html";
            break;
        case "/reports.html":
            pagina = "pages/reports.html";
            break;
        default:
            pagina = "pages/dashboard.html"; // Página padrão
            break;
    }

    fetch(pagina)
        .then((response: Response) => response.text())
        .then((data: string) => {
            const conteudoPrincipal = document.getElementById("conteudo-principal");
            if (conteudoPrincipal) {
                conteudoPrincipal.innerHTML = data;
            }
        })
        .catch((error: Error) => console.error("Erro ao carregar página:", error));
}

function configurarLinksDeNavegacao(): void {
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", function (event: Event) {
            event.preventDefault();
            const target = event.currentTarget as HTMLAnchorElement;
            if (!target) return;
            
            const url = new URL(target.href, window.location.origin);
            carregarPagina(url.pathname);
            window.history.pushState({}, "", url.pathname);
        });
    });

    window.addEventListener("popstate", function () {
        carregarPagina(window.location.pathname);
    });
}
