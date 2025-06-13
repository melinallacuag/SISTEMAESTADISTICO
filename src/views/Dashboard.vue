<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-10 md:grid-rows-8 tablet:grid-rows-custom mobile:grid-rows-custom  gap-2">
    <!--mobile:grid-rows-custom-->
    <div
      class="bg-[#e4000e] p-2 text-white rounded-lg sm:col-span-2 sm:col-start-1 sm:row-start-1 flex flex-col justify-center border-r-4 gap-2">
      <p class="text-white font-semibold text-xs uppercase text-center sm:text-left">Venta de Combustible</p>
      <div class="flex space-x-3 justify-center items-center">
        <img src="../assets/iconDispensador.png" alt="" class="w-6 h-6">
        <p class="text-white font-bold text-base">S/. {{ solesCombustible }}</p>
      </div>
    </div>
    <div
      class="bg-[#ea5e00] p-2 text-white rounded-lg sm:col-span-2 sm:col-start-1 sm:row-start-2 flex flex-col justify-center border-r-4 gap-2">
      <p class="text-white font-semibold text-xs uppercase text-center sm:text-left">Venta de otros productos</p>
      <div class="flex  space-x-3 justify-center items-center">
        <img src="../assets/iconProductos.png" alt="" class="w-6 h-6">
        <p class="text-white font-bold text-base">S/. {{ solesProducto }}</p>
      </div>
    </div>
    <div
      class="bg-[#00b800] p-2 text-white rounded-lg sm:col-span-2 sm:col-start-1 sm:row-start-3 flex flex-col justify-center border-r-4 gap-2">
      <p class="text-white font-semibold text-xs uppercase text-center sm:text-left">Venta Total</p>
      <div class="flex  space-x-3 justify-center ">
        <img src="../assets/iconBolsa.png" alt="" class="w-6 h-6">
        <p class="text-white font-bold text-base">S/. {{ ventatotal }}</p>
      </div>
      <p class="text-white font-[500] text-xs text-center">Combustible y otros productos</p>
    </div>
    <div
      class="bg-[#003fcb] p-2 text-white rounded-lg sm:col-span-2 sm:col-start-1 sm:row-start-4 flex flex-col justify-center border-r-4 gap-2">
      <p class="text-white font-semibold text-xs uppercase text-center sm:text-left">Total de Abastecimiento</p>
      <div class="flex  space-x-3 justify-center items-center">
        <img src="../assets/iconVelocimetro.png" alt="" class="w-6 h-6">
        <p class="text-white font-bold text-base">{{ atencionAbastecimiento }}</p>
      </div>
      <p class="text-white font-[500] text-xs text-center">Combustible</p>
    </div>
    <div
      class="bg-[#008080] p-2 text-white rounded-lg sm:col-span-2 sm:col-start-1 sm:row-start-5 flex flex-col justify-center border-r-4 gap-2">
      <p class="text-white font-semibold text-xs uppercase text-center sm:text-left">Galones Vendidos</p>
      <div class="flex  space-x-3 justify-center ">
        <img src="../assets/iconCombustible.png" alt="" class="w-6 h-6">
        <p class="text-white font-bold text-base">{{ galonesVendidos }}</p>
      </div>
      <p class="text-white font-[500] text-xs text-center">Combustible</p>
    </div>
    <div
      class="bg-[#4330ba] p-2 text-white rounded-lg sm:col-span-2 sm:col-start-1 sm:row-start-6 flex flex-col justify-center border-r-4 gap-2">
      <p class="text-white font-semibold text-xs uppercase text-center sm:text-left">Ticket Medio</p>
      <div class="flex  space-x-3 justify-center items-center">
        <img src="../assets/iconTicket.png" alt="" class="w-6 h-6">
        <p class="text-white font-bold text-base">S/. {{ ticket }}</p>
      </div>
    </div>

    <div
      class="bg-white p-4 rounded-lg sm:col-span-3 sm:row-span-3 sm:col-start-3 sm:row-start-1 shadow-lg border-[#4e4e4e] border-t-4 relative">
      <!-- Título con icono de configuración -->
      <div class="flex justify-between items-center relative">
        <button v-if="!esMovil" @click="expandirGrafico('combustible')" class="text-gray-600 hover:text-black focus:outline-none">
          🔍
        </button>
        <div>
          <h3 class="text-center font-bold text-black uppercase text-sm flex-1">Venta de combustible</h3>
          <p  class="text-center text-xs font-[500] text-gray-600">
            {{ mostrarRango() }}
          </p>
          <div v-if="mensajeError" class="text-center text-xs font-[500] text-red-600">
            {{ mensajeError }}
          </div>
        </div>
       
        <div class="relative">
          <button @click="mostrarOpciones = !mostrarOpciones" class="text-gray-600 hover:text-black focus:outline-none">
            ⚙️
          </button>
          <div v-if="mostrarOpciones" class="absolute right-0 mt-2 w-60 bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-2">
            <div class="grid grid-cols-1 gap-1 mb-2">

              <div class="w-full overflow-x-auto scroll-delgado">
                <div class="flex gap-2 mb-2 text-xs whitespace-nowrap px-2 py-1">
                  <button @click="aplicarRangoRapido('hoy')" :class="['px-2 py-1 rounded', rangoSeleccionado === 'hoy' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Hoy</button>
                  <button @click="aplicarRangoRapido('ayer')" :class="['px-2 py-1 rounded', rangoSeleccionado === 'ayer' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Ayer</button>
                  <button @click="aplicarRangoRapido('hace_7')" :class="['px-2 py-1 rounded', rangoSeleccionado === 'hace_7' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Hace 7 días</button>
                  <button @click="aplicarRangoRapido('ultimo_7')" :class="['px-2 py-1 rounded', rangoSeleccionado === 'ultimo_7' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Últimos 7 días</button>
                  <button @click="aplicarRangoRapido('ultimo_14')" :class="['px-2 py-1 rounded',rangoSeleccionado === 'ultimo_14' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Últimos 14 días</button>
                  <button @click="aplicarRangoRapido('ultimo_28')" :class="['px-2 py-1 rounded',rangoSeleccionado === 'ultimo_28' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Últimos 28 días</button>
                  <button @click="aplicarRangoRapido('este_mes')" :class="['px-2 py-1 rounded',rangoSeleccionado === 'este_mes' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Este mes</button>
                  <button @click="aplicarRangoRapido('esta_semana')" :class="['px-2 py-1 rounded',rangoSeleccionado === 'esta_semana' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Esta semana</button>
                  <button @click="aplicarRangoRapido('mes_pasado')" :class="['px-2 py-1 rounded',rangoSeleccionado === 'mes_pasado' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Mes pasado</button>
                  <button @click="aplicarRangoRapido('semana_pasada')" :class="['px-2 py-1 rounded',rangoSeleccionado === 'semana_pasada' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Semana pasada</button>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-black">Desde:</label>
                <input type="date" v-model="fechaInicio" :max="maxDate"  class="w-full p-1 border border-gray-300 rounded mb-2">
                <p v-if="errorMessages.fechaInicio" class="text-red-500 text-xs">{{ errorMessages.fechaInicio }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-black">Hasta:</label>
                <input type="date" v-model="fechaFin" :max="maxDate"  class="w-full p-1 border border-gray-300 rounded mb-2">
                <p v-if="errorMessages.fechaFin" class="text-red-500 text-xs">{{ errorMessages.fechaFin }}</p>
              </div>
            </div>
            <div class="flex justify-end space-x-2 mt-2">
              <button @click="filtrarPorFecha" class="w-full py-2 bg-[#00a600] font-semibold text-white rounded-lg hover:bg-[#24be24] uppercase text-xs">
                Aceptar
              </button>
              <button @click="turnoActual" class="w-full py-2 bg-[#187aff] font-semibold text-white rounded-lg hover:bg-[#2776e1] uppercase text-xs">
                Turno Actual
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Gráfico -->
      <div class="relative z-10">
        <apexchart ref="graficoExpandido" type="donut" :options="chartOptions" :series="chartSeries" class="flex justify-center"></apexchart>
      </div>
    </div>
    <div
      class="bg-white p-4 rounded-lg sm:col-span-3 sm:row-span-3 sm:col-start-6 sm:row-start-1 border-[#4e4e4e] border-t-4">
      <div class="flex justify-between items-center relative">
        <button v-if="!esMovil" @click="expandirGrafico('pago')" class="text-gray-600 hover:text-black focus:outline-none">
          🔍
        </button>
        <div>
          <h3 class="text-center font-bold text-black uppercase text-sm flex-1">Venta por forma de pago</h3>
          <p  class="text-center text-xs font-[500] text-gray-600">
            {{ mostrarRangoTPago() }}
          </p>
          <div v-if="mensajeErrorTPago" class="text-center text-xs font-[500] text-red-600">
            {{ mensajeErrorTPago }}
          </div>
        </div>
        
        <div class="relative">
          <button @click="mostrarOpcionesTPago = !mostrarOpcionesTPago" class="text-gray-600 hover:text-black focus:outline-none">
            ⚙️
          </button>
          <div v-if="mostrarOpcionesTPago" class="absolute right-0 mt-2 w-60 bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-2">
            <div class="grid grid-cols-1 gap-1 mb-2">

              <div class="w-full overflow-x-auto scroll-delgado">
                <div class="flex gap-2 mb-2 text-xs whitespace-nowrap px-2 py-1">
                  <button @click="aplicarRangoRapidoTPago('hoy')" :class="['px-2 py-1 rounded', rangoSeleccionadoTpago === 'hoy' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Hoy</button>
                  <button @click="aplicarRangoRapidoTPago('ayer')" :class="['px-2 py-1 rounded', rangoSeleccionadoTpago === 'ayer' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Ayer</button>
                  <button @click="aplicarRangoRapidoTPago('hace_7')" :class="['px-2 py-1 rounded', rangoSeleccionadoTpago === 'hace_7' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Hace 7 días</button>
                  <button @click="aplicarRangoRapidoTPago('ultimo_7')" :class="['px-2 py-1 rounded', rangoSeleccionadoTpago === 'ultimo_7' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Últimos 7 días</button>
                  <button @click="aplicarRangoRapidoTPago('ultimo_14')" :class="['px-2 py-1 rounded',rangoSeleccionadoTpago === 'ultimo_14' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Últimos 14 días</button>
                  <button @click="aplicarRangoRapidoTPago('ultimo_28')" :class="['px-2 py-1 rounded',rangoSeleccionadoTpago === 'ultimo_28' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Últimos 28 días</button>
                  <button @click="aplicarRangoRapidoTPago('este_mes')" :class="['px-2 py-1 rounded',rangoSeleccionadoTpago === 'este_mes' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Este mes</button>
                  <button @click="aplicarRangoRapidoTPago('esta_semana')" :class="['px-2 py-1 rounded',rangoSeleccionadoTpago === 'esta_semana' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Esta semana</button>
                  <button @click="aplicarRangoRapidoTPago('mes_pasado')" :class="['px-2 py-1 rounded',rangoSeleccionadoTpago === 'mes_pasado' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Mes pasado</button>
                  <button @click="aplicarRangoRapidoTPago('semana_pasada')" :class="['px-2 py-1 rounded',rangoSeleccionadoTpago === 'semana_pasada' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Semana pasada</button>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-black">Desde:</label>
                <input type="date" v-model="fechaInicioTPago"  :max="maxDate" class="w-full p-1 border border-gray-300 rounded mb-2">
                <p v-if="errorMessages.fechaInicioTPago" class="text-red-500 text-xs">{{ errorMessages.fechaInicioTPago }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-black">Hasta:</label>
                <input type="date" v-model="fechaFinTPago"  :max="maxDate" class="w-full p-1 border border-gray-300 rounded mb-2">
                <p v-if="errorMessages.fechaFinTPago" class="text-red-500 text-xs">{{ errorMessages.fechaFinTPago }}</p>
              </div>
            </div>
            <div class="flex justify-end space-x-2 mt-2">
              <button @click="filtrarPorFechaTPago" class="w-full py-2 bg-[#00a600] font-semibold text-white rounded-lg hover:bg-[#24be24] uppercase text-xs">
                Aceptar
              </button>
              <button @click="turnoActualTPago" class="w-full py-2 bg-[#187aff] font-semibold text-white rounded-lg hover:bg-[#2776e1] uppercase text-xs">
                Turno Actual
              </button>
            </div>
          </div>
        </div>
      </div>
      <apexchart ref="graficoExpandido" type="donut" :options="chartOptionsTPago" :series="chartSeriesTPago" class="flex justify-center">
      </apexchart>
    </div>
    <div
      class="bg-white p-4 rounded-lg sm:col-span-3 sm:row-span-3 sm:col-start-3 sm:row-start-4 border-[#4e4e4e] border-t-4">

      <div class="flex justify-between items-center relative">
        <button v-if="!esMovil" @click="expandirGrafico('tarjetas')" class="text-gray-600 hover:text-black focus:outline-none">
          🔍
        </button>
        <div>
          <h3 class="text-center font-bold text-black uppercase text-sm flex-1">Venta por tarjetas</h3>
          <p class="text-center text-xs font-[500] text-gray-600">
              {{ mostrarRangoPT() }}
          </p>
          <div v-if="mensajeErrorPT" class="text-center text-xs font-[500] text-red-600">
            {{ mensajeErrorPT }}
          </div>
        </div>
        <div class="relative">
          <button @click="mostrarOpcionesPT = !mostrarOpcionesPT" class="text-gray-600 hover:text-black focus:outline-none">
            ⚙️
          </button>
          <div v-if="mostrarOpcionesPT" class="absolute right-0 mt-2 w-60 bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-2">
            <div class="grid grid-cols-1 gap-1 mb-2">

              <div class="w-full overflow-x-auto scroll-delgado">
                <div class="flex gap-2 mb-2 text-xs whitespace-nowrap px-2 py-1">
                  <button @click="aplicarRangoRapidoPT('hoy')" :class="['px-2 py-1 rounded', rangoSeleccionadoPT === 'hoy' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Hoy</button>
                  <button @click="aplicarRangoRapidoPT('ayer')" :class="['px-2 py-1 rounded', rangoSeleccionadoPT === 'ayer' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Ayer</button>
                  <button @click="aplicarRangoRapidoPT('hace_7')" :class="['px-2 py-1 rounded', rangoSeleccionadoPT === 'hace_7' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Hace 7 días</button>
                  <button @click="aplicarRangoRapidoPT('ultimo_7')" :class="['px-2 py-1 rounded', rangoSeleccionadoPT === 'ultimo_7' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Últimos 7 días</button>
                  <button @click="aplicarRangoRapidoPT('ultimo_14')" :class="['px-2 py-1 rounded',rangoSeleccionadoPT === 'ultimo_14' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Últimos 14 días</button>
                  <button @click="aplicarRangoRapidoPT('ultimo_28')" :class="['px-2 py-1 rounded',rangoSeleccionadoPT === 'ultimo_28' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Últimos 28 días</button>
                  <button @click="aplicarRangoRapidoPT('este_mes')" :class="['px-2 py-1 rounded',rangoSeleccionadoPT === 'este_mes' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Este mes</button>
                  <button @click="aplicarRangoRapidoPT('esta_semana')" :class="['px-2 py-1 rounded',rangoSeleccionadoPT === 'esta_semana' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Esta semana</button>
                  <button @click="aplicarRangoRapidoPT('mes_pasado')" :class="['px-2 py-1 rounded',rangoSeleccionadoPT === 'mes_pasado' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Mes pasado</button>
                  <button @click="aplicarRangoRapidoPT('semana_pasada')" :class="['px-2 py-1 rounded',rangoSeleccionadoPT === 'semana_pasada' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Semana pasada</button>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-black">Desde:</label>
                <input type="date" v-model="fechaInicioPT"  :max="maxDate" class="w-full p-1 border border-gray-300 rounded mb-2">
                <p v-if="errorMessages.fechaInicioPT" class="text-red-500 text-xs">{{ errorMessages.fechaInicioPT }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-black">Hasta:</label>
                <input type="date" v-model="fechaFinPT"  :max="maxDate" class="w-full p-1 border border-gray-300 rounded mb-2">
                <p v-if="errorMessages.fechaFinPT" class="text-red-500 text-xs">{{ errorMessages.fechaFinPT }}</p>
              </div>
            </div>
            <div class="flex justify-end space-x-2 mt-2">
              <button @click="filtrarPorFechaPT" class="w-full py-2 bg-[#00a600] font-semibold text-white rounded-lg hover:bg-[#24be24] uppercase text-xs">
                Aceptar
              </button>
              <button @click="turnoActualPT" class="w-full py-2 bg-[#187aff] font-semibold text-white rounded-lg hover:bg-[#2776e1] uppercase text-xs">
                Turno Actual
              </button>
            </div>
          </div>
        </div>
      </div>
      <apexchart ref="graficoExpandido" type="donut" :options="chartOptionsPorTarjetas" :series="chartSeriesPorTarjetas" class="flex justify-center">
      </apexchart>
    </div>
    <div
      class="bg-white p-4 rounded-lg sm:col-span-3 sm:row-span-3 sm:col-start-6 sm:row-start-4 border-[#4e4e4e] border-t-4">

      <div class="flex justify-between items-center relative">
        <button v-if="!esMovil" @click="expandirGrafico('vehiculo')" class="text-gray-600 hover:text-black focus:outline-none">
          🔍
        </button>
        <div>
          <h3 class="text-center font-bold text-black uppercase text-sm flex-1">Venta por Tipo de Vehiculo</h3>
          <p  class="text-center text-xs font-[500] text-gray-600">
                {{ mostrarRangoTV() }}
          </p>
          <div v-if="mensajeErrorTv" class="text-center text-xs font-[500] text-red-600">
            {{ mensajeErrorTv }}
          </div>
        </div>
        <div class="relative">
          <button @click="mostrarOpcionesTv = !mostrarOpcionesTv" class="text-gray-600 hover:text-black focus:outline-none">
            ⚙️
          </button>
          <div v-if="mostrarOpcionesTv" class="absolute right-0 mt-2 w-60 bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-2">
            <div class="grid grid-cols-1 gap-1 mb-2">

              <div class="w-full overflow-x-auto scroll-delgado">
                <div class="flex gap-2 mb-2 text-xs whitespace-nowrap px-2 py-1">
                  <button @click="aplicarRangoRapidoTv('hoy')" :class="['px-2 py-1 rounded', rangoSeleccionadoTv === 'hoy' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Hoy</button>
                  <button @click="aplicarRangoRapidoTv('ayer')" :class="['px-2 py-1 rounded', rangoSeleccionadoTv === 'ayer' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Ayer</button>
                  <button @click="aplicarRangoRapidoTv('hace_7')" :class="['px-2 py-1 rounded', rangoSeleccionadoTv === 'hace_7' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Hace 7 días</button>
                  <button @click="aplicarRangoRapidoTv('ultimo_7')" :class="['px-2 py-1 rounded', rangoSeleccionadoTv === 'ultimo_7' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Últimos 7 días</button>
                  <button @click="aplicarRangoRapidoTv('ultimo_14')" :class="['px-2 py-1 rounded',rangoSeleccionadoTv === 'ultimo_14' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Últimos 14 días</button>
                  <button @click="aplicarRangoRapidoTv('ultimo_28')" :class="['px-2 py-1 rounded',rangoSeleccionadoTv === 'ultimo_28' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Últimos 28 días</button>
                  <button @click="aplicarRangoRapidoTv('este_mes')" :class="['px-2 py-1 rounded',rangoSeleccionadoTv === 'este_mes' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Este mes</button>
                  <button @click="aplicarRangoRapidoTv('esta_semana')" :class="['px-2 py-1 rounded',rangoSeleccionadoTv === 'esta_semana' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Esta semana</button>
                  <button @click="aplicarRangoRapidoTv('mes_pasado')" :class="['px-2 py-1 rounded',rangoSeleccionadoTv === 'mes_pasado' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Mes pasado</button>
                  <button @click="aplicarRangoRapidoTv('semana_pasada')" :class="['px-2 py-1 rounded',rangoSeleccionadoTv === 'semana_pasada' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">Semana pasada</button>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-black">Desde:</label>
                <input type="date" v-model="fechaInicioTv"  :max="maxDate" class="w-full p-1 border border-gray-300 rounded mb-2">
                <p v-if="errorMessages.fechaInicioTv" class="text-red-500 text-xs">{{ errorMessages.fechaInicioTv }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-black">Hasta:</label>
                <input type="date" v-model="fechaFinTv"  :max="maxDate" class="w-full p-1 border border-gray-300 rounded mb-2">
                <p v-if="errorMessages.fechaFinTv" class="text-red-500 text-xs">{{ errorMessages.fechaFinTv }}</p>
              </div>
            </div>
            <div class="flex justify-end space-x-2 mt-2">
              <button @click="filtrarPorFechaTv" class="w-full py-2 bg-[#00a600] font-semibold text-white rounded-lg hover:bg-[#24be24] uppercase text-xs">
                Aceptar
              </button>
              <button @click="turnoActualTv" class="w-full py-2 bg-[#187aff] font-semibold text-white rounded-lg hover:bg-[#2776e1] uppercase text-xs">
                Turno Actual
              </button>
            </div>
          </div>
        </div>
      </div>
      <apexchart ref="graficoExpandido" type="donut" :options="chartOptionsPorVehiculo" :series="chartSeriesPorVehiculo"
        class="flex justify-center">
      </apexchart>
    </div>

    <div v-if="graficoExpandido"
      class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] z-50 p-8 bg-white shadow-lg flex flex-col items-center justify-center rounded-lg">

      <button @click="cerrarGrafico" class="absolute top-4 right-4 bg-red-500 text-white px-2 py-2 rounded">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="black" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div>
        <h3 class="text-center font-bold text-black uppercase text-sm mb-2">
          {{ graficoExpandido === 'combustible' ? 'Venta de Combustible' : graficoExpandido === 'tarjetas' ? 'Venta por Tarjetas': graficoExpandido === 'pago' ? 'Venta por Forma de Pago': graficoExpandido === 'operador' ? 'Venta por Operador':  graficoExpandido === 'vehiculo' ? 'Venta por Tipo de Vehiculo': graficoExpandido === 'combustibles' ? 'Venta de Combustible': 'Venta ' }}
        </h3>
        <p v-if="rangoFiltradoExpandido()" class="text-center text-xs font-[500] text-gray-600">
          {{rangoFiltradoExpandido()}}
        </p>
      </div>

      <div class="w-[50%] h-full flex items-center justify-center">
        <apexchart ref="graficoExpandido" type="donut"
          :options="graficoExpandido === 'combustible' ? chartOptions : graficoExpandido === 'tarjetas' ? chartOptionsPorTarjetas : graficoExpandido === 'pago' ? chartOptionsTPago :  graficoExpandido === 'operador' ? chartOptionsPorOperador : graficoExpandido === 'vehiculo' ? chartOptionsPorVehiculo  : graficoExpandido === 'combustibles' ? chartOptionCombustible : chartOptionsTPago"
          :series="graficoExpandido === 'combustible' ? chartSeries : graficoExpandido === 'tarjetas' ? chartSeriesPorTarjetas : graficoExpandido === 'pago' ? chartSeriesTPago : graficoExpandido === 'operador' ? chartSeriesPorOperador : graficoExpandido === 'vehiculo' ? chartSeriesPorVehiculo : graficoExpandido === 'combustibles' ? chartSerieCombustible : chartSeriesTPago" class="w-full h-full">
        </apexchart>
      </div>
    </div>
    <div v-for="tanque in datosTanques" :key="tanque.tankID" v-if="datosTanques.length > 0"
      :class="[' w-full sm:w-auto perspective sm:col-span-2 sm:row-span-2 sm:col-start-9 shadow-sm rounded-lg border', getColorArticuloBorde(tanque.articuloDS), getClaseTanque(tanque.tipo)]">
      <div class="relative w-full h-full transition-transform duration-700 preserve-3d"
        :class="{ 'rotate-y-180': expanded }">
        <!-- Lado Frontal -->
        <div class="absolute w-full h-full bg-[#1a1a1a] p-2 text-white rounded-lg flex flex-col backface-hidden">
          <div class="flex  justify-between items-center pb-2">
            <p class="text-white font-[400] text-sm">Capacidad: <b class="text-white font-[500] text-sm">{{
              tanque.capacidad }}L</b></p>
            <i class="fas fa-chevron-right transition-transform" :class="{ 'rotate-90': expanded }"
              @click="toggleExpand"></i>
          </div>
          <div class="relative flex flex-col items-center">
            <apexchart type="donut" :options="tanque.chartOptionsTanques" :series="tanque.chartSeriesTanques"
              class="w-full min-w-[150px] h-auto">
            </apexchart>
            <div
              class="absolute bottom-[15px] sm:bottom-[15px] mobile:bottom-[25px] mobile:bottom-[20px] flex justify-between items-center w-full flex-col">
              <p :class="['font-bold text-sm uppercase', getColorArticulo(tanque.articuloDS)]">{{ tanque.articuloDS
              }}</p>
              <div class="flex flex-row">
                <p class="text-white text-xs text-center">Volumen Actual <b class="text-white text-sm font-[500]">{{
                  tanque.volumen_Producto }}L</b></p>
                <div class="w-[3px] h-auto bg-[#fff] mx-2"></div>
                <p class="text-white text-xs text-center">Volumen Vacio <b class="text-white text-sm font-[500]">{{
                  tanque.volumen_Vacio }}L</b></p>
              </div>
            </div>
          </div>
        </div>
        <!-- Lado Trasero -->
        <div
          class="absolute w-full h-full bg-[#fff] p-2 text-[#7E7E7E] rounded-lg flex flex-col rotate-y-180 backface-hidden">
          <div class="flex justify-between items-center pb-4">
            <p :class="['font-bold text-sm uppercase', getColorArticulo(tanque.articuloDS)]">{{ tanque.articuloDS }}</p>
            <i class="fas fa-chevron-right transition-transform" :class="{ 'rotate-90': expanded }"
              @click="toggleExpand"></i>
          </div>

          <div class="flex justify-between items-center">
            <div class="left-50 flex items-center gap-2">
              <img src="../assets/iconagua.png" class="w-4" alt="iconagua">
              <p class="text-[#7E7E7E] font-[400] text-sm ">Agua:</p>
            </div>
            <p class="text-[#000] font-bold text-sm ">{{ tanque.volumen_Agua }}L</p>
          </div>
          <!-- Separador reemplazando <br> -->
          <div class="w-full h-[1px] bg-[#ccc] my-[0.3rem]"></div>

          <div class="flex justify-between items-center">
            <div class="left-50 flex items-center gap-2">
              <img src="../assets/icontemperatura.png" class="w-4" alt="iconagua">
              <p class="text-[#7E7E7E] font-[400] text-sm ">Temperatura:</p>
            </div>
            <p class="text-[#000] font-bold text-sm ">{{ tanque.temperatura }}°C</p>
          </div>
          <!-- Separador reemplazando <br> -->
          <div class="w-full h-[1px] bg-[#ccc] my-[0.3rem]"></div>

          <div class="flex justify-between items-center">
            <div class="left-50 flex items-center gap-2">
              <img src="../assets/iconalturaproducto.png" class="w-4" alt="iconagua">
              <p class="text-[#7E7E7E] font-[400] text-sm ">Altura de producto:</p>
            </div>
            <p class="text-[#000] font-bold text-sm ">{{ tanque.altura_Producto }}cm</p>
          </div>
          <!-- Separador reemplazando <br> -->
          <div class="w-full h-[1px] bg-[#ccc] my-[0.3rem]"></div>

          <div class="flex justify-between items-center">
            <div class="left-50 flex items-center gap-2">
              <img src="../assets/iconalturaagua.png" class="w-4" alt="iconagua">
              <p class="text-[#7E7E7E] font-[400] text-sm ">Altura de agua:</p>
            </div>
            <p class="text-[#000] font-bold text-sm ">{{ tanque.altura_Agua }}cm</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "../services/api";
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "UserDashboard",
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    const { fechaInicio, fechaFin } =this.obtenerFechaActual();
    const { fechaInicioTPago, fechaFinTPago } =this.obtenerFechaActualTPago();
    const { fechaInicioTv, fechaFinTv } =this.obtenerFechaActualTv();
    const { fechaInicioPT, fechaFinPT } =this.obtenerFechaActualPT();
    return {
      rangoSeleccionado: '',
      rangoSeleccionadoTpago: '',
      rangoSeleccionadoPT: '',
      rangoSeleccionadoTv: '',
      maxDate: this.obtenerFechaMaxima(),
      mensajeError: "", 
      mensajeErrorPT: "",
      mensajeErrorTPago: "",
      mensajeErrorTv: "",
      esTurnoActual: false, 
      rangoFiltrado: "", 
      rangoFiltradoTPago: "",
      rangoFiltradoPT: "",
      rangoFiltradoTv: "",
      fechaInicio, 
      fechaFin,
      fechaInicioTPago, 
      fechaFinTPago,
      fechaInicioTv, 
      fechaFinTv,
      fechaInicioPT, 
      fechaFinPT,
      errorMessages: {
        fechaInicio: "",
        fechaFin: "",
        fechaInicioTPago: "", 
        fechaFinTPago: "",
        fechaInicioTv: "", 
        fechaFinTv: "",
        fechaInicioPT: "", 
        fechaFinPT: "",
      },
      mostrarOpciones: false,
      mostrarOpcionesTPago:false,
      mostrarOpcionesTv:false,
      mostrarOpcionesPT:false,
      botonfiltrar: false,
      botonfiltrarTPago: false,
      botonfiltrarTv: false,
      botonfiltrarPT: false,
      graficoExpandido: null,
      esMovil: window.innerWidth < 768, 
      solesCombustible: "0.00",
      solesProducto: "0.00",
      ventatotal: "0.00",
      atencionAbastecimiento: "0",
      ticket: "0.00",
      galonesVendidos: "0.000",
      fechaInicioFormateada: '',
      fechaFinFormateada:'',
      ultimoFiltroInicio: null,
      ultimoFiltroFin: null,
      ultimoFiltroRapido: 'hoy',
      chartSeriesPorVehiculo:[],
      chartOptionsPorVehiculo:{
        chart: {
        //  width: 300,
          type: "donut",
        },
        plotOptions: {
          pie: {
            donut: {
              size: '80%',
              labels: {
                show: true,
                name: {
                  show: true
                },
                value: {
                  show: true,
                  color: '#000',
                  fontSize: "1rem",
                  fontWeight: "bold",
                  formatter: function (val) {
                    return `S/. ${(parseFloat(val)).toLocaleString("es-PE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                  }
                },
                total: {
                  show: true,
                  label: 'TOTAL',
                  color: '#000',
                  fontSize: '0.85rem',
                  fontWeight: 'bold',
                  formatter: function (w) {
                    const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                    return `S/. ${total.toLocaleString("es-PE", { minimumFractionDigits: 2 })}`;
                  }
                }
              }
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 300
            },
            legend: {
              position: "bottom",
            }
          }
        }]
      },
      chartSeriesPorOperador: [],
      chartOptionsPorOperador: {
        chart: {
        //  width: 300,
          type: "donut",
        },
        plotOptions: {
          pie: {
            donut: {
              size: '80%',
              labels: {
                show: true,
                name: {
                  show: true
                },
                value: {
                  show: true,
                  color: '#000',
                  fontSize: "1rem",
                  fontWeight: "bold",
                  formatter: function (val) {
                    return `S/. ${(parseFloat(val)).toLocaleString("es-PE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                  }
                },
                total: {
                  show: true,
                  label: 'TOTAL',
                  color: '#000',
                  fontSize: '0.85rem',
                  fontWeight: 'bold',
                  formatter: function (w) {
                    const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                    return `S/. ${total.toLocaleString("es-PE", { minimumFractionDigits: 2 })}`;
                  }
                }
              }
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 300
            },
            legend: {
              position: "bottom",
            }
          }
        }]
      },
      chartSeriesPorTarjetas: [],
      chartOptionsPorTarjetas: {
        chart: {
          //  width: 300,
          type: "donut",
        },
        plotOptions: {
          pie: {
            donut: {
              size: '80%',
              labels: {
                show: true,
                name: {
                  show: true
                },
                value: {
                  show: true,
                  color: '#000',
                  fontSize: "1rem",
                  fontWeight: "bold",
                  formatter: function (val) {
                    return `S/. ${(parseFloat(val)).toLocaleString("es-PE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                  }
                },
                total: {
                  show: true,
                  label: 'TOTAL',
                  color: '#000',
                  fontSize: '0.85rem',
                  fontWeight: 'bold',
                  formatter: function (w) {
                    const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                    return `S/. ${total.toLocaleString("es-PE", { minimumFractionDigits: 2 })}`;
                  }
                }
              }
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 300
            },
            legend: {
              position: "bottom",
            }
          }
        }]
      },
      chartSeriesTPago: [],
      chartOptionsTPago: {
        chart: {
        //  width: 300,
          type: "donut",
        },
        plotOptions: {
          pie: {
            donut: {
              size: '80%',
              labels: {
                show: true,
                name: {
                  show: true
                },
                value: {
                  show: true,
                  color: '#000',
                  fontSize: "1rem",
                  fontWeight: "bold",
                  formatter: function (val) {
                    return `S/. ${(parseFloat(val)).toLocaleString("es-PE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                  }
                },
                total: {
                  show: true,
                  label: 'TOTAL',
                  color: '#000',
                  fontSize: '0.85rem',
                  fontWeight: 'bold',
                  formatter: function (w) {
                    const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                    return `S/. ${total.toLocaleString("es-PE", { minimumFractionDigits: 2 })}`;
                  }
                }
              }
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 300
            },
            legend: {
              position: "bottom",
            }
          }
        }]
      },
      chartSeries: [],
      chartOptions: {
        chart: {
          //   width: 300,
          type: "donut",
        },
        plotOptions: {
          pie: {
            donut: {
              size: '80%',
              labels: {
                show: true,
                name: {
                  show: true
                },
                value: {
                  show: true,
                  color: '#000',
                  fontSize: "1rem",
                  fontWeight: "bold",
                  formatter: function (val) {
                    return `S/. ${(parseFloat(val)).toLocaleString("es-PE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                  }
                },
                total: {
                  show: true,
                  label: 'TOTAL',
                  color: '#000',
                  fontSize: '0.85rem',
                  fontWeight: 'bold',
                  formatter: function (w) {
                    const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                    return `S/. ${total.toLocaleString("es-PE", { minimumFractionDigits: 2 })}`;
                  }
                }
              }
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 300
            },
            legend: {
              position: "bottom",
            }
          }
        }]
      },
      intervalID: null,
      datosTanques: [],
      expanded: false,
    };  
  },
  watch: {
    fechaInicio() {
      if (!this.actualizandoTurno) this.actualizarRangoFiltrado();
    },
    fechaFin() {
      if (!this.actualizandoTurno) this.actualizarRangoFiltrado();
    },
    fechaInicioTPago() {
      if (!this.actualizandoTurno) this.actualizarRangoFiltradoTPago();
    },
    fechaFinTPago() {
      if (!this.actualizandoTurno) this.actualizarRangoFiltradoTPago();
    },
    fechaInicioPT() {
      if (!this.actualizandoTurno) this.actualizarRangoFiltradoPT();
    },
    fechaFinPT() {
      if (!this.actualizandoTurno) this.actualizarRangoFiltradoPT();
    },
    fechaFinTPago() {
      if (!this.actualizandoTurno) this.actualizarRangoFiltradoTPago();
    },
    fechaInicioTv() {
      if (!this.actualizandoTurno) this.actualizarRangoFiltradoTv();
    },
    fechaFinTv() {
      if (!this.actualizandoTurno) this.actualizarRangoFiltradoTv();
    },
  },
  methods: {
    mostrarRango() {
      if (this.rangoFiltrado) {
        return this.rangoFiltrado;
      } else {
        const hoy = new Date();
        const fechaHoy = hoy.toISOString().split("T")[0];
        return `Del día: ${fechaHoy}`;
      }
    },
    mostrarRangoPT() {
      if (this.rangoFiltradoPT) {
        return this.rangoFiltradoPT;
      } else {
        const hoy = new Date();
        const fechaHoy = hoy.toISOString().split("T")[0];
        return `Del día: ${fechaHoy}`;
      }
    },
    mostrarRangoTPago() {
      if (this.rangoFiltradoTPago) {
        return this.rangoFiltradoTPago;
      } else {
        const hoy = new Date();
        const fechaHoy = hoy.toISOString().split("T")[0];
        return `Del día: ${fechaHoy}`;
      }
    },
    mostrarRangoTV() {
      if (this.rangoFiltradoTv) {
        return this.rangoFiltradoTv;
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
    rangoFiltradoExpandido() {
    if (this.graficoExpandido === "combustible") {
      return this.rangoFiltrado || " ";
    } else if (this.graficoExpandido === "operador") {
      return this.rangoFiltradoOp || " ";
    } else if (this.graficoExpandido === "tarjetas") {
      return this.rangoFiltradoPT || " ";
    } else if (this.graficoExpandido === "pago") {
      return this.rangoFiltradoTPago || " ";
    } else if (this.graficoExpandido === "vehiculo") {
      return this.rangoFiltradoTv || " ";
    } else if (this.graficoExpandido === "combustibles") {
      return this.rangoFiltradoC || " ";
    }
    return " ";
    },
    expandirGrafico(tipo) {
      this.graficoExpandido = tipo;
      if (this.$refs.graficoExpandido) {
        this.$refs.graficoExpandido.updateOptions({});
      } 
    },
    cerrarGrafico() {
      this.graficoExpandido = null;
    },
    toggleExpand() {
      this.expanded = !this.expanded;
    },
    getColorArticuloBorde(articulo) {
      switch (articulo.toLowerCase()) {
        case 'diesel b5': return 'shadow-[#4e4e4e] border-[#4e4e4e]';
        case 'glp': return 'shadow-[#ffa500] border-[#ffa500]';
        case 'regular': return 'shadow-[#14da14] border-[#14da14]';
        case 'regular 1': return 'shadow-[#14da14] border-[#14da14]';
        case 'regular 2': return 'shadow-[#14da14] border-[#14da14]';
        case 'premium': return 'shadow-[#008cff] border-[#008cff]';
        case 'premium 1': return 'shadow-[#008cff] border-[#008cff]';
        case 'premium 2': return 'shadow-[#008cff] border-[#008cff]';
        case 'urea': return 'shadow-[#4bc0c0] border-[#4bc0c0]';
        default: return 'shadow-[#4bc0c0] border-[#4bc0c0]';
      }
    },
    getColorArticulo(articulo) {
      switch (articulo.toLowerCase()) {
        case 'diesel b5': return 'text-[#4e4e4e]';
        case 'glp': return 'text-[#ffa500]';
        case 'regular': return 'text-[#14da14]';
        case 'regular 1': return 'text-[#14da14]';
        case 'regular 2': return 'text-[#14da14]';
        case 'premium': return 'text-[#008cff]';
        case 'premium 1': return 'text-[#008cff]';
        case 'premium 2': return 'text-[#008cff]';
        case 'urea': return 'text-[#4bc0c0]';
        default: return 'text-[#4bc0c0]';
      }
    },
    getClaseTanque(tipo) {
      switch (tipo) {
        case 'diesel b5': return 'sm:row-start-1';
        case 'glp': return 'sm:row-start-3';
        case 'regular': return 'sm:row-start-5';
        case 'premium': return 'sm:row-start-7';
        case 'urea': return 'sm:row-start-9';
        default: return '';
      }
    },
    getColorHexArticulo(articulo) {
      switch (articulo.toLowerCase()) {
        case 'diesel b5': return '#4e4e4e';
        case 'glp': return '#ffa500';
        case 'regular': return '#14da14';
        case 'regular 1': return '#14da14';
        case 'regular 2': return '#14da14';
        case 'premium': return '#008cff';
        case 'premium 1': return '#008cff';
        case 'premium 2': return '#008cff';
        case 'urea': return '#4bc0c0';
        default: return '#4bc0c0';
      }
    },
    async obtenerDatosTanques() {
      try {
        const response = await api.get(`/rtanques/listadodsb`);
        const data = response.data;

        if (response.status === 200 && Array.isArray(data) && data.length > 0) {

          this.datosTanques = data.map(tanque => {

            const colorArticulo = this.getColorHexArticulo(tanque.articuloDS);

            return {
              tankID: tanque.tankID,
              articuloDS: tanque.articuloDS,
              capacidad: tanque.capacidad,
              volumen_Producto: tanque.volumen_Producto,
              volumen_Vacio: tanque.volumen_Vacio,
              temperatura: tanque.temperatura,
              altura_Producto: tanque.altura_Producto,
              altura_Agua: tanque.altura_Agua,
              volumen_Agua: tanque.volumen_Agua,
              chartSeriesTanques: [tanque.volumen_Producto, tanque.volumen_Vacio],
              chartOptionsTanques: {
                chart: {
                  type: "donut",
                  background: "transparent",
                },
                labels: ["Volumen Actual", "Volumen Vacio"],
                colors: [colorArticulo, "#232323"],
                plotOptions: {
                  pie: {
                    startAngle: -90,
                    endAngle: 90,
                    expandOnClick: false,
                    donut: {
                      size: '30%',
                      labels: {
                        show: false,
                      }
                    }
                  }
                },
                stroke: {
                  show: false,
                },
                dataLabels: {
                  enabled: true,
                  formatter: function (val) {
                    return val.toFixed(1) + "%";
                  },
                  style: {
                    fontSize: '12px',
                    fontWeight: '500',
                    colors: ['#fff']
                  }
                },
                legend: {
                  display: false,
                  show: false
                },
                tooltip: {
                  enabled: true,
                  theme: "dark",
                  style: {
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "#fff",
                  },
                  fillSeriesColor: false,
                  y: {
                    formatter: function (val) {
                      return val + " L";
                    },
                    title: {
                      formatter: function (seriesName) {
                        return seriesName + ": ";
                      },
                    },
                  },
                  marker: {
                    show: true,
                    fillColors: [colorArticulo, "#000"],
                  },
                },
              }
            };
          });

        } else {
          this.datosTanques = [];
          console.warn("No hay datos disponibles de los tanques.");
        }
      } catch (error) {
        console.error("Error al obtener datos de la API:", error);
      }
    },
    /** Combustible */
    async obtenerDatosCombustible() {
      try {

        const response = await api.get(`/RProducto/ListadoDSb`);
        const data = response.data;

        if (!data || !Array.isArray(data) || data.length === 0) {
          this.chartSeries = [];
          this.chartOptions = {
            labels: [],
            colors: [],
            legend: { show: false },
            tooltip: { enabled: false }
          };
          this.cantidad = 0;
          this.soles = 0;
          this.mensajeError = "No se encontraron datos.";
          return;
        }

        this.mensajeError = "";

        const colorMapping = {
          'DIESEL B5': '#595959',
          'GLP': '#ffa500',
          'G-REGULAR': '#14da14',
          'G-PREMIUM': '#008cff',
          'UREA': '#ff4081'
        };

        const totalSoles = data.reduce((sum, item) => sum + item.soles, 0);
        data.sort((a, b) => b.soles - a.soles);
        const nombresProductos = data.map(item => item.articuloDS);
        const porcentajes = data.map(item => ((item.soles / totalSoles) * 100).toFixed(2));

        this.chartSeries = data.map((item) => item.soles);
        this.chartOptions = {
          ...this.chartOptions,
          labels: nombresProductos,
          colors: data.map((item) => colorMapping[item.articuloDS] || '#3b3b3b'),
          legend: {
            position: "bottom",
            horizontalAlign: "center",
            show: true,
            formatter: function (seriesName, opts) {
              const color = colorMapping[seriesName] || '#3b3b3b';
              return `<span style="color: ${color};" class="font-bold text-xs">${seriesName}<span class="text-black ml-1">${porcentajes[opts.seriesIndex]}%</span></span>`;
            }
          },
          tooltip: {
            enabled: true,
            custom: function ({ series, seriesIndex, w }) {
              return `<div class="text-white font-bold p-2 bg-[#000000c7] text-xs rounded-lg">
                  <span class="font-semibold">${w.globals.labels[seriesIndex]}:</span>
                  <span class="font-bold"> S/. ${series[seriesIndex].toLocaleString("es-PE", { minimumFractionDigits: 2 })}</span>
                </div>`;
            }
          }
        };

        this.cantidad = data.reduce((sum, item) => sum + item.cantidad, 0);
        this.soles = totalSoles;

      } catch (error) {
        console.error("Error al obtener datos de la API:", error);
        this.chartSeries = [];
        this.chartOptions = {
          labels: [],
          colors: [],
          legend: { show: false },
          tooltip: { enabled: false }
        };
        this.cantidad = 0;
        this.soles = 0;
      }
    },
    async obtenerDatosCombustibleFiltro(fechaInicio = null,fechaFin = null) {
      try {

        this.mensajeError = ""; 

        const response = await api.get(`/RProducto/ListadoDSBFE?FechaInicial=${fechaInicio}&FechaFinal=${fechaFin}`);
        const data = response.data;

       /**  const responseSinFiltro = await api.get(`/RProducto/ListadoDSb`);
        const dataSinFiltro = responseSinFiltro.data;

        if (!dataSinFiltro || !Array.isArray(dataSinFiltro) || dataSinFiltro.length === 0) {
          this.chartSeries = [];
              this.chartOptions = {
                labels: [],
                colors: [],
                legend: { show: false },
                tooltip: { enabled: false }
              };
              this.cantidad = 0;
              this.soles = 0;
              return;
        }**/

        if (!data || !Array.isArray(data) || data.length === 0) {
          this.chartSeries = [];
          this.chartOptions = {
            labels: [],
            colors: [],
            legend: { show: false },
            tooltip: { enabled: false }
          };
          this.cantidad = 0;
          this.soles = 0;
          this.mensajeError = "No se encontraron datos en el rango seleccionado.";
          return;
        }

        this.mensajeError = "";

        const colorMapping = {
          'DIESEL B5': '#595959',
          'GLP': '#ffa500',
          'G-REGULAR': '#14da14',
          'G-PREMIUM': '#008cff',
          'UREA': '#ff4081'
        };

        const totalSoles = data.reduce((sum, item) => sum + item.soles, 0);
        data.sort((a, b) => b.soles - a.soles);
        const nombresProductos = data.map(item => item.articuloDS);
        const porcentajes = data.map(item => ((item.soles / totalSoles) * 100).toFixed(2));

        this.chartSeries = data.map((item) => item.soles);
        this.chartOptions = {
          ...this.chartOptions,
          labels: nombresProductos,
          colors: data.map((item) => colorMapping[item.articuloDS] || '#3b3b3b'),
          legend: {
            position: "bottom",
            horizontalAlign: "center",
            show: true,
            formatter: function (seriesName, opts) {
              const color = colorMapping[seriesName] || '#3b3b3b';
              return `<span style="color: ${color};" class="font-bold text-xs">${seriesName}<span class="text-black ml-1">${porcentajes[opts.seriesIndex]}%</span></span>`;
            }
          },
          tooltip: {
            enabled: true,
            custom: function ({ series, seriesIndex, w }) {
              return `<div class="text-white font-bold p-2 bg-[#000000c7] text-xs rounded-lg">
                  <span class="font-semibold">${w.globals.labels[seriesIndex]}:</span>
                  <span class="font-bold"> S/. ${series[seriesIndex].toLocaleString("es-PE", { minimumFractionDigits: 2 })}</span>
                </div>`;
            }
          }
        };

        this.cantidad = data.reduce((sum, item) => sum + item.cantidad, 0);
        this.soles = totalSoles;

      } catch (error) {
        console.error("Error al obtener datos de la API:", error);
        this.chartSeries = [];
        this.chartOptions = {
          labels: [],
          colors: [],
          legend: { show: false },
          tooltip: { enabled: false }
        };
        this.cantidad = 0;
        this.soles = 0;
       // this.mensajeError = "Hubo un error al obtener los datos. Inténtelo nuevamente.";
      }
    },
    validateForm(){
      let isValid = true;
      this.errorMessages = {};

      const fechaInicio = new Date(this.fechaInicio);
      const fechaFin = new Date(this.fechaFin);

      if (!this.fechaInicio) {
        this.errorMessages.fechaInicio = '* El campo Fecha Inicio es obligatorio';
        isValid = false;
      }

      if (!this.fechaFin) {
        this.errorMessages.fechaFin = '* El campo Fecha Fin es obligatorio';
        isValid = false;
      }

      if (this.fechaInicio && this.fechaFin && fechaInicio > fechaFin) {
        this.errorMessages.fechaInicio = '* La Fecha Inicio no puede ser posterior a la Fecha Fin';
        isValid = false;
      }

      return isValid;
    },
    obtenerFechaActual() {
      const ahora = new Date();
      
      const opciones = {
        timeZone: "America/Lima",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    };

    const formatoFecha = new Intl.DateTimeFormat("es-PE", opciones).format(ahora);
    const [dia, mes, año] = formatoFecha.split("/");

    const fechaInicio = `${año}-${mes}-${dia}`;
    const fechaFin = `${año}-${mes}-${dia}`;

    return { fechaInicio, fechaFin };
    },
    turnoActual() {
      this.mostrarOpciones = false; 
      this.botonfiltrar = false;

      this.actualizandoTurno = true;

      const { fechaInicio, fechaFin } = this.obtenerFechaActual();

      this.fechaInicio = fechaInicio;
      this.fechaFin = fechaFin;

      this.esTurnoActual = true;
      this.rangoFiltrado = '';
      this.obtenerDatosCombustible();

      this.$nextTick(() => {
        this.actualizandoTurno = false; // desactivamos después del update
      });
    },
    actualizarRangoFiltrado() {
      if (this.fechaInicio && this.fechaFin) {
        this.rangoFiltrado = `Desde: ${this.fechaInicio.replace("T", " ")} Hasta: ${this.fechaFin.replace("T", " ")}`;
      }
    },
    filtrarPorFecha() {

      if (!this.validateForm()) return;

      let fechaInicioFormateada = this.fechaInicio;
      let fechaFinFormateada = this.fechaFin;

      if (!fechaInicioFormateada || !fechaFinFormateada) {
          console.error("Error al formatear las fechas.");
          return;
      }

      this.esTurnoActual = false;
      this.mostrarOpciones = false; 
      this.botonfiltrar = true,
      this.obtenerDatosCombustibleFiltro(fechaInicioFormateada, fechaFinFormateada);
    },
    aplicarRangoRapido(opcion) {
      this.rangoSeleccionado = opcion;

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

      this.fechaInicio = formatDate(inicio);
      this.fechaFin = formatDate(fin);

      this.rangoFiltrado = `Desde: ${this.fechaInicio} Hasta: ${this.fechaFin}`;
      this.botonfiltrar = true;
      this.filterData(this.fechaInicio, this.fechaFin);
    },
    /** Forma de Pago*/
    async obtenerDatosFormaPago() {
      try {
        const response = await api.get(`/rpago/listadodsb`);
        const data = response.data;

        if (!data || !Array.isArray(data) || data.length === 0 || data.every(item => item.soles === 0)) {
          this.chartSeriesTPago = [];
          this.chartOptionsTPago = {
            labels: [],
            colors: [],
            legend: { show: false },
            tooltip: { enabled: false }
          };
          this.soles = 0;
          this.mensajeErrorTPago = "No se encontraron datos.";
          return;
        }

        this.mensajeErrorTPago ="";

        const totalSoles = data.reduce((sum, item) => sum + item.soles, 0);
        data.sort((a, b) => b.soles - a.soles);
        const coloresPredefinidos = ["#187aff", "#ff1414", "#01b504", "#ffa500"];
        const datosFiltradosT = data.filter(item => item.soles > 0);

        const nombresProductos = datosFiltradosT.map(item =>
          item.names === "TARJETA DE CREDITO" ? "T. CREDITO" : item.names
        );
        const porcentajes = datosFiltradosT.map(item => ((item.soles / totalSoles) * 100).toFixed(2));

        const coloresAsignados = {};
        nombresProductos.forEach((nombre, index) => {
          coloresAsignados[nombre] = coloresPredefinidos[index % coloresPredefinidos.length];
        });

        this.chartSeriesTPago = datosFiltradosT.map((item) => item.soles);
        this.chartOptionsTPago = {
          ...this.chartOptionsTPago,
          labels: nombresProductos,
          colors: nombresProductos.map(nombre => coloresAsignados[nombre]),
          legend: {
            position: "bottom",
            horizontalAlign: "center",
            show: true,
            formatter: function (seriesName, opts) {
              const color = coloresAsignados[seriesName] || '#3b3b3b';
              return `<span style="color: ${color};" class="font-bold text-xs">${seriesName}<span class="text-black ml-1">${porcentajes[opts.seriesIndex]}%</span></span>`;
            }
          },
          tooltip: {
            enabled: true,
            custom: function ({ series, seriesIndex, w }) {
              return `<div class="text-white font-bold p-2 bg-[#000000c7] text-xs rounded-lg">
                  <span class="font-semibold">${w.globals.labels[seriesIndex]}:</span>
                  <span class="font-bold"> S/. ${series[seriesIndex].toLocaleString("es-PE", { minimumFractionDigits: 2 })}</span>
                </div>`;
            }
          }
        };

      } catch (error) {
        console.error("Error al obtener datos de la API:", error);
        this.chartSeriesTPago = [];
        this.chartOptionsTPago = {
          labels: [],
          colors: [],
          legend: { show: false },
          tooltip: { enabled: false }
        };
        this.soles = 0;
        this.mensajeErrorTPago = "No se encontraron datos.";
      }
    },
    async obtenerDatosFormaPagoFiltro(fechaInicioTPago = null,fechaFinTPago = null) {
      try {
        const response = await api.get(`/rpago/ListadoDSBFE?FechaInicial=${fechaInicioTPago}&FechaFinal=${fechaFinTPago}`);
        const data = response.data;

        if (!data || !Array.isArray(data) || data.length === 0  || data.every(item => item.soles === 0)) {
          this.chartSeriesTPago = [];
          this.chartOptionsTPago = {
            labels: [],
            colors: [],
            legend: { show: false },
            tooltip: { enabled: false }
          };
          this.soles = 0;
          this.mensajeErrorTPago = "No se encontraron datos en el rango seleccionado.";
          return;
        }

        this.mensajeErrorTPago =""; 

        const totalSoles = data.reduce((sum, item) => sum + item.soles, 0);
        data.sort((a, b) => b.soles - a.soles);
        const coloresPredefinidos = ["#187aff", "#ff1414", "#01b504", "#ffa500"];
        const datosFiltradosT = data.filter(item => item.soles > 0);

        const nombresProductos = datosFiltradosT.map(item =>
          item.names === "TARJETA DE CREDITO" ? "T. CREDITO" : item.names
        );
        const porcentajes = datosFiltradosT.map(item => ((item.soles / totalSoles) * 100).toFixed(2));

        const coloresAsignados = {};
        nombresProductos.forEach((nombre, index) => {
          coloresAsignados[nombre] = coloresPredefinidos[index % coloresPredefinidos.length];
        });

        this.chartSeriesTPago = datosFiltradosT.map((item) => item.soles);
        this.chartOptionsTPago = {
          ...this.chartOptionsTPago,
          labels: nombresProductos,
          colors: nombresProductos.map(nombre => coloresAsignados[nombre]),
          legend: {
            position: "bottom",
            horizontalAlign: "center",
            show: true,
            formatter: function (seriesName, opts) {
              const color = coloresAsignados[seriesName] || '#3b3b3b';
              return `<span style="color: ${color};" class="font-bold text-xs">${seriesName}<span class="text-black ml-1">${porcentajes[opts.seriesIndex]}%</span></span>`;
            }
          },
          tooltip: {
            enabled: true,
            custom: function ({ series, seriesIndex, w }) {
              return `<div class="text-white font-bold p-2 bg-[#000000c7] text-xs rounded-lg">
                  <span class="font-semibold">${w.globals.labels[seriesIndex]}:</span>
                  <span class="font-bold"> S/. ${series[seriesIndex].toLocaleString("es-PE", { minimumFractionDigits: 2 })}</span>
                </div>`;
            }
          }
        };

      } catch (error) {
        console.error("Error al obtener datos de la API:", error);
        this.chartSeriesTPago = [];
        this.chartOptionsTPago = {
          labels: [],
          colors: [],
          legend: { show: false },
          tooltip: { enabled: false }
        };
        this.soles = 0;
      //  this.mensajeErrorTPago = "Hubo un error al obtener los datos. Inténtelo nuevamente.";
      }
    },
    validateFormTPago(){
      let isValid = true;
      this.errorMessages = {};

      const fechaInicioTPago = new Date(this.fechaInicioTPago);
      const fechaFinTPago = new Date(this.fechaFinTPago);

      if (!this.fechaInicioTPago) {
        this.errorMessages.fechaInicioTPago = '* El campo Fecha Inicio es obligatorio';
        isValid = false;
      }

      if (!this.fechaFinTPago) {
        this.errorMessages.fechaFinTPago = '* El campo Fecha Fin es obligatorio';
        isValid = false;
      }

      if (this.fechaInicioTPago && this.fechaFinTPago && fechaInicioTPago > fechaFinTPago) {
        this.errorMessages.fechaInicioTPago = '* La Fecha Inicio no puede ser posterior a la Fecha Fin';
        isValid = false;
      }

      return isValid;
    },
    obtenerFechaActualTPago() {
      const ahora = new Date();
      
      const opciones = {
        timeZone: "America/Lima",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    };

    const formatoFecha = new Intl.DateTimeFormat("es-PE", opciones).format(ahora);
    const [dia, mes, año] = formatoFecha.split("/");

    const fechaInicioTPago = `${año}-${mes}-${dia}`;
    const fechaFinTPago = `${año}-${mes}-${dia}`;

    return { fechaInicioTPago, fechaFinTPago };
    },
    turnoActualTPago() {
      this.mostrarOpcionesTPago = false; 
      this.botonfiltrarTPago = false

      this.actualizandoTurno = true;

      const { fechaInicioTPago, fechaFinTPago } = this.obtenerFechaActualTPago();

      this.fechaInicioTPago = fechaInicioTPago;
      this.fechaFinTPago = fechaFinTPago;
      
      this.esTurnoActual = true;
      this.rangoFiltradoTPago = '';

      this.obtenerDatosFormaPago();

      this.$nextTick(() => {
        this.actualizandoTurno = false;
      });
    },
    actualizarRangoFiltradoTPago() {
      if (this.fechaInicioTPago && this.fechaFinTPago) {
        this.rangoFiltradoTPago = `Desde: ${this.fechaInicioTPago.replace("T", " ")} Hasta: ${this.fechaFinTPago.replace("T", " ")}`;
      }
    },
    filtrarPorFechaTPago() {

      if (!this.validateFormTPago()) return;

      let fechaInicioFormateadaTPago = this.fechaInicioTPago;
      let fechaFinFormateadaTPago = this.fechaFinTPago;

      if (!fechaInicioFormateadaTPago || !fechaFinFormateadaTPago) {
          console.error("Error al formatear las fechas.");
          return;
      }

      this.esTurnoActual = false;

      this.mostrarOpcionesTPago = false; 
      this.botonfiltrarTPago = true,
      this.obtenerDatosFormaPagoFiltro(fechaInicioFormateadaTPago, fechaFinFormateadaTPago);

    },
    aplicarRangoRapidoTPago(opcion) {
      this.rangoSeleccionadoTpago = opcion;

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

      this.fechaInicioTPago = formatDate(inicio);
      this.fechaFinTPago = formatDate(fin);

      this.rangoFiltradoTPago = `Desde: ${this.fechaInicioTPago} Hasta: ${this.fechaFinTPago}`;
      this.botonfiltrarTPago = true;
      this.filterData(this.fechaInicioTPago, this.fechaFinTPago);
    },
    /** Por Tarjetas */
    async obtnerDatosPorTarjetas() {
      try {
        const response = await api.get(`/rtarjeta/listadodsb`);
        const data = response.data;

        if (!data || !Array.isArray(data) || data.length === 0) {
          this.chartSeriesPorTarjetas = [];
          this.chartOptionsPorTarjetas = {
            labels: [],
            colors: [],
            legend: { show: false },
            tooltip: { enabled: false }
          };
          this.soles = 0;
          this.mensajeErrorPT = "No se encontraron datos.";
          return;
        }
        this.mensajeErrorPT = "";

        const coloresPredefinidos = ["#008080", "#ff1414", "#01b504", "#ffa500", "#800080", "#964B00", "#187aff", "#dfc205", "#ff00ff", "#000000"];

        const agrupado = data.reduce((acc, item) => {
          if (!acc[item.tipo]) {
            acc[item.tipo] = { tipo: item.tipo, soles: 0 };
          }
          acc[item.tipo].soles += item.soles;
          return acc;
        }, {});

        const datosAgrupados = Object.values(agrupado).sort((a, b) => b.soles - a.soles);

        const totalSoles = datosAgrupados.reduce((sum, item) => sum + item.soles, 0);
        const nombresTipo = datosAgrupados.map(item => item.tipo);
        const porcentajes = datosAgrupados.map(item => ((item.soles / totalSoles) * 100).toFixed(2));

        const coloresAsignados = {};
        nombresTipo.forEach((nombre, index) => {
          coloresAsignados[nombre] = coloresPredefinidos[index % coloresPredefinidos.length];
        });

        this.chartSeriesPorTarjetas = datosAgrupados.map((item) => item.soles);
        this.chartOptionsPorTarjetas = {
          ...this.chartOptionsPorTarjetas,
          labels: nombresTipo,
          colors: nombresTipo.map(nombre => coloresAsignados[nombre]),
          legend: {
            position: "bottom",
            horizontalAlign: "center",
            show: true,
            formatter: function (seriesName, opts) {
              const color = coloresAsignados[seriesName] || '#3b3b3b';
              return `<span style="color: ${color};" class="font-bold text-xs">${seriesName}<span class="text-black ml-1">${porcentajes[opts.seriesIndex]}%</span></span>`;
            }
          },
          tooltip: {
            enabled: true,
            custom: function ({ series, seriesIndex, w }) {
              return `<div class="text-white font-bold p-2 bg-[#000000c7] text-xs rounded-lg">
                  <span class="font-semibold">${w.globals.labels[seriesIndex]}:</span>
                  <span class="font-bold"> S/. ${series[seriesIndex].toLocaleString("es-PE", { minimumFractionDigits: 2 })}</span>
                </div>`;
            }
          }
        };

      } catch (error) {
        console.error("Error al obtener datos de la API:", error);
        this.chartSeries = [];
        this.chartOptions = {
          labels: [],
          colors: [],
          legend: { show: false },
          tooltip: { enabled: false }
        };
        this.soles = 0;
        this.mensajeErrorPT = "No se encontraron datos.";
      }
    },
    async obtnerDatosPorTarjetasFiltro(fechaInicioPT = null,fechaFinPT = null) {
      try {
        const response = await api.get(`/rtarjeta/ListadoDSBFE?FechaInicial=${fechaInicioPT}&FechaFinal=${fechaFinPT}`);
        const data = response.data;

      /*  const responseFiltroPT = await api.get(`/rtarjeta/listadodsb`);
        const dataFiltroPT = responseFiltroPT.data;

        if (!dataFiltroPT || !Array.isArray(dataFiltroPT) || dataFiltroPT.length === 0) {
          this.chartSeriesPorTarjetas = [];
          this.chartOptionsPorTarjetas = {
            labels: [],
            colors: [],
            legend: { show: false },
            tooltip: { enabled: false }
          };
          this.soles = 0;
          return;
        }*/

        if (!data || !Array.isArray(data) || data.length === 0) {
          this.chartSeriesPorTarjetas = [];
          this.chartOptionsPorTarjetas = {
            labels: [],
            colors: [],
            legend: { show: false },
            tooltip: { enabled: false }
          };
          this.soles = 0;
          this.mensajeErrorPT = "No se encontraron datos en el rango seleccionado.";
          return;
        }

        this.mensajeErrorPT = "";

        const coloresPredefinidos = ["#008080", "#ff1414", "#01b504", "#ffa500", "#800080", "#964B00", "#187aff", "#dfc205", "#ff00ff", "#000000"];

        const agrupado = data.reduce((acc, item) => {
          if (!acc[item.tipo]) {
            acc[item.tipo] = { tipo: item.tipo, soles: 0 };
          }
          acc[item.tipo].soles += item.soles;
          return acc;
        }, {});

        const datosAgrupados = Object.values(agrupado).sort((a, b) => b.soles - a.soles);

        const totalSoles = datosAgrupados.reduce((sum, item) => sum + item.soles, 0);
        const nombresTipo = datosAgrupados.map(item => item.tipo);
        const porcentajes = datosAgrupados.map(item => ((item.soles / totalSoles) * 100).toFixed(2));

        const coloresAsignados = {};
        nombresTipo.forEach((nombre, index) => {
          coloresAsignados[nombre] = coloresPredefinidos[index % coloresPredefinidos.length];
        });

        this.chartSeriesPorTarjetas = datosAgrupados.map((item) => item.soles);
        this.chartOptionsPorTarjetas = {
          ...this.chartOptionsPorTarjetas,
          labels: nombresTipo,
          colors: nombresTipo.map(nombre => coloresAsignados[nombre]),
          legend: {
            position: "bottom",
            horizontalAlign: "center",
            show: true,
            formatter: function (seriesName, opts) {
              const color = coloresAsignados[seriesName] || '#3b3b3b';
              return `<span style="color: ${color};" class="font-bold text-xs">${seriesName}<span class="text-black ml-1">${porcentajes[opts.seriesIndex]}%</span></span>`;
            }
          },
          tooltip: {
            enabled: true,
            custom: function ({ series, seriesIndex, w }) {
              return `<div class="text-white font-bold p-2 bg-[#000000c7] text-xs rounded-lg">
                  <span class="font-semibold">${w.globals.labels[seriesIndex]}:</span>
                  <span class="font-bold"> S/. ${series[seriesIndex].toLocaleString("es-PE", { minimumFractionDigits: 2 })}</span>
                </div>`;
            }
          }
        };

      } catch (error) {
        console.error("Error al obtener datos de la API:", error);
        this.chartSeries = [];
        this.chartOptions = {
          labels: [],
          colors: [],
          legend: { show: false },
          tooltip: { enabled: false }
        };
        this.soles = 0;
        this.mensajeErrorPT =  "Hubo un error al obtener los datos. Inténtelo nuevamente.";
      }
    },
    validateFormPT(){
      let isValid = true;
      this.errorMessages = {};

      const fechaInicioPT = new Date(this.fechaInicioPT);
      const fechaFinPT = new Date(this.fechaFinPT);

      if (!this.fechaInicioPT) {
        this.errorMessages.fechaInicioPT = '* El campo Fecha Inicio es obligatorio';
        isValid = false;
      }

      if (!this.fechaFinPT) {
        this.errorMessages.fechaFinPT = '* El campo Fecha Fin es obligatorio';
        isValid = false;
      }

      if (this.fechaInicioPT && this.fechaFinPT && fechaInicioPT > fechaFinPT) {
        this.errorMessages.fechaInicioPT = '* La Fecha Inicio no puede ser posterior a la Fecha Fin';
        isValid = false;
      }

      return isValid;
    },
    obtenerFechaActualPT() {
      const ahora = new Date();
      
      const opciones = {
        timeZone: "America/Lima",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    };

    const formatoFecha = new Intl.DateTimeFormat("es-PE", opciones).format(ahora);
    const [dia, mes, año] = formatoFecha.split("/");

    const fechaInicioPT = `${año}-${mes}-${dia}`;
    const fechaFinPT = `${año}-${mes}-${dia}`;

    return { fechaInicioPT, fechaFinPT };
    },
    turnoActualPT() {
      this.mostrarOpcionesPT = false; 
      this.botonfiltrarPT = false;

      this.actualizandoTurno = true;

      const { fechaInicioPT, fechaFinPT } = this.obtenerFechaActualPT();

      this.fechaInicioPT = fechaInicioPT;
      this.fechaFinPT = fechaFinPT;

      
      this.esTurnoActual = true;
      this.rangoFiltradoPT = '';

      this.obtnerDatosPorTarjetas();

      this.$nextTick(() => {
        this.actualizandoTurno = false;
      });
    },
    actualizarRangoFiltradoPT() {
      if (this.fechaInicioPT && this.fechaFinPT) {
        this.rangoFiltradoPT = `Desde: ${this.fechaInicioPT.replace("T", " ")} Hasta: ${this.fechaFinPT.replace("T", " ")}`;
      }
    },
    filtrarPorFechaPT() {

      if (!this.validateFormPT()) return;

      let fechaInicioFormateadaPT = this.fechaInicioPT;
      let fechaFinFormateadaPT = this.fechaFinPT;

      if (!fechaInicioFormateadaPT || !fechaFinFormateadaPT) {
          console.error("Error al formatear las fechas.");
          return;
      }

      this.esTurnoActual = false;
      this.mostrarOpcionesPT = false; 
      this.botonfiltrarPT = true;
      this.obtnerDatosPorTarjetasFiltro(fechaInicioFormateadaPT, fechaFinFormateadaPT);

    },
    aplicarRangoRapidoPT(opcion) {
      this.rangoSeleccionadoPT = opcion;

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

      this.fechaInicioPT = formatDate(inicio);
      this.fechaFinPT = formatDate(fin);

      this.rangoFiltradoPT = `Desde: ${this.fechaInicioPT} Hasta: ${this.fechaFinPT}`;
      this.botonfiltrarPT = true;
      this.filterData(this.fechaInicioPT, this.fechaFinPT);
    },
    /** Tipo Vehiculo */
    async obtnerDatosPorVehiculo() {
      try {
        const response = await api.get(`/RVehiculo/ListadoDSB`);
        const data = response.data;

        if (!data || !Array.isArray(data) || data.length === 0) {
          this.chartSeriesPorVehiculo = [];
          this.chartOptionsPorVehiculo = {
            labels: [],
            colors: [],
            legend: { show: false },
            tooltip: { enabled: false }
          };
          this.soles = 0;
          this.mensajeErrorTv = "No se encontraron datos.";
          return;
        }

        this.mensajeErrorTv = "";

        const coloresPredefinidos = ["#187aff", "#ff1414", "#01b504", "#ffa500",
        "#FF69B4", "#4682B4", "#32CD32", "#FFD700","#008080", "#ff1414"];

        const totalSoles = data.reduce((sum, item) => sum + item.soles, 0);
        data.sort((a, b) => b.soles - a.soles);
        const nombresVehiculo = data.map(item => item.nombres);
        const porcentajes = data.map(item => ((item.soles / totalSoles) * 100).toFixed(2));

        const coloresAsignados = {};
        nombresVehiculo.forEach((nombre, index) => {
          coloresAsignados[nombre] = coloresPredefinidos[index % coloresPredefinidos.length];
        });

        this.chartSeriesPorVehiculo = data.map((item) => item.soles);
        this.chartOptionsPorVehiculo = {
          ...this.chartOptionsPorVehiculo,
          labels: nombresVehiculo,
          colors: nombresVehiculo.map(nombre => coloresAsignados[nombre]),
          legend: {
            position: "bottom",
            horizontalAlign: "center",
            show: true,
            formatter: function (seriesName, opts) {
              const color = coloresAsignados[seriesName] || '#3b3b3b';
              return `<span style="color: ${color};" class="font-bold text-xs">${seriesName}<span class="text-black ml-1">${porcentajes[opts.seriesIndex]}%</span></span>`;
            }
          },
          tooltip: {
            enabled: true,
            custom: function ({ series, seriesIndex, w }) {
              return `<div class="text-white font-bold p-2 bg-[#000000c7] text-xs rounded-lg">
                  <span class="font-semibold">${w.globals.labels[seriesIndex]}:</span>
                  <span class="font-bold"> S/. ${series[seriesIndex].toLocaleString("es-PE", { minimumFractionDigits: 2 })}</span>
                </div>`;
            }
          }
        };

      } catch (error) {
        console.error("Error al obtener datos de la API:", error);
        this.chartSeriesPorVehiculo = [];
        this.chartOptionsPorVehiculo = {
          labels: [],
          colors: [],
          legend: { show: false },
          tooltip: { enabled: false }
        };
        this.soles = 0;
      }
    },
    async obtnerDatosPorVehiculoFiltro(fechaInicioTv = null,fechaFinTv = null) {
      try {
        const response = await api.get(`/RVehiculo/ListadoDSBFE?FechaInicial=${fechaInicioTv}&FechaFinal=${fechaFinTv}`);
        const data = response.data;

       /* const responseFiltroTv = await api.get(`/RVehiculo/ListadoDSB`);
        const dataFiltroTv = responseFiltroTv.data;

        if (!dataFiltroTv || !Array.isArray(dataFiltroTv) || dataFiltroTv.length === 0) {
          this.chartSeriesPorVehiculo = [];
          this.chartOptionsPorVehiculo = {
            labels: [],
            colors: [],
            legend: { show: false },
            tooltip: { enabled: false }
          };
          this.soles = 0;
          return;
        }*/

        if (!data || !Array.isArray(data) || data.length === 0) {
          this.chartSeriesPorVehiculo = [];
          this.chartOptionsPorVehiculo = {
            labels: [],
            colors: [],
            legend: { show: false },
            tooltip: { enabled: false }
          };
          this.soles = 0;
          this.mensajeErrorTv = "No se encontraron datos en el rango seleccionado.";
          return;
        }

        this.mensajeErrorTv = "";

        const coloresPredefinidos = ["#187aff", "#ff1414", "#01b504", "#ffa500",
        "#FF69B4", "#4682B4", "#32CD32", "#FFD700","#008080", "#ff1414"];

        const totalSoles = data.reduce((sum, item) => sum + item.soles, 0);
        data.sort((a, b) => b.soles - a.soles);
        const nombresVehiculo = data.map(item => item.nombres);
        const porcentajes = data.map(item => ((item.soles / totalSoles) * 100).toFixed(2));

        const coloresAsignados = {};
        nombresVehiculo.forEach((nombre, index) => {
          coloresAsignados[nombre] = coloresPredefinidos[index % coloresPredefinidos.length];
        });

        this.chartSeriesPorVehiculo = data.map((item) => item.soles);
        this.chartOptionsPorVehiculo = {
          ...this.chartOptionsPorVehiculo,
          labels: nombresVehiculo,
          colors: nombresVehiculo.map(nombre => coloresAsignados[nombre]),
          legend: {
            position: "bottom",
            horizontalAlign: "center",
            show: true,
            formatter: function (seriesName, opts) {
              const color = coloresAsignados[seriesName] || '#3b3b3b';
              return `<span style="color: ${color};" class="font-bold text-xs">${seriesName}<span class="text-black ml-1">${porcentajes[opts.seriesIndex]}%</span></span>`;
            }
          },
          tooltip: {
            enabled: true,
            custom: function ({ series, seriesIndex, w }) {
              return `<div class="text-white font-bold p-2 bg-[#000000c7] text-xs rounded-lg">
                  <span class="font-semibold">${w.globals.labels[seriesIndex]}:</span>
                  <span class="font-bold"> S/. ${series[seriesIndex].toLocaleString("es-PE", { minimumFractionDigits: 2 })}</span>
                </div>`;
            }
          }
        };

      } catch (error) {
        console.error("Error al obtener datos de la API:", error);
        this.chartSeriesPorVehiculo = [];
        this.chartOptionsPorVehiculo = {
          labels: [],
          colors: [],
          legend: { show: false },
          tooltip: { enabled: false }
        };
        this.soles = 0;
     //   this.mensajeErrorTv = "Hubo un error al obtener los datos. Inténtelo nuevamente.";
      }
    },
    validateFormTv(){
      let isValid = true;
      this.errorMessages = {};

      const fechaInicioTv = new Date(this.fechaInicioTv);
      const fechaFinTv = new Date(this.fechaFinTv);

      if (!this.fechaInicioTv) {
        this.errorMessages.fechaInicioTv = '* El campo Fecha Inicio es obligatorio';
        isValid = false;
      }

      if (!this.fechaFinTv) {
        this.errorMessages.fechaFinTv = '* El campo Fecha Fin es obligatorio';
        isValid = false;
      }

      if (this.fechaInicioTv && this.fechaFinTv && fechaInicioTv > fechaFinTv) {
        this.errorMessages.fechaInicioTv = '* La Fecha Inicio no puede ser posterior a la Fecha Fin';
        isValid = false;
      }

      return isValid;
    },
    obtenerFechaActualTv() {
      const ahora = new Date();
      
      const opciones = {
        timeZone: "America/Lima",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    };

    const formatoFecha = new Intl.DateTimeFormat("es-PE", opciones).format(ahora);
    const [dia, mes, año] = formatoFecha.split("/");

    const fechaInicioTv = `${año}-${mes}-${dia}`;
    const fechaFinTv = `${año}-${mes}-${dia}`;

    return { fechaInicioTv, fechaFinTv };
    },
    turnoActualTv() {
      this.mostrarOpcionesTv = false; 
      this.botonfiltrarTv = false;

      this.actualizandoTurno = true;

      const { fechaInicioTv, fechaFinTv } = this.obtenerFechaActualTv();

      this.fechaInicioTv = fechaInicioTv;
      this.fechaFinTv = fechaFinTv;

      this.esTurnoActual = true;
      this.rangoFiltradoTv = '';

      this.obtnerDatosPorVehiculo();

      this.$nextTick(() => {
        this.actualizandoTurno = false;
      });
    },
    actualizarRangoFiltradoTv() {
      if (this.fechaInicioTv && this.fechaFinTv) {
        this.rangoFiltradoTv = `Desde: ${this.fechaInicioTv.replace("T", " ")} Hasta: ${this.fechaFinTv.replace("T", " ")}`;
      }
    },
    filtrarPorFechaTv() {

      if (!this.validateFormTv()) return;

      let fechaInicioFormateadaTv = this.fechaInicioTv;
      let fechaFinFormateadaTv = this.fechaFinTv;

      if (!fechaInicioFormateadaTv || !fechaFinFormateadaTv) {
          console.error("Error al formatear las fechas.");
          return;
      }

      this.esTurnoActual = false;
      this.mostrarOpcionesTv = false; 
      this.botonfiltrarTv = true,
      this.obtnerDatosPorVehiculoFiltro(fechaInicioFormateadaTv, fechaFinFormateadaTv);

    },
    aplicarRangoRapidoTv(opcion) {
      this.rangoSeleccionadoTv = opcion;

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

      this.fechaInicioTv = formatDate(inicio);
      this.fechaFinTv = formatDate(fin);

      this.rangoFiltradoTv = `Desde: ${this.fechaInicioTv} Hasta: ${this.fechaFinTv}`;
      this.botonfiltrarTv = true;
      this.filterData(this.fechaInicioTv, this.fechaFinTv);
    },
    /** Producto Resumen */
    async obtenerRProductoResumen() {
      try {
        const response = await api.get(`/RProductoResumen/ListadoDSB`);
        const data = response.data;

        if (response.status === 200 && Array.isArray(data) && data.length > 0) {
          const RProductoResumen = data[0];

          this.solesCombustible = new Intl.NumberFormat("es-PE", {
            style: "decimal",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true
          }).format(RProductoResumen.soles || 0.00);

          this.atencionAbastecimiento = RProductoResumen.atenciones || 0;
          this.galonesVendidos = (RProductoResumen.cantidad || 0.000).toFixed(3);
        } else {
          this.resetearDatos();
        }

        this.calcularVentaTotal();
        this.calcularTicket();

      } catch (error) {
        console.error("Error al obtener datos :", error);
        this.resetearDatos();
      }
    },
    /** Producto*/
    async obtenerRProducto() {

      try {
        const response = await api.get(`/rproducto/listado2dsb`);
        const data = response.data;


        if (response.status === 200 && Array.isArray(data) && data.length > 0) {
          let totalSolesProducto = data.reduce((total, item) => total + (item.soles || 0), 0);

          this.solesProducto = new Intl.NumberFormat("es-PE", {
            style: "decimal",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true
          }).format(totalSolesProducto || 0.00);
        } else {
          this.resetearDatosProducto();
        }
        this.calcularVentaTotal();
        this.calcularTicket();

      } catch (error) {
        console.error("Error al obtener datos :", error);
        this.resetearDatosProducto();
      }
    },
    resetearDatos() {
      this.solesCombustible = "0.00";
      this.atencionAbastecimiento = "0";
      this.galonesVendidos = "0.000";

      this.calcularVentaTotal();
      this.calcularTicket();
    },
    resetearDatosProducto() {
      this.solesProducto = "0.00";

      this.calcularVentaTotal();
      this.calcularTicket();
    },
    async calcularVentaTotal() {

      let solesCombustibleNumerico = this.solesCombustible.replace(/,/g, "");
      let solesProductoNumerico = this.solesProducto.replace(/,/g, "");

      solesCombustibleNumerico = parseFloat(solesCombustibleNumerico) || 0.00;
      solesProductoNumerico = parseFloat(solesProductoNumerico) || 0.00;

      const calcularVentaTotal = solesCombustibleNumerico + solesProductoNumerico;

      this.ventatotal = new Intl.NumberFormat("es-PE", {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: true
      }).format(calcularVentaTotal);

    },
    async calcularTicket() {

      let solesVTotalNumerico = this.solesCombustible.replace(/,/g, "");
      let atencionesNumerico = String(this.atencionAbastecimiento).replace(/,/g, "");

      solesVTotalNumerico = parseFloat(solesVTotalNumerico) || 0.00;
      atencionesNumerico = parseInt(atencionesNumerico) || 1;

      const calcularTicket = solesVTotalNumerico / atencionesNumerico;

      this.ticket = new Intl.NumberFormat("es-PE", {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: true
      }).format(calcularTicket);

    },
    async actualizarDatos() {

      if(this.botonfiltrar){
        let fechaInicio = this.fechaInicio;
        let fechaFin = this.fechaFin;
        this.obtenerDatosCombustibleFiltro(fechaInicio, fechaFin);
      }else{
        this.obtenerDatosCombustible();
      }

      if(this.botonfiltrarPT){
        let fechaInicioPT = this.fechaInicioPT;
        let fechaFinPT = this.fechaFinPT;
        this.obtnerDatosPorTarjetasFiltro(fechaInicioPT, fechaFinPT);
      }else{
        this.obtnerDatosPorTarjetas();
      }

      if(this.botonfiltrarTPago){
        let fechaInicioTPago = this.fechaInicioTPago;
        let fechaFinTPago = this.fechaFinTPago;
        this.obtenerDatosFormaPagoFiltro(fechaInicioTPago, fechaFinTPago);
      }else{
        this.obtenerDatosFormaPago();
      }
      
      if(this.botonfiltrarTv){
        let fechaInicioTv = this.fechaInicioTv;
        let fechaFinTv = this.fechaFinTv;
        this.obtnerDatosPorVehiculoFiltro(fechaInicioTv, fechaFinTv);
      }else{
        this.obtnerDatosPorVehiculo();
      }

      this.obtenerRProductoResumen();
      this.obtenerRProducto();
      this.obtenerDatosTanques();
  
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
  height: 6px; /* más delgado */
}
.scroll-delgado::-webkit-scrollbar-track {
  background: transparent;
}
.scroll-delgado::-webkit-scrollbar-thumb {
  background-color: #a8a8a8;
  border-radius: 20px;
}
.text-xxs{
  font-size: 0.65rem;
}
</style>