import { createRouter, createWebHistory } from "vue-router";
import RentalIndex from "./src/Rent/index.vue";
import Edit from "./src/Rent/edit.vue";
import create from "./src/Rent/create.vue";

const routes = [
    { path: "/rental", component: RentalIndex, name: "RentalIndex" },
    {path: "/rental/edit/:id", component: Edit, name: "Edit"},
    {path: "/rental/create", component: create, name: "create"}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;