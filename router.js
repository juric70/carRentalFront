import {createRouter, createWebHistory} from "vue-router";


import RentalIndex from "./src/Rent/index.vue";
import Edit from "./src/Rent/edit.vue";
import EditWStatus from "./src/Rent/editWStatus.vue";
import create from "./src/Rent/create.vue";
import show from "./src/Rent/show.vue";
import Home from "./src/Home.vue";
import login from "./src/Login.vue";
import Logout from "./src/Logout.vue";
import Register from "./src/Register.vue";
import CarsIndex from "./src/Cars/index.vue";
import CreateCar from "./src/Cars/create.vue";
import EditCar from "./src/Cars/edit.vue";
import showCar from "./src/Cars/show.vue";
import createAdmin from "./src/Rent/createAdmin.vue";
import banksIndex from "./src/Banks/index.vue";
import CreateBank from "./src/Banks/create.vue";
import EditBank from "./src/Banks/edit.vue";
import Users from "./src/Users/index.vue";
import EditRole from "./src/Users/editRole.vue";
import EditProfile from "./src/Users/editProfile.vue";


const routes = [
    {path: "/", component: Home, name: "Home"},
    {path: "/rental", component: RentalIndex, name: "RentalIndex"},
    {path: "/rental/edit/:id", component: Edit, name: "Edit"},
    {path: "/rental/edit/admin/:id", component: EditWStatus, name: "EditWStatus"},
    {path: "/rental/create/admin", component: createAdmin, name: "createAdmin"},
    {path: "/rental/:id", component: show, name: "Show"},
    {path: "/rental/create", component: create, name: "create"},
    {path: "/login", component: login, name: "login"},
    {path: "/logout", component: Logout, name: "logout"},
    {path: "/register", component: Register, name: "register"},
    {path: "/cars", component: CarsIndex, name: "CarsIndex"},
    {path: "/cars/create", component: CreateCar, name: "CreateCar"},
    {path: "/cars/edit/:id", component: EditCar, name: "EditCar"},
    {path: "/cars/:id", component: showCar, name: "ShowCar"},
    {path: "/banks", component: banksIndex, name: "banksIndex"},
    {path: "/banks/create", component: CreateBank, name: "CreateBank"},
    {path: "/banks/edit/:id", component: EditBank, name: "EditBank"},
    {path: "/users", component: Users, name: "Users"},
    {path: "/users/editRole/:id", component: EditRole, name: "EditRole"},
    {path: "/users/editProfile/:id", component: EditProfile, name: "EditProfile"},

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

