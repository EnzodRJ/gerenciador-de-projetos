import "es6-promise/auto";
async function generateReport(): Promise<void> {
    try {
        const response: Response = await fetch("http://localhost:5000/api/reports");
        
        if (!response.ok) {
            throw new Error("Erro ao buscar relatório");
        }

        const reportData: unknown = await response.json();
        
        const output = document.querySelector("#report-output") as HTMLElement | null;

        if (output) {
            output.innerHTML = `<pre>${JSON.stringify(reportData, null, 2)}</pre>`;
        } else {
            console.error("Elemento #report-output não encontrado.");
        }
    } catch (error) {
        console.error("Erro ao gerar relatório:", error);
    }
}
