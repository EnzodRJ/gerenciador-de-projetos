"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("es6-promise/auto");
document.addEventListener("DOMContentLoaded", function () {
    var projectList = document.getElementById("project-list");
    var projectForm = document.getElementById("project-form");
    var projectNameInput = document.getElementById("project-name");
    if (!projectList || !projectForm || !projectNameInput) {
        console.error("Elementos HTML não encontrados.");
        return;
    }
    /**
     * Carrega projetos da API
     */
    function fetchProjects() {
        return __awaiter(this, void 0, void 0, function () {
            var response, projects, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch("http://localhost:3000/api/projects")];
                    case 1:
                        response = _a.sent();
                        if (!response.ok)
                            throw new Error("Erro ao buscar projetos");
                        return [4 /*yield*/, response.json()];
                    case 2:
                        projects = _a.sent();
                        renderProjects(projects);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error("Erro ao buscar projetos:", error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    /**
     * Renderiza os projetos na tela
     * @param projects - Lista de projetos
     */
    function renderProjects(projects) {
        projectList.innerHTML = "";
        projects.forEach(function (project) {
            var li = document.createElement("li");
            li.innerHTML = "\n                <span>".concat(project.name, "</span>\n                <button class=\"delete-btn\" data-id=\"").concat(project.id, "\">\uD83D\uDDD1\uFE0F</button>\n            ");
            projectList.appendChild(li);
        });
        // Adiciona eventos aos botões de deletar
        document.querySelectorAll(".delete-btn").forEach(function (button) {
            button.addEventListener("click", deleteProject);
        });
    }
    /**
     * Adiciona um novo projeto
     * @param event - Evento de submissão do formulário
     */
    projectForm.addEventListener("submit", function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var projectName, response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    projectName = projectNameInput.value.trim();
                    if (!projectName) {
                        alert("Nome do projeto é obrigatório!");
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetch("http://localhost:3000/api/projects", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ name: projectName })
                        })];
                case 2:
                    response = _a.sent();
                    if (response.ok) {
                        fetchProjects();
                        projectForm.reset();
                    }
                    else {
                        console.error("Erro ao criar projeto");
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error("Erro ao enviar requisição:", error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    /**
     * Deleta um projeto
     * @param event - Evento de clique no botão de deletar
     */
    function deleteProject(event) {
        return __awaiter(this, void 0, void 0, function () {
            var button, projectId, response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        button = event.target;
                        projectId = button.dataset.id;
                        if (!projectId)
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fetch("http://localhost:3000/api/projects/".concat(projectId), {
                                method: "DELETE"
                            })];
                    case 2:
                        response = _a.sent();
                        if (response.ok) {
                            fetchProjects();
                        }
                        else {
                            console.error("Erro ao deletar projeto");
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        console.error("Erro na requisição:", error_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    // Carrega os projetos ao iniciar
    fetchProjects();
});
