import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'
import UserLogin from "../views/UserLogin.vue";
import UserDashboard from "../views/Dashboard.vue";
import NavBarComponent  from "../layouts/NavBar.vue";
import Reportes from '../views/Reportes.vue';
import Lineal from '../views/Lineal.vue';
import ConsolidadoTurno from "../views/ConsolidadoTurno.vue";

export const  router = createRouter({
  history: createMemoryHistory(import.meta.env.BASE_URL),
   routes : [
    {
      path: "/login",
      name: "Login",
      component: UserLogin,
    },
    {
      path: "/",
      name: "Navbar",
      component: NavBarComponent ,
      children: [
        {
          path: "/",
          name: "Dashboard",
          component: UserDashboard,
        },
        {
          path: "/reporte",
          name: "Reportes",
          component: Reportes,
        },
        {
          path: "/lineal",
          name: "Lineal",
          component: Lineal,
        },
        {
          path: "/consolidadoTurno",
          name: "ConsolidadoTurno",
          component: ConsolidadoTurno,
        },
      ],
    },
  
  ],
});

export default router;