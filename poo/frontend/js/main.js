"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = logout;
document.addEventListener("DOMContentLoaded", function () {
    carregarComponentes();
    verificarAutenticacao();
});
/**
 * Carrega os componentes do layout (Sidebar e Header)
 */
function carregarComponentes() {
    carregarComponente("../components/sidebar.html", "sidebar-container");
    carregarComponente("../components/header.html", "header-container");
}
/**
 * Função genérica para carregar um componente HTML
 * @param url - Caminho do arquivo HTML do componente
 * @param containerId - ID do elemento onde o componente será inserido
 */
function carregarComponente(url, containerId) {
    fetch(url)
        .then(function (response) { return response.text(); })
        .then(function (data) {
        var container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = data;
        }
    })
        .catch(function (error) { return console.error("Erro ao carregar ".concat(containerId, ":"), error); });
}
/**
 * Verifica se o usuário está autenticado, caso contrário, redireciona para login
 */
function verificarAutenticacao() {
    var token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "/login.html";
    }
}
/**
 * Realiza o logout do usuário, removendo o token do localStorage e redirecionando para login
 */
function logout() {
    localStorage.removeItem("token");
    window.location.href = "/login.html";
}
