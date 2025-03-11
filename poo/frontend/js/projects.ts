import "es6-promise/auto";
document.addEventListener("DOMContentLoaded", () => {
    const projectList = document.getElementById("project-list") as HTMLUListElement;
    const projectForm = document.getElementById("project-form") as HTMLFormElement;
    const projectNameInput = document.getElementById("project-name") as HTMLInputElement;

    if (!projectList || !projectForm || !projectNameInput) {
        console.error("Elementos HTML não encontrados.");
        return;
    }

    /**
     * Carrega projetos da API
     */
    async function fetchProjects(): Promise<void> {
        try {
            const response = await fetch("http://localhost:3000/api/projects");
            if (!response.ok) throw new Error("Erro ao buscar projetos");
            
            const projects: { id: number; name: string }[] = await response.json();
            renderProjects(projects);
        } catch (error) {
            console.error("Erro ao buscar projetos:", error);
        }
    }

    /**
     * Renderiza os projetos na tela
     * @param projects - Lista de projetos
     */
    function renderProjects(projects: { id: number; name: string }[]): void {
        projectList.innerHTML = "";
        projects.forEach((project) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${project.name}</span>
                <button class="delete-btn" data-id="${project.id}">🗑️</button>
            `;
            projectList.appendChild(li);
        });

        // Adiciona eventos aos botões de deletar
        document.querySelectorAll(".delete-btn").forEach((button) => {
            (button as HTMLButtonElement).addEventListener("click", deleteProject);
        });
    }

    /**
     * Adiciona um novo projeto
     * @param event - Evento de submissão do formulário
     */
    projectForm.addEventListener("submit", async (event: SubmitEvent) => {
        event.preventDefault();
        const projectName: string = projectNameInput.value.trim();
        
        if (!projectName) {
            alert("Nome do projeto é obrigatório!");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: projectName })
            });

            if (response.ok) {
                fetchProjects();
                projectForm.reset();
            } else {
                console.error("Erro ao criar projeto");
            }
        } catch (error) {
            console.error("Erro ao enviar requisição:", error);
        }
    });

    /**
     * Deleta um projeto
     * @param event - Evento de clique no botão de deletar
     */
    async function deleteProject(event: Event): Promise<void> {
        const button = event.target as HTMLButtonElement;
        const projectId = button.dataset.id;

        if (!projectId) return;

        try {
            const response = await fetch(`http://localhost:3000/api/projects/${projectId}`, {
                method: "DELETE"
            });

            if (response.ok) {
                fetchProjects();
            } else {
                console.error("Erro ao deletar projeto");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    }

    // Carrega os projetos ao iniciar
    fetchProjects();
});
