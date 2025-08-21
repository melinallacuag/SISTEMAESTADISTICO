<template>
  <!--<div class="bg-white dark:bg-white p-4 rounded-lg shadow-md w-full overflow-x-auto">
    <div class="bg-[#212529] text-white p-3 rounded-lg flex justify-between items-center mb-">
      <h1 class="text-xs font-bold uppercase tracking-widest">Reportes</h1>
    </div>
  </div>-->
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-10 md:grid-rows-3 tablet:grid-rows-custom gap-2">
    <!--mobile:grid-rows-custom-->
    <div
      class="bg-white p-4 rounded-lg sm:col-span-6 sm:row-span-3 sm:col-start-1 sm:row-start-1 border-[#4e4e4e] border-t-4">

      <div class="flex justify-between items-center relative">
        <button class="text-gray-600 hover:text-black focus:outline-none"></button>
        <div>
          <h3 class="text-center font-bold text-black uppercase text-sm flex-1">Ventas de Combustibles </h3>
          <p v-if="rangoFiltradoC" class="text-center text-xs font-[500] text-gray-600">
            {{ rangoFiltradoC }}
          </p>
          <p class="text-center text-xs font-[500] text-gray-500">
            Comparado desde: {{ fechaComparacionInicio }} Hasta: {{ fechaComparacionFin }}
          </p>
          <div v-if="mensajeErrorC" class="text-center text-xs font-[500] text-red-600">
            {{ mensajeErrorC }}
          </div>
        </div>
        <div class="relative">
          <button @click="mostrarOpcionesC = !mostrarOpcionesC"
            class="text-gray-600 hover:text-black focus:outline-none">
            ⚙️
          </button>
          <div v-if="mostrarOpcionesC"
            class="absolute right-0 mt-2 w-60 bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-2">
            <div class="grid grid-cols-1 gap-1 mb-2">

              <div class="w-full overflow-x-auto scroll-delgado">
                <div class="flex gap-2 mb-2 text-xs whitespace-nowrap px-2 py-1">
                  <button @click="aplicarRangoRapidoC('hoy')"
                    :class="['px-2 py-1 rounded', rangoSeleccionadoC === 'hoy' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Hoy</button>
                  <button @click="aplicarRangoRapidoC('ayer')"
                    :class="['px-2 py-1 rounded', rangoSeleccionadoC === 'ayer' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Ayer</button>
                  <button @click="aplicarRangoRapidoC('hace_7')"
                    :class="['px-2 py-1 rounded', rangoSeleccionadoC === 'hace_7' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Hace
                    7 días</button>
                  <button @click="aplicarRangoRapidoC('ultimo_7')"
                    :class="['px-2 py-1 rounded', rangoSeleccionadoC === 'ultimo_7' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Últimos
                    7 días</button>
                  <button @click="aplicarRangoRapidoC('ultimo_14')"
                    :class="['px-2 py-1 rounded', rangoSeleccionadoC === 'ultimo_14' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Últimos
                    14 días</button>
                  <!--  <button @click="aplicarRangoRapidoC('ultimo_28')" :class="['px-2 py-1 rounded',rangoSeleccionadoC === 'ultimo_28' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Últimos 28 días</button>-->
                  <button @click="aplicarRangoRapidoC('este_mes')"
                    :class="['px-2 py-1 rounded', rangoSeleccionadoC === 'este_mes' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Este
                    mes</button>
                  <button @click="aplicarRangoRapidoC('esta_semana')"
                    :class="['px-2 py-1 rounded', rangoSeleccionadoC === 'esta_semana' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Esta
                    semana</button>
                  <button @click="aplicarRangoRapidoC('mes_pasado')"
                    :class="['px-2 py-1 rounded', rangoSeleccionadoC === 'mes_pasado' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Mes
                    pasado</button>
                  <button @click="aplicarRangoRapidoC('semana_pasada')"
                    :class="['px-2 py-1 rounded', rangoSeleccionadoC === 'semana_pasada' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Semana
                    pasada</button>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-black">Desde:</label>
                <input type="datetime-local" v-model="fechaInicioC" :max="maxDate"
                  class="w-full p-1 border border-gray-300 rounded mb-2">
                <p v-if="errorMessages.fechaInicioC" class="text-red-500 text-xs">{{ errorMessages.fechaInicioC }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-black">Hasta:</label>
                <input type="datetime-local" v-model="fechaFinC" :max="maxDate"
                  class="w-full p-1 border border-gray-300 rounded mb-2">
                <p v-if="errorMessages.fechaFinC" class="text-red-500 text-xs">{{ errorMessages.fechaFinC }}</p>
              </div>
            </div>
            <div class="flex justify-end space-x-2 mt-2">
              <button @click="filtrarPorFechaC"
                class="w-full py-2 bg-[#00a600] font-semibold text-white rounded-lg hover:bg-[#24be24] uppercase text-xs">
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>


      <apexchart ref="graficoExpandido" type="line" :options="chartOptionCombustible" :series="chartSerieCombustible"
        class="flex justify-center">
      </apexchart>
    </div>
    <div
      class="bg-white p-12 rounded-lg sm:col-span-4 sm:row-span-3 sm:col-start-7 sm:row-start-1 border-[#4e4e4e] border-t-4">
      <div class="text-left mb-6 mt-4">
        <p class="text-sm font-[500] text-gray-600 mb-2">Total de Ventas Actual</p>
        <p class="text-2xl font-bold text-black mb-4">S/. {{ totalSolesActual }}</p>
        <p class="text-sm font-[500] text-gray-600">Periodo Anterior S/. {{ totalSolesAnterior }}</p>
      </div>
      <div :class="{
        'bg-red-600': variacionPorcentual < 0,
        'bg-green-600': variacionPorcentual >= 0,
        'bg-gray-600': variacionPorcentual === 0
      }" class="rounded-2xl p-6 flex flex-col  text-white">

        <!-- Icono -->
        <div :class="{
          'bg-red-200': variacionPorcentual < 0,
          'bg-green-200': variacionPorcentual >= 0,
          'bg-gray-500': variacionPorcentual === 0
        }" class="p-4 rounded-lg mb-2 w-[70px]">
          <svg v-if="variacionPorcentual >= 0" xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-green-800"
            fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 17l-4-4-4 4m8-6l-4-4-4 4" />
          </svg>
          <svg v-else-if="variacionPorcentual < 0" xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-red-800"
            fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7l4 4 4-4m-8 6l4 4 4-4" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <circle cx="12" cy="12" r="1.5" stroke="currentColor" stroke-width="2" fill="currentColor" />
          </svg>
        </div>

        <!-- Porcentaje -->
        <p class="text-2xl font-[500] mb-2 text-right">
          {{ variacionPorcentual }}%
        </p>

        <!-- Estado textual -->
        <p class="text-sm font-[400] mb-2  text-right">
          <template v-if="variacionPorcentual >= 0">
            Aumentó: S/. {{ diferenciaTotal }}
          </template>
          <template v-else-if="variacionPorcentual < 0">
            Disminuyó: S/. {{ diferenciaTotal }}
          </template>
          <template v-else>
            Sin cambio
          </template>
        </p>
      </div>
    </div>

  </div>
