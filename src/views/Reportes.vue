<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-10 md:grid-rows-3 tablet:grid-rows-custom gap-2">
    <!--TABLA: Top 10 de Clientes -->
    <div
      class="bg-white p-2 rounded-lg sm:col-span-5 sm:row-span-3 sm:col-start-1 sm:row-start-1 border-[#4e4e4e] border-t-4">
      <div class="flex justify-between items-center relative">
        <button class="text-gray-600 hover:text-black focus:outline-none"></button>
        <div>
          <h3 class="text-center font-bold text-black uppercase text-sm flex-1 mb-2">Top 10 de Clientes</h3>
          <p class="text-center text-xs font-[500] text-gray-600 mb-2">
            {{ mostrarRangoTop() }}
          </p>
          <div v-if="mensajeErrorTop" class="text-center text-xs font-[500] text-red-600">
            {{ mensajeErrorTop }}
          </div>
        </div>
        <div class="relative">
          <button @click="mostrarOpcionesTop = !mostrarOpcionesTop"
            class="text-gray-600 hover:text-black focus:outline-none">
            ⚙️
          </button>
          <div v-if="mostrarOpcionesTop"
            class="absolute right-0 mt-2 w-60 bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-2">
            <div class="grid grid-cols-1 gap-1 mb-2">

              <div class="w-full overflow-x-auto scroll-delgado">
                <div class="flex gap-2 mb-2 text-xs whitespace-nowrap px-2 py-1">
                  <button @click="aplicarRangoRapidoTop('hoy')"
                    :class="['px-2 py-1 rounded', rangoSeleccionadoTop === 'hoy' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Hoy</button>
                  <button @click="aplicarRangoRapidoTop('ayer')"
                    :class="['px-2 py-1 rounded', rangoSeleccionadoTop === 'ayer' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Ayer</button>
                  <button @click="aplicarRangoRapidoTop('hace_7')"
                    :class="['px-2 py-1 rounded', rangoSeleccionadoTop === 'hace_7' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Hace
                    7 días</button>
                  <button @click="aplicarRangoRapidoTop('ultimo_7')"
                    :class="['px-2 py-1 rounded', rangoSeleccionadoTop === 'ultimo_7' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Últimos
                    7 días</button>
                  <button @click="aplicarRangoRapidoTop('ultimo_14')"
                    :class="['px-2 py-1 rounded', rangoSeleccionadoTop === 'ultimo_14' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Últimos
                    14 días</button>
                  <button @click="aplicarRangoRapidoTop('ultimo_28')"
                    :class="['px-2 py-1 rounded', rangoSeleccionadoTop === 'ultimo_28' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Últimos
                    28 días</button>
                  <button @click="aplicarRangoRapidoTop('este_mes')"
                    :class="['px-2 py-1 rounded', rangoSeleccionadoTop === 'este_mes' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Este
                    mes</button>
                  <button @click="aplicarRangoRapidoTop('esta_semana')"
                    :class="['px-2 py-1 rounded', rangoSeleccionadoTop === 'esta_semana' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Esta
                    semana</button>
                  <button @click="aplicarRangoRapidoTop('mes_pasado')"
                    :class="['px-2 py-1 rounded', rangoSeleccionadoTop === 'mes_pasado' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Mes
                    pasado</button>
                  <button @click="aplicarRangoRapidoTop('semana_pasada')"
                    :class="['px-2 py-1 rounded', rangoSeleccionadoTop === 'semana_pasada' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Semana
                    pasada</button>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-black">Desde:</label>
                <input type="date" v-model="fechaInicioTop" :max="maxDate"
                  class="w-full p-1 border border-gray-300 rounded mb-2">
                <p v-if="errorMessages.fechaInicioTop" class="text-red-500 text-xs">{{ errorMessages.fechaInicioTop }}
                </p>
              </div>
              <div>
                <label class="block text-sm font-medium text-black">Hasta:</label>
                <input type="date" v-model="fechaFinTop" :max="maxDate"
                  class="w-full p-1 border border-gray-300 rounded mb-2">
                <p v-if="errorMessages.fechaFinTop" class="text-red-500 text-xs">{{ errorMessages.fechaFinTop }}</p>
              </div>
            </div>
            <div class="flex justify-end space-x-2 mt-2">
              <button @click="filtrarPorFechaTop"
                class="w-full py-2 bg-[#00a600] font-semibold text-white rounded-lg hover:bg-[#24be24] uppercase text-xs">
                Aceptar
              </button>
              <button @click="turnoActualTop"
                class="w-full py-2 bg-[#187aff] font-semibold text-white rounded-lg hover:bg-[#2776e1] uppercase text-xs">
                Día Actual
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="overflow-x-auto max-h-[450px]">
        <table
          class="table-fixed w-full text-xs text-center text-black border border-gray-500 rounded-xl overflow-hidden ">
          <thead class="bg-gray-300 text-xxs font-bold text-black">
            <tr>
              <th class="w-1/12 px-1 py-1 border border-gray-500 ">N°</th>
              <th class="w-1/10 px-2 py-2 border border-gray-500">DNI/RUC</th>
              <th class="w-1/2 px-2 py-2 border border-gray-500">RAZ. SOCIAL/NOMBRES</th>
              <th class="w-1/5 px-2 py-2 border border-gray-500 rounded-tr-xl">MONTO S/.</th>
            </tr>
          </thead>
          <tbody class="text-xxs font-medium bg-gray-100">
            <tr v-for="(item, index) in listaTopClientes" :key="item.clienteID">
              <td class="px-1 py-1 border border-gray-500">{{ index + 1 }}</td>
              <td class="px-2 py-2 border border-gray-500 text-left">{{ item.clienteID }}</td>
              <td class="px-2 py-2 border border-gray-500">{{ item.clienteRZ }}</td>
              <td class="px-2 py-2 border border-gray-500">{{ Number(item.soles).toLocaleString('en-US', {
                minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!--TABLA: Venta por Operador -->
    <div
      class="bg-white p-2 rounded-lg sm:col-span-5 sm:row-span-3 sm:col-start-6 sm:row-start-1 border-[#4e4e4e] border-t-4">
      <div class="flex justify-between items-center relative">
        <button class="text-gray-600 hover:text-black focus:outline-none"></button>
        <div>
          <h3 class="text-center font-bold text-black uppercase text-sm flex-1 mb-2">Venta por Operador </h3>
          <p class="text-center text-xs font-[500] text-gray-600 mb-2">
            {{ mostrarRangoOp() }}
          </p>
          <div v-if="mensajeErrorOp" class="text-center text-xs font-[500] text-red-600">
            {{ mensajeErrorOp }}
          </div>
        </div>
        <div class="relative">
          <button @click="mostrarOpcionesOp = !mostrarOpcionesOp"
            class="text-gray-600 hover:text-black focus:outline-none">
            ⚙️
          </button>
          <div v-if="mostrarOpcionesOp"
            class="absolute right-0 mt-2 w-60 bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-2">
            <div class="grid grid-cols-1 gap-1 mb-2">
              <div>
                <label class="block text-sm font-medium text-black">Desde:</label>
                <input type="date" v-model="fechaInicioOp" :max="maxDate"
                  class="w-full p-1 border border-gray-300 rounded mb-2">
                <p v-if="errorMessages.fechaInicioOp" class="text-red-500 text-xs">{{ errorMessages.fechaInicioOp }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-black">Hasta:</label>
                <input type="date" v-model="fechaFinOp" :max="maxDate"
                  class="w-full p-1 border border-gray-300 rounded mb-2">
                <p v-if="errorMessages.fechaFinOp" class="text-red-500 text-xs">{{ errorMessages.fechaFinOp }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-black">Turno:</label>
                <input type="number" v-model="numeroTurnoOp" maxlength="1" @input="validarTurnoSoloDigito"
                  class="w-full p-1 border border-gray-300 rounded mb-2">
                <p v-if="errorMessages.numeroTurnoOp" class="text-red-500 text-xs">{{ errorMessages.numeroTurnoOp }}</p>
              </div>
            </div>
            <div class="flex justify-end space-x-2 mt-2">
              <button @click="filtrarPorFechaOp"
                class="w-full py-2 bg-[#00a600] font-semibold text-white rounded-lg hover:bg-[#24be24] uppercase text-xs">
                Aceptar
              </button>
              <button @click="turnoActualOP"
                class="w-full py-2 bg-[#187aff] font-semibold text-white rounded-lg hover:bg-[#2776e1] uppercase text-xs">
                Turno Actual
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="overflow-x-auto max-h-[450px]">
        <table class="table-fixed w-full  text-center text-black border border-gray-500 rounded-xl overflow-hidden">
          <thead class="bg-gray-300 text-xxs font-bold text-black">
            <tr>
              <th class="w-1/2 px-2 py-2 border border-gray-500 rounded-tl-xl">NOMBRES</th>
              <th class="w-1/10 px-1 py-1  border border-gray-500">TURNO</th>
              <th class="w-1/10 px-2 py-2 border border-gray-500">N° DPCHO.</th>
              <th class="w-1/10 px-2 py-2 border border-gray-500 rounded-tr-xl">MONTO S/.</th>
            </tr>
          </thead>
          <tbody class="text-xxs font-medium">
            <tr v-for="(item, index) in listaVentaOperador" :key="index" :class="getColorClass(index)">
              <td class="px-2 py-2 border border-gray-500">{{ item.nombres }}</td>
              <td class="px-1 py-1 border border-gray-500">{{ item.turno }}</td>
              <td class="px-2 py-2 border border-gray-500">{{ item.despachos }}</td>
              <td class="px-2 py-2 border border-gray-500">{{ Number(item.soles).toLocaleString('en-US', {
                minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</td>
            </tr>
            <tr class="bg-gray-200 font-bold">
              <td class="px-2 py-2 border border-gray-500 text-right"></td>
              <td class="px-2 py-2 border border-gray-500 text-right">TOTALES</td>
              <td class="px-2 py-2 border border-gray-500">{{ totalDespachos() }}</td>
              <td class="px-2 py-2 border border-gray-500">{{ totalSoles() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!--TABLA: Venta por Tipo de Vehiculo-->
    <div
      class="bg-white p-2 rounded-lg sm:col-span-5 sm:row-span-3 sm:col-start-1 sm:row-start-5 border-[#4e4e4e] border-t-4">
      <div class="flex justify-between items-center relative">
        <button class="text-gray-600 hover:text-black focus:outline-none"></button>
        <div>
          <h3 class="text-center font-bold text-black uppercase text-sm flex-1 mb-2">Venta por Tipo de Vehiculo </h3>
          <p class="text-center text-xs font-[500] text-gray-600 mb-2">
            {{ mostrarRangoTtv() }}
          </p>
          <div v-if="mensajeErrorTtv" class="text-center text-xs font-[500] text-red-600">
            {{ mensajeErrorTtv }}
          </div>
        </div>
        <div class="relative">
          <button @click="mostrarOpcionesTtv = !mostrarOpcionesTtv"
            class="text-gray-600 hover:text-black focus:outline-none">
            ⚙️
          </button>
          <div v-if="mostrarOpcionesTtv"
            class="absolute right-0 mt-2 w-60 bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-2">
            <div class="grid grid-cols-1 gap-1 mb-2">
              <div class="w-full overflow-x-auto scroll-delgado">
                <div class="flex gap-2 mb-2 text-xs whitespace-nowrap px-2 py-1">
                  <button @click="aplicarRangoRapidoTtv('hoy')"
                    :class="['px-2 py-1 rounded', rangoSeleccionadoTtv === 'hoy' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Hoy</button>
                  <button @click="aplicarRangoRapidoTtv('ayer')"
                    :class="['px-2 py-1 rounded', rangoSeleccionadoTtv === 'ayer' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Ayer</button>
                  <button @click="aplicarRangoRapidoTtv('hace_7')"
                    :class="['px-2 py-1 rounded', rangoSeleccionadoTtv === 'hace_7' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Hace
                    7 días</button>
                  <button @click="aplicarRangoRapidoTtv('ultimo_7')"
                    :class="['px-2 py-1 rounded', rangoSeleccionadoTtv === 'ultimo_7' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Últimos
                    7 días</button>
                  <button @click="aplicarRangoRapidoTtv('ultimo_14')"
                    :class="['px-2 py-1 rounded', rangoSeleccionadoTtv === 'ultimo_14' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Últimos
                    14 días</button>
                  <button @click="aplicarRangoRapidoTtv('ultimo_28')"
                    :class="['px-2 py-1 rounded', rangoSeleccionadoTtv === 'ultimo_28' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Últimos
                    28 días</button>
                  <button @click="aplicarRangoRapidoTtv('este_mes')"
                    :class="['px-2 py-1 rounded', rangoSeleccionadoTtv === 'este_mes' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Este
                    mes</button>
                  <button @click="aplicarRangoRapidoTtv('esta_semana')"
                    :class="['px-2 py-1 rounded', rangoSeleccionadoTtv === 'esta_semana' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Esta
                    semana</button>
                  <button @click="aplicarRangoRapidoTtv('mes_pasado')"
                    :class="['px-2 py-1 rounded', rangoSeleccionadoTtv === 'mes_pasado' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Mes
                    pasado</button>
                  <button @click="aplicarRangoRapidoTtv('semana_pasada')"
                    :class="['px-2 py-1 rounded', rangoSeleccionadoTtv === 'semana_pasada' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Semana
                    pasada</button>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-black">Desde:</label>
                <input type="date" v-model="fechaInicioTtv" :max="maxDate"
                  class="w-full p-1 border border-gray-300 rounded mb-2">
                <p v-if="errorMessages.fechaInicioTtv" class="text-red-500 text-xs">{{ errorMessages.fechaInicioTtv }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-black">Hasta:</label>
                <input type="date" v-model="fechaFinTtv" :max="maxDate"
                  class="w-full p-1 border border-gray-300 rounded mb-2">
                <p v-if="errorMessages.fechaFinTtv" class="text-red-500 text-xs">{{ errorMessages.fechaFinTtv}}</p>
              </div>
            </div>
            <div class="flex justify-end space-x-2 mt-2">
              <button @click="filtrarPorFechaTtv"
                class="w-full py-2 bg-[#00a600] font-semibold text-white rounded-lg hover:bg-[#24be24] uppercase text-xs">
                Aceptar
              </button>
              <button @click="turnoActualTtv"
                class="w-full py-2 bg-[#187aff] font-semibold text-white rounded-lg hover:bg-[#2776e1] uppercase text-xs">
                Turno Actual
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="overflow-x-auto max-h-[450px]">
        <table class="table-fixed w-full  text-center text-black border border-gray-500 rounded-xl overflow-hidden">
          <thead class="bg-gray-300 text-xxs font-bold text-black">
            <tr>
              <th class="w-1/2 px-2 py-2 border border-gray-500 rounded-tl-xl">NOMBRES</th>
              <th class="w-1/10 px-2 py-2 border border-gray-500">N° DPCHO.</th>
               <th class="w-1/10 px-2 py-2 border border-gray-500">GALONES</th>
              <th class="w-1/10 px-2 py-2 border border-gray-500 rounded-tr-xl">MONTO S/.</th>
            </tr>
          </thead>
          <tbody class="text-xxs font-medium">
            <tr v-for="(item, index) in listaVentaTtv" :key="index" :class="getColorClass(index)">
              <td class="px-2 py-2 border border-gray-500">{{ item.nombres }}</td>
              <td class="px-2 py-2 border border-gray-500">{{ item.despachos }}</td>
              <td class="px-2 py-2 border border-gray-500">{{ Number(item.galones).toLocaleString('en-US', {
                minimumFractionDigits: 3, maximumFractionDigits: 3 }) }}</td>
              <td class="px-2 py-2 border border-gray-500">{{ Number(item.soles).toLocaleString('en-US', {
                minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</td>
            </tr>
            <tr class="bg-gray-200 font-bold">
              <td class="px-2 py-2 border border-gray-500 text-right">TOTALES</td>
              <td class="px-2 py-2 border border-gray-500">{{ totalDespachosTtv() }}</td>
              <td class="px-2 py-2 border border-gray-500">{{ totalGalonesTtv() }}</td>
              <td class="px-2 py-2 border border-gray-500">{{ totalSolesTtv() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import api from "../services/api";
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "ReportesPage",
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    const { fechaInicioOp, fechaFinOp } = this.obtenerFechaActualOP();
    const { fechaInicioTop, fechaFinTop } = this.obtenerFechaActualTop();
    const { fechaInicioTtv, fechaFinTtv } = this.obtenerFechaActualTtv();
    return {
      numeroTurnoOp: null,
      listaTopClientes: [],
      listaVentaOperador: [],
      listaVentaTtv: [],
      actualizandoTurno: false,
      rangoSeleccionadoOp: '',
      rangoSeleccionadoTop: '',
      rangoSeleccionadoTtv: '',
      maxDate: this.obtenerFechaMaxima(),
      mensajeErrorOp: "",
      mensajeErrorTop: "",
      mensajeErrorTtv: "",
      esTurnoActual: false,
      rangoFiltradoOp: "",
      rangoFiltradoTop: "",
      rangoFiltradoTtv: "",
      fechaInicioOp,
      fechaFinOp,
      fechaInicioTop,
      fechaFinTop,
      fechaInicioTtv,
      fechaFinTtv,
      errorMessages: {
        fechaInicioOp: "",
        fechaFinOp: "",
        fechaInicioTop: "",
        fechaFinTop: "",
        fechaInicioTtv: "",
        fechaFinTtv: "",
      },
      mostrarOpcionesOp: false,
      mostrarOpcionesTop: false,
      mostrarOpcionesTtv: false,
      botonfiltrarOp: false,
      esMovil: window.innerWidth < 768,
      fechaInicioFormateada: '',
      fechaFinFormateada: '',
      ultimoFiltroInicio: null,
      ultimoFiltroFin: null,
      ultimoFiltroRapido: 'hoy',
      intervalID: null,
      expanded: false,
    };
  },
  watch: {
    fechaInicioOp() {
      if (!this.actualizandoTurno) this.actualizarRangoFiltradoOp();
    },
    fechaFinOp() {
      if (!this.actualizandoTurno) this.actualizarRangoFiltradoOp();
    },
    fechaInicioTop() {
      if (!this.actualizandoTurno) this.actualizarRangoFiltradoTop();
    },
    fechaFinTop() {
      if (!this.actualizandoTurno) this.actualizarRangoFiltradoTop();
    },
     fechaInicioTtv() {
      if (!this.actualizandoTurno) this.actualizarRangoFiltradoTtv();
    },
    fechaFinTtv() {
      if (!this.actualizandoTurno) this.actualizarRangoFiltradoTtv();
    }
  },
  methods: {
    mostrarRangoTtv() {
      if (this.rangoFiltradoTtv) {
        return this.rangoFiltradoTtv;
      } else {
        const hoy = new Date();
        const fechaHoy = hoy.toISOString().split("T")[0];
       return `Del día: ${fechaHoy}`;
      }
    },
    mostrarRangoTop() {
      if (this.rangoFiltradoTop) {
        return this.rangoFiltradoTop;
      } else {
        const hoy = new Date();
        const fechaHoy = hoy.toISOString().split("T")[0];
       return `Del día: ${fechaHoy}`;
      }
    },
    mostrarRangoOp() {
      if (this.rangoFiltradoOp) {
        return this.rangoFiltradoOp;
      } else {
        const hoy = new Date();
        const fechaHoy = hoy.toISOString().split("T")[0];
        return `Del día: ${fechaHoy}`;
      }
    },
    validarTurnoSoloDigito(event) {
      const valor = parseInt(event.target.value);
      if (valor.length > 1 || !/^[0-9]$/.test(valor)) {
        this.numeroTurnoOp = '';
      }
    },
    obtenerFechaMaxima() {
      const ahora = new Date();
      const año = ahora.getFullYear();
      const mes = String(ahora.getMonth() + 1).padStart(2, "0");
      const dia = String(ahora.getDate()).padStart(2, "0");
      return `${año}-${mes}-${dia}`;
    },
    /** Tipo de Vehiculo */
    totalDespachosTtv() {
      return this.listaVentaTtv.reduce((sum, item) => sum + Number(item.despachos), 0);
    },
    totalGalonesTtv(){
      return this.listaVentaTtv.reduce((sum, item) => sum + Number(item.galones), 0).toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
    },
    totalSolesTtv() {
      return this.listaVentaTtv.reduce((sum, item) => sum + Number(item.soles), 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    },
    getColorClass(index) {
      const colores = [
        'bg-red-300',
        'bg-yellow-300',
        'bg-green-300',
        'bg-blue-300',
        'bg-purple-300',
        'bg-pink-300',
        'bg-orange-300',
        'bg-teal-300',
        'bg-indigo-300',
        'bg-lime-300',
        'bg-amber-300',
        'bg-cyan-300',
        'bg-rose-300',
        'bg-fuchsia-300',
        'bg-emerald-300',
        'bg-sky-300',
        'bg-violet-300',
      ];
      return colores[index % colores.length];
    },
    async obtenerVentaVehiculo() {
      try {
            const response = await api.get(`/RVehiculoG/Listado`);
            const data = response.data;
            this.listaVentaTtv = data.sort((a, b) => b.soles - a.soles);
      } catch (error) {
        console.error('Error al obtener los clientes:', error);
      }
    },
    async obtenerDatosVehiculoFiltro(fechaInicioTtv = null, fechaFinTtv = null) {
      try {
        const response = await api.get(`/RVehiculoG/ListadoDSBFE?FechaInicial=${fechaInicioTtv}&FechaFinal=${fechaFinTtv}`);
        const data = response.data;
        this.listaVentaTtv = data.map(item => ({
          nombres: item.nombres,
          despachos: item.despachos,
          galones: item.galones,
          soles: item.soles
        })).sort((a, b) => b.soles - a.soles);
      } catch (error) {
        console.error('Error al obtener los clientes:', error);
      }
    },
    validateFormTtv() {
      let isValid = true;
      this.errorMessages = {};

      const fechaInicioTtv = new Date(this.fechaInicioTtv);
      const fechaFinTtv = new Date(this.fechaFinTtv);

      if (!this.fechaInicioTtv) {
        this.errorMessages.fechaInicioTtv = '* El campo Fecha Inicio es obligatorio';
        isValid = false;
      }

      if (!this.fechaFinTtv) {
        this.errorMessages.fechaFinTtv = '* El campo Fecha Fin es obligatorio';
        isValid = false;
      }

      if (this.fechaInicioTtv && this.fechaFinTtv && fechaInicioTtv > fechaFinTtv) {
        this.errorMessages.fechaInicioTtv = '* La Fecha Inicio no puede ser posterior a la Fecha Fin';
        isValid = false;
      }

      return isValid;
    },
    obtenerFechaActualTtv() {
      const ahora = new Date();

      const opciones = {
        timeZone: "America/Lima",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      };

      const formatoFecha = new Intl.DateTimeFormat("es-PE", opciones).format(ahora);
      const [dia, mes, año] = formatoFecha.split("/");

      const fechaInicioTtv = `${año}-${mes}-${dia}`;
      const fechaFinTtv = `${año}-${mes}-${dia}`;

      return { fechaInicioTtv, fechaFinTtv };
    },
    turnoActualTtv() {
      this.mostrarOpcionesTtv = false;
      this.botonfiltrarTtv = false

      this.actualizandoTurno = true;

      const { fechaInicioTtv, fechaFinTtv } = this.obtenerFechaActualTtv();

      this.fechaInicioTtv = fechaInicioTtv;
      this.fechaFinTtv = fechaFinTtv;

      this.esTurnoActual = true;
      this.rangoFiltradoTtv = '';

      this.obtenerVentaVehiculo();

      this.$nextTick(() => {
        this.actualizandoTurno = false;
      });
    },
    actualizarRangoFiltradoTtv() {
      if (this.fechaInicioTtv && this.fechaFinTtv) {
        this.rangoFiltradoTtv = `Desde: ${this.fechaInicioTtv.replace("T", " ")} Hasta: ${this.fechaFinTtv.replace("T", " ")}`;
      }
    },
    filtrarPorFechaTtv() {

      if (!this.validateFormTtv()) return;

      let fechaInicioFormateadaTtv = this.fechaInicioTtv;
      let fechaFinFormateadaTtv = this.fechaFinTtv;

      if (!fechaInicioFormateadaTtv || !fechaFinFormateadaTtv) {
        console.error("Error al formatear las fechas.");
        return;
      }

      this.esTurnoActual = false;
      this.mostrarOpcionesTtv = false;
      this.botonfiltrarTtv = true,
      this.obtenerDatosVehiculoFiltro(fechaInicioFormateadaTtv, fechaFinFormateadaTtv);

    },
    aplicarRangoRapidoTtv(opcion) {
      this.rangoSeleccionadoTtv = opcion;

      const hoy = new Date();
      let inicio = new Date();
      let fin = new Date();

      const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };

      const primerDiaMes = (d) => new Date(d.getFullYear(), d.getMonth(), 1);
      const ultimoDiaMes = (d) => new Date(d.getFullYear(), d.getMonth() + 1, 0);
      const primerDiaSemana = (d) => {
        const dia = d.getDay() || 7; // lunes = 1
        const copia = new Date(d);
        copia.setDate(copia.getDate() - dia + 1);
        return copia;
      };
      const ultimoDiaSemana = (d) => {
        const primero = primerDiaSemana(d);
        const ultimo = new Date(primero);
        ultimo.setDate(primero.getDate() + 6);
        return ultimo;
      };

      switch (opcion) {
        case 'hoy':
          inicio = new Date(hoy);
          fin = new Date(hoy);
          break;
        case 'ayer':
          inicio.setDate(hoy.getDate() - 1);
          fin.setDate(hoy.getDate() - 1);
          break;
        case 'hace_7':
          inicio.setDate(hoy.getDate() - 7);
          fin = new Date(hoy);
          break;
        case 'ultimo_7':
          inicio.setDate(hoy.getDate() - 6);
          fin = new Date(hoy);
          break;
        case 'ultimo_14':
          inicio.setDate(hoy.getDate() - 13);
          fin = new Date(hoy);
          break;
        case 'ultimo_28':
          inicio.setDate(hoy.getDate() - 27);
          fin = new Date(hoy);
          break;
        case 'este_mes':
          inicio = primerDiaMes(hoy);
          fin = ultimoDiaMes(hoy);
          break;
        case 'mes_pasado':
          const mesAnterior = new Date(hoy.getFullYear(), hoy.getMonth() - 1, 1);
          inicio = primerDiaMes(mesAnterior);
          fin = ultimoDiaMes(mesAnterior);
          break;
        case 'esta_semana':
          inicio = primerDiaSemana(hoy);
          fin = ultimoDiaSemana(hoy);
          break;
        case 'semana_pasada':
          const semanaPasada = new Date(hoy);
          semanaPasada.setDate(hoy.getDate() - 7);
          inicio = primerDiaSemana(semanaPasada);
          fin = ultimoDiaSemana(semanaPasada);
          break;
      }

      this.fechaInicioTtv = formatDate(inicio);
      this.fechaFinTtv = formatDate(fin);

      this.rangoFiltradoTtv = `Desde: ${this.fechaInicioTtv} Hasta: ${this.fechaFinTtv}`;
      this.botonfiltrarTtv = true;
      this.filterData(this.fechaInicioTtv, this.fechaFinTtv);
    },
    /** Top Cliente */
    async obtenerTopClientes() {
      try {
        const response = await api.get(`/TopCliente/ListadoTopCliente`);
        const data = response.data;
        this.listaTopClientes = data;
      } catch (error) {
        console.error('Error al obtener los clientes:', error);
      }
    },
    async obtenerTopClientesFiltro(fechaInicioTop = null, fechaFinTop = null) {
      try {
        const response = await api.get(`/TopCliente/ListadoDSBFE?FechaInicial=${fechaInicioTop}&FechaFinal=${fechaFinTop}`);
        const data = response.data;
        this.listaTopClientes = data.map(item => ({
          clienteID: item.clienteID,
          clienteRZ: item.clienteRZ,
          soles: item.soles
        })).sort((a, b) => b.soles - a.soles);
      } catch (error) {
        console.error('Error al obtener los clientes:', error);
      }
    },
    validateFormTop() {
      let isValid = true;
      this.errorMessages = {};

      const fechaInicioTop = new Date(this.fechaInicioTop);
      const fechaFinTop = new Date(this.fechaFinTop);

      if (!this.fechaInicioTop) {
        this.errorMessages.fechaInicioTop = '* El campo Fecha Inicio es obligatorio';
        isValid = false;
      }

      if (!this.fechaFinTop) {
        this.errorMessages.fechaFinTop = '* El campo Fecha Fin es obligatorio';
        isValid = false;
      }

      if (this.fechaInicioTop && this.fechaFinTop && fechaInicioTop > fechaFinTop) {
        this.errorMessages.fechaInicioTop = '* La Fecha Inicio no puede ser posterior a la Fecha Fin';
        isValid = false;
      }

      return isValid;
    },
    obtenerFechaActualTop() {
      const ahora = new Date();

      const opciones = {
        timeZone: "America/Lima",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      };

      const formatoFecha = new Intl.DateTimeFormat("es-PE", opciones).format(ahora);
      const [dia, mes, año] = formatoFecha.split("/");

      const fechaInicioTop = `${año}-${mes}-${dia}`;
      const fechaFinTop = `${año}-${mes}-${dia}`;

      return { fechaInicioTop, fechaFinTop };
    },
    turnoActualTop() {
      this.mostrarOpcionesTop = false;
      this.botonfiltrarTop = false

      this.actualizandoTurno = true;

      const { fechaInicioTop, fechaFinTop } = this.obtenerFechaActualTop();

      this.fechaInicioTop = fechaInicioTop;
      this.fechaFinTop = fechaFinTop;

      this.esTurnoActual = true;
      this.rangoFiltradoTop = `Desde: ${this.fechaInicioTop.replace("T", " ")} Hasta: ${this.fechaFinTop.replace("T", " ")}`;

      this.obtenerTopClientes();

      this.$nextTick(() => {
        this.actualizandoTurno = false;
      });
    },
    actualizarRangoFiltradoTop() {
      if (this.fechaInicioTop && this.fechaFinTop) {
        this.rangoFiltradoTop = `Desde: ${this.fechaInicioTop.replace("T", " ")} Hasta: ${this.fechaFinTop.replace("T", " ")}`;
      }
    },
    filtrarPorFechaTop() {

      if (!this.validateFormTop()) return;

      let fechaInicioFormateadaTop = this.fechaInicioTop;
      let fechaFinFormateadaTop = this.fechaFinTop;

      if (!fechaInicioFormateadaTop || !fechaFinFormateadaTop) {
        console.error("Error al formatear las fechas.");
        return;
      }

      this.esTurnoActual = false;

      this.mostrarOpcionesTop = false;
      this.botonfiltrarTop = true,
        this.obtenerTopClientesFiltro(fechaInicioFormateadaTop, fechaFinFormateadaTop);

    },
    aplicarRangoRapidoTop(opcion) {
      this.rangoSeleccionadoTop = opcion;

      const hoy = new Date();
      let inicio = new Date();
      let fin = new Date();

      const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };

      const primerDiaMes = (d) => new Date(d.getFullYear(), d.getMonth(), 1);
      const ultimoDiaMes = (d) => new Date(d.getFullYear(), d.getMonth() + 1, 0);
      const primerDiaSemana = (d) => {
        const dia = d.getDay() || 7; // lunes = 1
        const copia = new Date(d);
        copia.setDate(copia.getDate() - dia + 1);
        return copia;
      };
      const ultimoDiaSemana = (d) => {
        const primero = primerDiaSemana(d);
        const ultimo = new Date(primero);
        ultimo.setDate(primero.getDate() + 6);
        return ultimo;
      };

      switch (opcion) {
        case 'hoy':
          inicio = new Date(hoy);
          fin = new Date(hoy);
          break;
        case 'ayer':
          inicio.setDate(hoy.getDate() - 1);
          fin.setDate(hoy.getDate() - 1);
          break;
        case 'hace_7':
          inicio.setDate(hoy.getDate() - 7);
          fin = new Date(hoy);
          break;
        case 'ultimo_7':
          inicio.setDate(hoy.getDate() - 6);
          fin = new Date(hoy);
          break;
        case 'ultimo_14':
          inicio.setDate(hoy.getDate() - 13);
          fin = new Date(hoy);
          break;
        case 'ultimo_28':
          inicio.setDate(hoy.getDate() - 27);
          fin = new Date(hoy);
          break;
        case 'este_mes':
          inicio = primerDiaMes(hoy);
          fin = ultimoDiaMes(hoy);
          break;
        case 'mes_pasado':
          const mesAnterior = new Date(hoy.getFullYear(), hoy.getMonth() - 1, 1);
          inicio = primerDiaMes(mesAnterior);
          fin = ultimoDiaMes(mesAnterior);
          break;
        case 'esta_semana':
          inicio = primerDiaSemana(hoy);
          fin = ultimoDiaSemana(hoy);
          break;
        case 'semana_pasada':
          const semanaPasada = new Date(hoy);
          semanaPasada.setDate(hoy.getDate() - 7);
          inicio = primerDiaSemana(semanaPasada);
          fin = ultimoDiaSemana(semanaPasada);
          break;
      }

      this.fechaInicioTop = formatDate(inicio);
      this.fechaFinTop = formatDate(fin);

      this.rangoFiltradoTop = `Desde: ${this.fechaInicioTop} Hasta: ${this.fechaFinTop}`;
      this.botonfiltrarTop = true;
      this.filterData(this.fechaInicioTop, this.fechaFinTop);
    },
    /** Operador */
    totalDespachos() {
      return this.listaVentaOperador.reduce((sum, item) => sum + Number(item.despachos), 0);
    },
    totalSoles() {
      return this.listaVentaOperador.reduce((sum, item) => sum + Number(item.soles), 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    },
    getColorClass(index) {
      const colores = [
        'bg-red-300',
        'bg-yellow-300',
        'bg-green-300',
        'bg-blue-300',
        'bg-purple-300',
        'bg-pink-300',
        'bg-orange-300',
        'bg-teal-300',
        'bg-indigo-300',
        'bg-lime-300',
        'bg-amber-300',
        'bg-cyan-300',
        'bg-rose-300',
        'bg-fuchsia-300',
        'bg-emerald-300',
        'bg-sky-300',
        'bg-violet-300',
      ];
      return colores[index % colores.length];
    },
    async obtenerVentaOperador() {
      try {
        const response = await api.get(`/RVendedor/ListadoDSB`);
        const data = response.data;
        this.listaVentaOperador = data.sort((a, b) => b.soles - a.soles);
      } catch (error) {
        console.error('Error al obtener los vendedor:', error);
      }
    },
    async obtenerDatosOperadorFiltro(fechaInicioOp = null, fechaFinOp = null, turno = null) {
      try {
        const response = await api.get(`/RVendedor/ListadoDSBFE?FechaInicial=${fechaInicioOp}&FechaFinal=${fechaFinOp}&Turno=${turno}`);
        const data = response.data;
        this.listaVentaOperador = data.map(item => ({
          nombres: item.nombres,
          despachos: item.despachos,
          soles: item.soles,
          turno: item.turno
        })).sort((a, b) => b.soles - a.soles);
      } catch (error) {
        console.error('Error al obtener los vendedor:', error);
      }
    },
    validateFormOP() {
      let isValid = true;
      this.errorMessages = {};

      const fechaInicioOp = new Date(this.fechaInicioOp);
      const fechaFinOp = new Date(this.fechaFinOp);

      if (!this.fechaInicioOp) {
        this.errorMessages.fechaInicioOp = '* El campo Fecha Inicio es obligatorio';
        isValid = false;
      }

      if (!this.fechaFinOp) {
        this.errorMessages.fechaFinOp = '* El campo Fecha Fin es obligatorio';
        isValid = false;
      }

      if (this.numeroTurnoOp === '' || this.numeroTurnoOp === null || this.numeroTurnoOp === undefined) {
        this.errorMessages.numeroTurnoOp = '* El campo Turno es obligatorio';
        isValid = false;
      }

      if (this.fechaInicioOp && this.fechaFinOp && fechaInicioOp > fechaFinOp) {
        this.errorMessages.fechaInicioOp = '* La Fecha Inicio no puede ser posterior a la Fecha Fin';
        isValid = false;
      }

      return isValid;
    },
    obtenerFechaActualOP() {
      const ahora = new Date();

      const opciones = {
        timeZone: "America/Lima",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      };

      const formatoFecha = new Intl.DateTimeFormat("es-PE", opciones).format(ahora);
      const [dia, mes, año] = formatoFecha.split("/");

      const fechaInicioOp = `${año}-${mes}-${dia}`;
      const fechaFinOp = `${año}-${mes}-${dia}`;

      return { fechaInicioOp, fechaFinOp };
    },
    turnoActualOP() {
      this.mostrarOpcionesOp = false;
      this.botonfiltrarOp = false

      this.actualizandoTurno = true;

      const { fechaInicioOp, fechaFinOp } = this.obtenerFechaActualOP();

      this.fechaInicioOp = fechaInicioOp;
      this.fechaFinOp = fechaFinOp;

      this.esTurnoActual = true;
      this.rangoFiltradoOp = '';

      this.obtenerVentaOperador();

      this.$nextTick(() => {
        this.actualizandoTurno = false;
      });
    },
    actualizarRangoFiltradoOp() {
      if (this.fechaInicioOp && this.fechaFinOp) {
        this.rangoFiltradoOp = `Desde: ${this.fechaInicioOp.replace("T", " ")} Hasta: ${this.fechaFinOp.replace("T", " ")}`;
      }
    },
    filtrarPorFechaOp() {

      if (!this.validateFormOP()) return;

      let fechaInicioFormateadaOP = this.fechaInicioOp;
      let fechaFinFormateadaOP = this.fechaFinOp;

      if (!fechaInicioFormateadaOP || !fechaFinFormateadaOP) {
        console.error("Error al formatear las fechas.");
        return;
      }

      this.esTurnoActual = false;
      this.mostrarOpcionesOp = false;
      this.botonfiltrarOp = true,
        this.obtenerDatosOperadorFiltro(fechaInicioFormateadaOP, fechaFinFormateadaOP, this.numeroTurnoOp);

    },
    aplicarRangoRapidoOp(opcion) {

      this.rangoSeleccionadoOp = opcion;

      const ahora = new Date();
      let inicio = new Date();
      let fin = new Date();

      const toLocalISO = (date) => {
        const offset = date.getTimezoneOffset();
        const localDate = new Date(date.getTime() - offset * 60 * 1000);
        return localDate.toISOString().slice(0, 16);
      };

      const setHora = (d, h, m) => {
        d.setHours(h, m, 0, 0);
        return d;
      };

      const primerDiaMes = (d) => new Date(d.getFullYear(), d.getMonth(), 1);
      const ultimoDiaMes = (d) => new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59);
      const primerDiaSemana = (d) => {
        const dia = d.getDay() || 7; // lunes = 1
        const copia = new Date(d);
        copia.setDate(d.getDate() - dia + 1);
        return setHora(copia, 0, 0);
      };
      const ultimoDiaSemana = (d) => {
        const primero = primerDiaSemana(d);
        const ultimo = new Date(primero);
        ultimo.setDate(primero.getDate() + 6);
        return setHora(ultimo, 23, 59);
      };

      switch (opcion) {
        case 'hoy':
          inicio = setHora(new Date(), 0, 0);
          fin = setHora(new Date(), 23, 59);
          break;
        case 'ayer':
          inicio = setHora(new Date(), 0, 0);
          fin = setHora(new Date(), 23, 59);
          inicio.setDate(inicio.getDate() - 1);
          fin.setDate(fin.getDate() - 1);
          break;
        case 'hace_7':
          inicio = setHora(new Date(), 0, 0);
          fin = setHora(new Date(), 23, 59);
          inicio.setDate(inicio.getDate() - 7);
          break;
        case 'ultimo_7':
          inicio = setHora(new Date(), 0, 0);
          inicio.setDate(inicio.getDate() - 6);
          fin = setHora(new Date(), 23, 59);
          break;
        case 'ultimo_14':
          inicio = setHora(new Date(), 0, 0);
          inicio.setDate(inicio.getDate() - 13);
          fin = setHora(new Date(), 23, 59);
          break;
        case 'ultimo_28':
          inicio = setHora(new Date(), 0, 0);
          inicio.setDate(inicio.getDate() - 27);
          fin = setHora(new Date(), 23, 59);
          break;
        case 'este_mes':
          inicio = setHora(primerDiaMes(ahora), 0, 0);
          fin = setHora(new Date(), 23, 59);
          break;
        case 'mes_pasado':
          const mesAnterior = new Date(ahora.getFullYear(), ahora.getMonth() - 1, 1);
          inicio = setHora(primerDiaMes(mesAnterior), 0, 0);
          fin = setHora(ultimoDiaMes(mesAnterior), 23, 59);
          break;
        case 'esta_semana':
          inicio = primerDiaSemana(ahora);
          fin = ultimoDiaSemana(ahora);
          break;
        case 'semana_pasada':
          const semanaPasada = new Date();
          semanaPasada.setDate(semanaPasada.getDate() - 7);
          inicio = primerDiaSemana(semanaPasada);
          fin = ultimoDiaSemana(semanaPasada);
          break;
      }

      this.fechaInicioOp = toLocalISO(inicio);
      this.fechaFinOp = toLocalISO(fin);

      this.rangoFiltradoOp = `Desde: ${this.fechaInicioOp.replace("T", " ")} Hasta: ${this.fechaFinOp.replace("T", " ")}`;
      this.botonfiltrarOp = true;
      this.obtenerDatosOperadorFiltro(this.fechaInicioOp, this.fechaFinOp);
    },
    /**Actualizacion */
    async actualizarDatos() {

      if (this.botonfiltrarOp) {
        let fechaInicioOp = this.fechaInicioOp;
        let fechaFinOp = this.fechaFinOp;
        this.obtenerDatosOperadorFiltro(fechaInicioOp, fechaFinOp);
      } else {
        this.obtenerVentaOperador();
      }

         if (this.botonfiltrarTtv) {
        let fechaInicioTtv = this.fechaInicioTtv;
        let fechaFinTtv = this.fechaFinTtv;
        this.obtenerDatosVehiculoFiltro(fechaInicioTtv, fechaFinTtv);
      } else {
        this.obtenerVentaVehiculo();
      }

      if (this.botonfiltrarTop) {
        let fechaInicioTop = this.fechaInicioTop;
        let fechaFinTop = this.fechaFinTop;
        this.obtenerTopClientesFiltro(fechaInicioTop, fechaFinTop);
      } else {
        this.obtenerTopClientes();
      }

    },
  },
  mounted() {
    this.actualizarDatos();

    this.intervalID = setInterval(() => {
      if (!this.mostrandoFiltro) {
        this.actualizarDatos();
      }
    }, 4000);

    window.addEventListener('resize', () => {
      this.esMovil = window.innerWidth < 768;
    });
  },
  beforeUnmount() {
    clearInterval(this.intervalID);
  }
};
</script>

<style scoped>
.perspective {
  perspective: 1000px;
}

.preserve-3d {
  transform-style: preserve-3d;
}

.backface-hidden {
  backface-visibility: hidden;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}

.apexcharts-canvas {
  padding: 0 !important;
  margin: 0 !important;
}

@media (max-width: 1200px) {
  .mobile\:bottom-\[25px\] {
    /*  bottom: -10px;*/
  }
}

@media (max-width: 768px) and (min-width: 640px) {
  .mobile\:bottom-\[20px\] {
    bottom: 70px;
  }

  .tablet\:grid-rows-custom {
    grid-template-rows: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .mobile\:bottom-\[20px\] {
    bottom: 70px;
  }

  .mobile\:grid-rows-custom {
    grid-template-rows: repeat(15, minmax(0, 1fr));
  }
}

.scroll-delgado::-webkit-scrollbar {
  height: 6px;
  /* más delgado */
}

.scroll-delgado::-webkit-scrollbar-track {
  background: transparent;
}

.scroll-delgado::-webkit-scrollbar-thumb {
  background-color: #a8a8a8;
  border-radius: 20px;
}

.text-xxs {
  font-size: 0.65rem;
}
</style>