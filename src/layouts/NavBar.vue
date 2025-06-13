<template>
  <div class="w-full h-screen  flex relative bg-black">
    <div v-if="showSide && isMobile" class="fixed inset-0  bg-opacity-50 z-10" @click="toggleSideBar"></div>
    <div class="w-[250px] h-full bg-gray-200 text-white
        transition-transform transform md:relative fixed md:static top-0 left-0 z-20" :class="{
          '-translate-x-full': !showSide && isMobile,
          'translate-x-0': showSide || !isMobile
        }">
      <div class="h-[60px] w-full bg-[#000000] flex justify-center items-center relative">
        <div class="px-[10px] mb-2 mt-2 flex justify-center items-center">
          <img src="../assets/LOGO-PAG-BLANCO.png" alt="" class="h-auto w-[90%]">
        </div>
        <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[80%] h-[0.2px] bg-[#fff]"></div>
      </div>
      <div class="h-[calc(100vh-60px)] bg-[#000000] py-[20px] overflow-hidden">
        <div class="flex flex-col justify-start h-full px-[20px] space-y-[10px]">
          <div class=" flex flex-col justify-between space-y-[10px] ">
            <template v-for="route in accessibleRoutes" :key="route.name">
              <router-link v-if="route" :to="route.path" exact-active-class="bg-[#00a600] text-white"
                active-class="bg-[#00a600] text-white"
                class="gap-2 inline-flex relative items-center  py-[8px] px-[8px] w-full text-xs uppercase font-semibold rounded-md border-gray-200 hover:bg-[#24be24] hover:text-white  transition duration-400 ease-in-out">
                <i class="fas fa-tachometer-alt"></i>{{ route.name }}
              </router-link>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full h-screen bg-gray-400">
      <div
        class="h-[60px] bg-[#ffffff] flex items-center shadow-sm px-[20px] w-full z-10 border-l-[#fff] border-l-2 justify-center">
        <!-- Hambuger menu -->
        <div class="cursor-pointer w-[5%] md:hidden" @click="toggleSideBar">
          <i class="fas fa-bars text-black"></i>
        </div>
        <div class="w-[calc(100%-30px)] flex ">
          <div class="relative w-full">
            <div class="flex items-center space-x-4 justify-end">
              <div
                class="hidden sm:flex font-semibold dark:text-white text-left w-[35%] items-center space-x-2  relative pr-4 border-r-2 border-[#00a600]">
                <i class="fas fa-building text-[#00a600]"></i>
                <div>
                  <div class="text-xs text-black font-bold uppercase">RUC: {{ ruc }}</div>
                  <div class="text-xs text-black font-bold uppercase">EMPRESA: {{ empresa }}</div>
                </div>
              </div>
              <div
                class="hidden sm:flex font-semibold dark:text-white text-left w-[35%] items-center space-x-2  relative pr-4 border-r-2 border-[#00a600]">
                <i class="fas fa-map-marker-alt text-[#00a600]"></i>
                <div>
                  <div class="text-xs text-black font-bold uppercase">DIRECCIÓN: {{ direccion }}</div>
                </div>
              </div>
              <div
                class="flex justify-end items-center gap-2 font-semibold dark:text-white text-right sm:w-[25%] w-full"
                @click="toggleDrop">
                <div>
                  <div class="text-xs text-black font-bold uppercase">{{ nombreUsuario }}</div>
                </div>
                <i class="fas fa-ellipsis-v text-[#00a600]"></i>
              </div>
            </div>
            <div v-show="showDropDown"
              class="absolute right-[10px] z-10 mt-2 w-[150px] origin-top-right rounded-lg bg-white shadow-lg focus:outline-none border border-[#000]">
              <div class="py-1">
                <button @click="cerrarSesion"
                  class="w-full text-black block px-4 py-2 text-xs uppercase font-semibold hover:bg-[#212529] hover:text-white">
                  Cerrar Sesión</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="h-[calc(100vh-60px)] p-[20px] overflow-auto bg-cover bg-center bg-no-repeat"
        style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(https://powergroupsystem.com/cliente/img/background/grifo.jpg);">
        <router-view></router-view>
      </div>
    </div>
    <!-- Main  -->
  </div>
</template>

<script>
import api from "../services/api";

export default {
  name: "NavBarComponent",
  data() {
    return {
      showDropDown: false,
      showSide: false,
      isMobile: window.innerWidth < 768,
      nombreUsuario: "",
      rolUsuario: "",
      ruc: "",
      empresa: "",
      direccion: "",
      accessibleRoutes: [],
    }
  },
  methods: {
    cerrarSesion() {
      this.showDropDown = false;
      localStorage.clear();
      this.$router.replace("/login");
    },
    toggleSideBar() {
      if (window.innerWidth < 768) {
        this.showSide = !this.showSide;
      }
    },
    updateScreenSize() {
      this.isMobile = window.innerWidth < 768;
      if (!this.isMobile) {
        this.showSide = true;
      } else {
        this.showSide = false;
      }
    },
    toggleDrop() {
      this.showDropDown = !this.showDropDown
    },
    async obtenerDatosUsuario() {
      this.nombreUsuario = localStorage.getItem("username") || "Usuario";
      this.setAccessibleRoutes();
    },
    async obtenerDatosEmpresa() {

      try {
        const response = await api.get(`/company/listado`);
        const data = response.data;

        if (response.status === 200 && Array.isArray(data) && data.length > 0) {
          const company = data[0];
          this.ruc = company.ruc || "N/A";
          this.empresa = company.names || "Empresa";
          this.direccion = company.address || "Dirección no disponible";
        } else {
          console.error('Error en la respuesta del servidor:', response);
        }

      } catch (error) {
        console.error("Error al obtener datos :", error);
      }
    },

    setAccessibleRoutes() {
      this.accessibleRoutes = [
        { path: "/", name: "Reporte Estadisticos"},
        { path: "/reporte", name: "Reporte en Tablas"},
         { path: "/lineal", name: "Reporte Lineal"},
        // Agrega más rutas según sea necesario
      ];
    }


  },
  mounted() {
    this.obtenerDatosUsuario();
    this.obtenerDatosEmpresa();

    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      this.$router.push("/login");
    } else {
      this.$router.replace("/");
    }

    this.updateScreenSize();
    window.addEventListener("resize", this.updateScreenSize);
  },
};
</script>