</template>
<script>
import api from "../services/api";
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "LinealPage",
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    const { fechaInicioC, fechaFinC } = this.obtenerFechaActualC();
    return {
      rangoSeleccionadoC: '',
      maxDate: this.obtenerFechaMaxima(),
      mensajeErrorC: "",
      rangoFiltradoC: "",
      fechaInicioC,
      fechaFinC,
      errorMessages: {
        fechaInicioC: "",
        fechaFinC: "",
      },
      mostrarOpcionesC: false,
      botonfiltrarC: false,
      esMovil: window.innerWidth < 768,
      fechaInicioFormateada: '',
      fechaFinFormateada: '',
      ultimoFiltroInicio: null,
      ultimoFiltroFin: null,
      ultimoFiltroRapido: 'hoy',
      chartOptionCombustible: {
        chart: {
          height: 350,
          type: 'line',
          toolbar: { show: false },
          zoom: { enabled: false }
        },
        title: {
          text: '',
          align: 'left'
        },
        yaxis: {
          labels: {
            formatter: function (val) {
              return `S/. ${val.toFixed(2)}`;
            }
          }
        },
        xaxis: {
          categories: [],
        },
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter: val => `S/. ${val.toFixed(2)}`
          }
        },
        grid: {
          borderColor: '#f1f1f1',
        },
        stroke: {
          curve: 'smooth',
          width: 2
        },
        legend: {
          position: 'top',
          horizontalAlign: 'center',
          markers: {
            width: 12,
            height: 12,
            radius: 12,
          }
        }
      },
      chartSerieCombustible: [],
      intervalID: null,
    };
  },
  watch: {
    fechaInicioC() {
      if (!this.actualizandoTurno) this.actualizarRangoFiltradoC();
    },
    fechaFinC() {
      if (!this.actualizandoTurno) this.actualizarRangoFiltradoC();
    }
  },
  methods: {
    obtenerFechaMaxima() {
      const ahora = new Date();
      const año = ahora.getFullYear();
      const mes = String(ahora.getMonth() + 1).padStart(2, "0");
      const dia = String(ahora.getDate()).padStart(2, "0");
      return `${año}-${mes}-${dia}T23:59`;
    },
    /** Combustible 2 */
    formatFechaIsoCompleta(fecha) {
      const yyyy = fecha.getFullYear();
      const mm = String(fecha.getMonth() + 1).padStart(2, '0');
      const dd = String(fecha.getDate()).padStart(2, '0');
      const hh = String(fecha.getHours()).padStart(2, '0');
      const mi = String(fecha.getMinutes()).padStart(2, '0');
      const ss = String(fecha.getSeconds()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
    },
    formatFechaIsoCompletad(date, hora = '00:00:00') {
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}T${hora}`;
    },
    async filterData(fechaInicioC = null, fechaFinC = null, filtroRapido = null) {

      if (fechaInicioC === null && fechaFinC === null && filtroRapido === null) {
        fechaInicioC = this.ultimoFiltroInicio;
        fechaFinC = this.ultimoFiltroFin;
        filtroRapido = this.ultimoFiltroRapido;
      } else {
        this.ultimoFiltroInicio = fechaInicioC;
        this.ultimoFiltroFin = fechaFinC;
        this.ultimoFiltroRapido = filtroRapido;
      }

      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);

      let inicioActual, finActual, inicioAnterior, finAnterior;

      const formatDate = (fecha) => fecha.toISOString().split('T')[0];

      if (filtroRapido) {
        switch (filtroRapido) {
          case 'hoy':
            inicioActual = new Date(hoy);
            finActual = new Date(hoy);
            inicioAnterior = new Date(hoy);
            inicioAnterior.setDate(hoy.getDate() - 1);
            finAnterior = new Date(hoy);
            finAnterior.setDate(hoy.getDate() - 1);
            break;
          case 'ayer':
            inicioActual = new Date(hoy);
            inicioActual.setDate(hoy.getDate() - 1);
            finActual = new Date(inicioActual);
            inicioAnterior = new Date(hoy);
            inicioAnterior.setDate(hoy.getDate() - 2);
            finAnterior = new Date(inicioAnterior);
            break;
          case 'hace_7':
            inicioActual = new Date(hoy);
            inicioActual.setDate(hoy.getDate() - 7);
            finActual = new Date(hoy);
            finActual.setDate(hoy.getDate() - 1);
            inicioAnterior = new Date(hoy);
            inicioAnterior.setDate(hoy.getDate() - 14);
            finAnterior = new Date(hoy);
            finAnterior.setDate(hoy.getDate() - 8);
            break;
          case 'ultimo_7':
            inicioActual = new Date(hoy);
            inicioActual.setDate(hoy.getDate() - 6);
            finActual = new Date(hoy);
            inicioAnterior = new Date(hoy);
            inicioAnterior.setDate(hoy.getDate() - 13);
            finAnterior = new Date(hoy);
            finAnterior.setDate(hoy.getDate() - 7);
            break;
          case 'ultimo_14':
            inicioActual = new Date(hoy);
            inicioActual.setDate(hoy.getDate() - 13);
            finActual = new Date(hoy);
            inicioAnterior = new Date(hoy);
            inicioAnterior.setDate(hoy.getDate() - 27);
            finAnterior = new Date(hoy);
            finAnterior.setDate(hoy.getDate() - 14);
            break;
          case 'ultimo_28':
            inicioActual = new Date(hoy);
            inicioActual.setDate(hoy.getDate() - 27);
            finActual = new Date(hoy);
            inicioAnterior = new Date(hoy);
            inicioAnterior.setDate(hoy.getDate() - 55);
            finAnterior = new Date(hoy);
            finAnterior.setDate(hoy.getDate() - 28);
            break;
          case 'este_mes':
            inicioActual = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
            finActual = new Date(hoy);
            inicioAnterior = new Date(hoy.getFullYear(), hoy.getMonth() - 1, 1);
            finAnterior = new Date(hoy.getFullYear(), hoy.getMonth(), 0); // último día mes pasado
            break;
          case 'esta_semana':
            const day = hoy.getDay(); // 0=domingo, 1=lunes,...
            const diff = hoy.getDate() - day + (day === 0 ? -6 : 1); // Ajustar a lunes
            inicioActual = new Date(hoy.setDate(diff));
            finActual = new Date(inicioActual);
            finActual.setDate(inicioActual.getDate() + 6);
            inicioAnterior = new Date(inicioActual);
            inicioAnterior.setDate(inicioActual.getDate() - 7);
            finAnterior = new Date(finActual);
            finAnterior.setDate(finActual.getDate() - 7);
            break;
          case 'mes_pasado':
            inicioActual = new Date(hoy.getFullYear(), hoy.getMonth() - 1, 1);
            finActual = new Date(hoy.getFullYear(), hoy.getMonth(), 0);
            inicioAnterior = new Date(hoy.getFullYear(), hoy.getMonth() - 2, 1);
            finAnterior = new Date(hoy.getFullYear(), hoy.getMonth() - 1, 0);
            break;
          case 'semana_pasada':
            const day2 = hoy.getDay();
            const diff2 = hoy.getDate() - day2 + (day2 === 0 ? -6 : 1);
            const thisMonday = new Date(hoy.setDate(diff2));
            inicioActual = new Date(thisMonday);
            inicioActual.setDate(thisMonday.getDate() - 7);
            finActual = new Date(inicioActual);
            finActual.setDate(inicioActual.getDate() + 6);
            inicioAnterior = new Date(inicioActual);
            inicioAnterior.setDate(inicioActual.getDate() - 7);
            finAnterior = new Date(finActual);
            finAnterior.setDate(finActual.getDate() - 7);
            break;
        }
      } else {
        const fechaInicioVD = new Date(fechaInicioC);
        const fechaFinVD = new Date(fechaFinC);

        //  console.log( "dd",fechaInicioVD,fechaFinVD)

        inicioActual = new Date(fechaInicioVD);
        finActual = new Date(fechaFinVD);

        // console.log( "dd",finActual)

        const diferenciaDias = Math.ceil((fechaFinVD - fechaInicioVD) / (1000 * 60 * 60 * 24));
        //  console.log(diferenciaDias);

        if (diferenciaDias === 1) {

          const fechaInicioS = new Date(fechaInicioVD);
          const fechaFinS = new Date(fechaFinVD);
          const fechaInicioParaApis = this.formatFechaIsoCompleta(fechaInicioS);
          const fechaFinParaApis = this.formatFechaIsoCompleta(fechaFinS);

          const fechaInicioAnterior = new Date(fechaInicioVD);
          fechaInicioAnterior.setDate(fechaInicioAnterior.getDate() - 7);
          const fechaFinAnterior = new Date(fechaFinVD);
          fechaFinAnterior.setDate(fechaFinAnterior.getDate() - 7);

          const fechaInicioAnteriorApis = this.formatFechaIsoCompleta(fechaInicioAnterior);
          const fechaFinAnteriorApis = this.formatFechaIsoCompleta(fechaFinAnterior);

          const responseActual = await api.get(`/RProducto/ListadoCombustibleFechaHora?FechaInicial=${fechaInicioParaApis}&FechaFinal=${fechaFinParaApis}`);
          const dataActual = responseActual.data;

          const responseAnterior = await api.get(`/RProducto/ListadoCombustibleFechaHora?FechaInicial=${fechaInicioAnteriorApis}&FechaFinal=${fechaFinAnteriorApis}`);
          const dataAnterior = responseAnterior.data;

          this.fechaComparacionInicio = fechaInicioAnteriorApis.replace('T', ' ');
          this.fechaComparacionFin = fechaFinAnteriorApis.replace('T', ' ');

          const horas = [];
          const ventasActual = [];
          const ventasAnterior = [];

          for (let i = 0; i < 24; i++) {
            const horaEsperada = `${i.toString().padStart(2, '0')}:00`;
            horas.push(horaEsperada);

            const getHora = fechaStr => {
              const partes = fechaStr.split(' ');
              if (partes.length > 1) {
                const horaMin = partes[1].slice(0, 5);
                return horaMin;
              }
              return null;
            };

            /* const getHora = fechaStr => {
               const fecha = new Date(fechaStr);
               if (!isNaN(fecha)) {
                 return fecha.getHours().toString().padStart(2, '0') + ':00';
               }
               return fechaStr.slice(11, 16);
             };*/

            const actual = dataActual.find(d => getHora(d.fechaHora) === horaEsperada);
            const anterior = dataAnterior.find(d => getHora(d.fechaHora) === horaEsperada);

            ventasActual.push(actual ? actual.soles : 0);
            ventasAnterior.push(anterior ? anterior.soles : 0);
          }

          const totalActual = Number(ventasActual.reduce((acc, val) => acc + val, 0));
          const totalAnterior = Number(ventasAnterior.reduce((acc, val) => acc + val, 0));

          const diferencia = Number((totalActual - totalAnterior));
          const variacionPorcentual = totalAnterior === 0 ? 0 : (diferencia / totalAnterior) * 100;
          const estadoVariacion = diferencia > 0 ? 'AUMENTÓ' : diferencia < 0 ? 'DISMINUYÓ' : 'SE MANTUVO';

          this.totalSolesActual = totalActual.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          this.totalSolesAnterior = totalAnterior.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          this.diferenciaTotal = Math.abs(diferencia).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          this.estadoVariacion = estadoVariacion;
          this.variacionPorcentual = variacionPorcentual.toFixed(2);

          this.chartOptionCombustible.xaxis.categories = horas;
          this.chartSerieCombustible = [
            {
              name: 'Fecha Anterior por Horas',
              data: ventasAnterior,
              color: '#6b46c1'
            },
            {
              name: 'Fecha Actual por Horas',
              data: ventasActual,
              color: '#48bb78'
            }
          ];
          return;
        } else if (diferenciaDias === 7) {
          inicioAnterior = new Date(fechaInicioVD);
          inicioAnterior.setDate(inicioAnterior.getDate() - 7);
          finAnterior = new Date(fechaFinVD);
          finAnterior.setDate(finAnterior.getDate() - 7);
        } else if (diferenciaDias >= 28 && diferenciaDias <= 31) {
          const fechaInicioAnterior = new Date(fechaInicioVD.getFullYear(), fechaInicioVD.getMonth() - 1, 1);
          const fechaFinAnterior = new Date(fechaInicioVD.getFullYear(), fechaInicioVD.getMonth(), 0);
          inicioAnterior = fechaInicioAnterior;
          finAnterior = fechaFinAnterior;
        } else {
          inicioAnterior = new Date(fechaInicioVD);
          inicioAnterior.setDate(inicioAnterior.getDate() - diferenciaDias);
          finAnterior = new Date(fechaFinVD);
          finAnterior.setDate(finAnterior.getDate() - diferenciaDias);
        }
      }

      // console.log("hoy",inicioActual,finActual)
      const fechaInicioActualApiD = this.formatFechaIsoCompleta(inicioActual);
      const fechaFinActualApiD = this.formatFechaIsoCompleta(finActual);
      // console.log("fechass:,",fechaInicioActualApiD,fechaFinActualApiD)

      const response = await api.get(`/RProducto/ListadoCombustibleFechaDia?FechaInicial=${fechaInicioActualApiD}&FechaFinal=${fechaFinActualApiD}`);
      let data = response.data;

      // console.log(`/RProducto/ListadoCombustibleFechaDia?FechaInicial=${fechaInicioActualApiD}&FechaFinal=${fechaFinActualApiD}`)

      const fechaInicioAnteriorApiD = this.formatFechaIsoCompleta(inicioAnterior);
      const fechaFinAnteriorApiD = this.formatFechaIsoCompleta(finAnterior);

      const responseD = await api.get(`/RProducto/ListadoCombustibleFechaDia?FechaInicial=${fechaInicioAnteriorApiD}&FechaFinal=${fechaFinAnteriorApiD}`);
      let dataD = responseD.data;

      data = data.map(item => {
        const [day, month, yearAndTime] = item.fechaDocumento.split('/');
        const [year] = yearAndTime.split(' ');
        const fechaFormateada = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        return {
          ...item,
          fechaFormateada
        };
      });

      dataD = dataD.map(item => {
        const [day, month, yearAndTime] = item.fechaDocumento.split('/');
        const [year] = yearAndTime.split(' ');
        const fechaFormateada = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        return {
          ...item,
          fechaFormateada
        };
      });

      const fechaInicioAnteriorApisD = this.formatFechaIsoCompleta(inicioAnterior);
      const fechaFinAnteriorApisD = this.formatFechaIsoCompleta(finAnterior);

      this.fechaComparacionInicio = fechaInicioAnteriorApisD.replace('T', ' ');
      this.fechaComparacionFin = fechaFinAnteriorApisD.replace('T', ' ');

      const fechasActuales = [];
      const fechasAnteriores = [];

      let current = new Date(inicioActual);
      while (current <= finActual) {
        fechasActuales.push(formatDate(current));
        current.setDate(current.getDate() + 1);
      }

      current = new Date(inicioAnterior);
      while (current <= finAnterior) {
        fechasAnteriores.push(formatDate(current));
        current.setDate(current.getDate() + 1);
      }

      const maxDias = Math.max(fechasActuales.length, fechasAnteriores.length);

      const rellenarFechas = (fechas) => {
        const fechasRellenadas = [...fechas];
        while (fechasRellenadas.length < maxDias) {
          const ultimaFecha = new Date(fechasRellenadas[fechasRellenadas.length - 1]);
          ultimaFecha.setDate(ultimaFecha.getDate() + 1);
          fechasRellenadas.push(formatDate(ultimaFecha));
        }
        return fechasRellenadas;
      };

      const fechasActualesCompletas = rellenarFechas(fechasActuales);
      const fechasAnterioresCompletas = rellenarFechas(fechasAnteriores);

      const ventasActuales = fechasActualesCompletas.map(f => {
        const found = data.find(d => d.fechaFormateada === f);
        return found ? found.soles : 0;
      });

      const ventasAnteriores = fechasAnterioresCompletas.map(f => {
        const found = dataD.find(d => d.fechaFormateada === f);
        return found ? found.soles : 0;
      });

      const totalActual = Number(ventasActuales.reduce((acc, val) => acc + val, 0));
      const totalAnterior = Number(ventasAnteriores.reduce((acc, val) => acc + val, 0));

      const diferencia = Number((totalActual - totalAnterior));
      const variacionPorcentual = totalAnterior === 0 ? 0 : (diferencia / totalAnterior) * 100;
      const estadoVariacion = diferencia > 0 ? 'AUMENTÓ' : diferencia < 0 ? 'DISMINUYÓ' : 'SE MANTUVO';

      this.totalSolesActual = totalActual.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      this.totalSolesAnterior = totalAnterior.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      this.diferenciaTotal = Math.abs(diferencia).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      this.estadoVariacion = estadoVariacion;
      this.variacionPorcentual = variacionPorcentual.toFixed(2);

      this.chartOptionCombustible.xaxis.categories = fechasActualesCompletas.map(d => {
        const parts = d.split('-');
        return `${parts[2]}/${parts[1]}`;
      });

      this.chartSerieCombustible = [
        {
          name: 'Fecha Anterior por Dias',
          data: ventasAnteriores,
          color: '#6b46c1'
        },
        {
          name: 'Fecha Actual por Dias',
          data: ventasActuales,
          color: '#48bb78'
        }
      ];

    },
    aplicarRangoRapidoC(opcion) {
      this.rangoSeleccionadoC = opcion;

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
          fin = setHora(ultimoDiaMes(ahora), 23, 59);
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

      this.fechaInicioC = toLocalISO(inicio);
      this.fechaFinC = toLocalISO(fin);

      this.rangoFiltradoC = `Desde: ${this.fechaInicioC.replace("T", " ")} Hasta: ${this.fechaFinC.replace("T", " ")}`;
      this.botonfiltrarC = true;
      this.filterData(this.fechaInicioC, this.fechaFinC);
    },
    validateForm() {
      let isValid = true;
      this.errorMessages = {};

      const fechaInicioC = new Date(this.fechaInicioC);
      const fechaFinC = new Date(this.fechaFinC);

      if (!this.fechaInicioC) {
        this.errorMessages.fechaInicioC = '* El campo Fecha Inicio es obligatorio';
        isValid = false;
      }

      if (!this.fechaFinC) {
        this.errorMessages.fechaFinC = '* El campo Fecha Fin es obligatorio';
        isValid = false;
      }

      if (this.fechaInicioC && this.fechaFinC && fechaInicioC > fechaFinC) {
        this.errorMessages.fechaInicioC = '* La Fecha Inicio no puede ser posterior a la Fecha Fin';
        isValid = false;
      }

      return isValid;
    },
    obtenerFechaActualC() {
      const ahora = new Date();

      const opciones = {
        timeZone: "America/Lima",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      };

      const formatoFecha = new Intl.DateTimeFormat("es-PE", opciones).format(ahora);
      const [dia, mes, año] = formatoFecha.split("/");

      const fechaInicioC = `${año}-${mes}-${dia}T00:00:00`;
      const fechaFinC = `${año}-${mes}-${dia}T23:59:00`;

      return { fechaInicioC, fechaFinC };
    },
    actualizarRangoFiltradoC() {
      if (this.fechaInicioC && this.fechaFinC) {
        this.rangoFiltradoC = `Desdes: ${this.fechaInicioC.replace("T", " ")} Hasta: ${this.fechaFinC.replace("T", " ")}`;
      }
    },
    filtrarPorFechaC() {

      if (!this.validateForm()) return;

      let fechaInicioFormateada = this.formatearFechaISO(this.fechaInicioC);
      let fechaFinFormateada = this.formatearFechaISO(this.fechaFinC);

      if (!fechaInicioFormateada || !fechaFinFormateada) {
        console.error("Error al formatear las fechas.");
        return;
      }

      this.esTurnoActual = false;
      this.mostrarOpcionesC = false;
      this.botonfiltrarC = true,
        this.filterData(fechaInicioFormateada, fechaFinFormateada);
    },
    /** */
    formatearFechaISO(fecha) {
      let fechaObj = new Date(fecha);
      if (isNaN(fechaObj.getTime())) {
        console.error("Fecha inválida:", fecha);
        return null;
      }

      let año = fechaObj.getFullYear();
      let mes = String(fechaObj.getMonth() + 1).padStart(2, "0");
      let dia = String(fechaObj.getDate()).padStart(2, "0");
      let horas = String(fechaObj.getHours()).padStart(2, "0");
      let minutos = String(fechaObj.getMinutes()).padStart(2, "0");
      let segundos = "00"; // Forzamos los segundos a 00

      return `${año}-${mes}-${dia}T${horas}:${minutos}:${segundos}`;
    },
    async actualizarDatos() {

      if (this.botonfiltrarC) {
        let fechaInicioC = this.formatearFechaISO(this.fechaInicioC);
        let fechaFinC = this.formatearFechaISO(this.fechaFinC);
        this.filterData(fechaInicioC, fechaFinC, '');
      } else {
        this.aplicarRangoRapidoC("hoy");
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