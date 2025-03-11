document.addEventListener("DOMContentLoaded", async () => {
    // Definição da estrutura das colunas no quadro kanban
    const columns: Record<string, HTMLElement | null> = {
        todo: document.querySelector("#todo .task-list"),
        "in-progress": document.querySelector("#in-progress .task-list"),
        done: document.querySelector("#done .task-list"),
    };

    // Função para carregar tarefas da API
    async function loadTasks(): Promise<void> {
        try {
            const response: Response = await fetch("http://localhost:5000/api/tasks");

            if (!response.ok) {
                throw new Error("Erro ao buscar tarefas");
            }

            const tasks: { name: string; status: string }[] = await response.json();

            // Limpar colunas antes de renderizar as tarefas
            Object.values(columns).forEach((col) => {
                if (col) col.innerHTML = "";
            });

            // Adicionar cada tarefa à coluna correspondente
            tasks.forEach((task) => {
                const div: HTMLDivElement = document.createElement("div");
                div.classList.add("task-item");
                div.textContent = task.name;

                const column = columns[task.status];

                if (column) {
                    column.appendChild(div);
                } else {
                    console.warn(`Status desconhecido: ${task.status}`);
                }
            });
        } catch (error) {
            console.error("Erro ao carregar tarefas:", error);
        }
    }

    // Chamada da função para carregar as tarefas ao iniciar
    await loadTasks();
});

