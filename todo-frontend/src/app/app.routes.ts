import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        loadComponent: () => {
            return import("./todos/todos.component").then(m => m.TodosComponent);
        }
    },
    {
        path: "logout",
        loadComponent: () => {
            return import("./logout/logout.component").then(m => m.LogoutComponent);
        }
    }
];
