document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:3000/api/dashboard")
        .then(function (response) { return response.json(); })
        .then(function (data) {
        updateDashboardUI(data);
    })
        .catch(function (error) { return console.error("Erro ao carregar dashboard:", error); });
});
// Atualiza os valores da UI diretamente no HTML
function updateDashboardUI(data) {
    var projectsCount = document.getElementById("projects-count");
    var tasksPending = document.getElementById("tasks-pending");
    var tasksCompleted = document.getElementById("tasks-completed");
    if (projectsCount)
        projectsCount.textContent = data.projects.toString();
    if (tasksPending)
        tasksPending.textContent = data.tasksPending.toString();
    if (tasksCompleted)
        tasksCompleted.textContent = data.tasksCompleted.toString();
}
