// Definição da interface para os dados do dashboard
interface DashboardData {
    projects: number;
    tasksPending: number;
    tasksCompleted: number;
}

document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:3000/api/dashboard")
        .then(response => response.json())
        .then((data: DashboardData) => {
            updateDashboardUI(data);
        })
        .catch(error => console.error("Erro ao carregar dashboard:", error));
});

// Atualiza os valores da UI diretamente no HTML
function updateDashboardUI(data: DashboardData): void {
    const projectsCount = document.getElementById("projects-count");
    const tasksPending = document.getElementById("tasks-pending");
    const tasksCompleted = document.getElementById("tasks-completed");

    if (projectsCount) projectsCount.textContent = data.projects.toString();
    if (tasksPending) tasksPending.textContent = data.tasksPending.toString();
    if (tasksCompleted) tasksCompleted.textContent = data.tasksCompleted.toString();
}
