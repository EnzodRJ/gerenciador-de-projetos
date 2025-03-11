document.addEventListener("DOMContentLoaded", () => {
    carregarComponentes();
    verificarAutenticacao();
});

/**
 * Carrega os componentes do layout (Sidebar e Header)
 */
function carregarComponentes(): void {
    carregarComponente("../components/sidebar.html", "sidebar-container");
    carregarComponente("../components/header.html", "header-container");
}

/**
 * Função genérica para carregar um componente HTML
 * @param url - Caminho do arquivo HTML do componente
 * @param containerId - ID do elemento onde o componente será inserido
 */
function carregarComponente(url: string, containerId: string): void {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = data;
            }
        })
        .catch(error => console.error(`Erro ao carregar ${containerId}:`, error));
}

/**
 * Verifica se o usuário está autenticado, caso contrário, redireciona para login
 */
function verificarAutenticacao(): void {
    const token: string | null = localStorage.getItem("token");

    if (!token) {
        window.location.href = "/login.html";
    }
}

/**
 * Realiza o logout do usuário, removendo o token do localStorage e redirecionando para login
 */
function logout(): void {
    localStorage.removeItem("token");
    window.location.href = "/login.html";
}

// Exportando a função logout para ser utilizada em outros scripts se necessário
export { logout };
