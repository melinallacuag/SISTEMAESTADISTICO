<template>
    <div class="overflow-x-auto bg-white dark:bg-white p-6 rounded-lg shadow-md">
        <div class="bg-[#212529] text-white p-3 rounded-lg flex justify-between items-center mb-4">
            <h1 class="text-xs font-bold uppercase tracking-widest">Generar PDF de Consolidado por Fecha</h1>
        </div>

        <form @submit.prevent="generarPDF">
            <!-- Input y botón en la misma línea -->
            <div class="flex flex-col sm:flex-row sm:items-end gap-4 mb-4">
                <div class="sm:w-1/3">
                    <label for="fecha" class="block text-sm font-medium text-black">Ingresar Fecha *</label>
                    <input type="date" v-model="fecha" id="fecha" :max="hoy"
                        class="border border-gray-300 rounded-lg px-3 py-2 w-full text-sm" />
                    <p v-if="errorMessages.fecha" class="text-red-500 text-xs">{{ errorMessages.fecha }}</p>
                </div>

                <div class="sm:w-auto">
                    <label class="block invisible text-sm font-medium">_</label>
                    <button type="submit"
                        class="w-full sm:w-auto px-6 py-3 bg-[#ffc107] font-semibold text-black rounded-lg shadow-md hover:bg-[#e0a800] uppercase text-xs">
                        Generar PDF
                    </button>
                    <p v-if="errorMessages.fecha" class="text-white text-xs">_</p>
                </div>
            </div>
        </form>

        <embed v-if="pdfUrl" :src="pdfUrl" type="application/pdf" class="mt-4" width="100%" height="600px" />
    </div>
</template>

<script>
import { ref, reactive } from "vue";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import api from "../services/api";

export default {
    name: "ConsolidadoTurno",
    data() {
        return {
            fecha: "",
        };
    },
    setup() {
        const hoy = new Date().toISOString().split("T")[0];

        const formatoFecha = (fechaISO) => {
            if (!fechaISO) return "";
            const [year, month, day] = fechaISO.split("-");
            return `${day}/${month}/${year}`;
        };
        const pdfUrl = ref(null);
        const fecha = ref("");
        const errorMessages = reactive({
            fecha: ""
        });

        // **Generar PDF**
        const generarPDF = async () => {

            errorMessages.fecha = "";

            let isValid = true;

            if (!fecha.value) {
                errorMessages.fecha = '* El campo Fecha es obligatorio para generar el PDF';
                isValid = false;
            }

            if (!isValid) return;

            const doc = new jsPDF({ orientation: "landscape" });

            try {
                const response = await api.get(`/Consolidado/Listado?FechaProceso=${fecha.value}`);
                const datos = response.data;

                const total = {
                    vCombustible: 0, vOtros: 0, efectivo: 0, yapePlin: 0, izipay: 0,
                    transferencia: 0, adelanto: 0, credito: 0, interno: 0, serafines: 0, totalEgresos: 0
                };

                const rows = datos.map(item => {
                    const vCombustible = item.vCombustible ?? 0;
                    const vOtros = item.vOtros ?? 0;
                    const efectivo = item.efectivo ?? 0;
                    const yapePlin = item.yapePlin ?? 0;
                    const izipay = item.izipay ?? 0;
                    const transferencia = item.transferencia ?? 0;
                    const adelanto = item.adelanto ?? 0;
                    const credito = item.credito ?? 0;
                    const interno = item.interno ?? 0;
                    const serafines = item.serafines ?? 0;
                    const totalEgresos = item.totalEgresos ?? 0;
                    const faltanteSobranteBruto = (vCombustible + vOtros) - (efectivo + yapePlin + izipay + transferencia + adelanto + credito + interno + serafines);
                    const faltanteSobrante = Math.abs(faltanteSobranteBruto) < 0.005 ? 0 : faltanteSobranteBruto;
                    //   const faltanteSobrante = (vCombustible + vOtros) - (efectivo + yapePlin + izipay + transferencia + adelanto + credito + interno + serafines);

                    total.vCombustible += vCombustible;
                    total.vOtros += vOtros;
                    total.efectivo += efectivo;
                    total.yapePlin += yapePlin;
                    total.izipay += izipay;
                    total.transferencia += transferencia;
                    total.adelanto += adelanto;
                    total.credito += credito;
                    total.interno += interno;
                    total.serafines += serafines;
                    total.totalEgresos += totalEgresos;
                    total.faltanteSobrante = (total.vCombustible + total.vOtros) - (total.efectivo + total.yapePlin + total.izipay + total.transferencia + total.adelanto + total.credito + total.interno + total.serafines);

                    const totalFaltanteSobranteBruto = (total.vCombustible + total.vOtros) -
                        (total.efectivo + total.yapePlin + total.izipay + total.transferencia +
                            total.adelanto + total.credito + total.interno + total.serafines);

                    total.faltanteSobrante = Math.abs(totalFaltanteSobranteBruto) < 0.005 ? 0 : totalFaltanteSobranteBruto;


                    return [
                        item.turno ?? "", item.terminalID ?? "", item.nomVendedor ?? "",
                        vCombustible.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                        vOtros.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                        efectivo.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                        yapePlin.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                        izipay.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                        transferencia.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                        adelanto.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                        credito.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                        interno.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                        serafines.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                        totalEgresos.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                        faltanteSobrante.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })

                    ];
                });

                rows.push([
                    { content: "TOTAL DE OPERACIONES EN PLAYA", colSpan: 3, styles: { halign: "center", fontStyle: "bold" } },
                    total.vCombustible.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    total.vOtros.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    total.efectivo.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    total.yapePlin.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    total.izipay.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    total.transferencia.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    total.adelanto.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    total.credito.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    total.interno.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    total.serafines.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    total.totalEgresos.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    total.faltanteSobrante.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                ]);



                doc.setFontSize(12);

                const text = "OPERACIONES EN PLAYA - CONSOLIDADO POR TURNOS";
                const textWidth = doc.getTextWidth(text);
                const xPosition = (doc.internal.pageSize.width - textWidth) / 2;
                doc.text(text, xPosition, 12);

                const fechaTexto = "Día: " + formatoFecha(fecha.value);
                const textWidthFecha = doc.getTextWidth(fechaTexto);
                // const xFecha = (doc.internal.pageSize.width - textWidthFecha) / 2;
                doc.text(fechaTexto, 10, 20);

                const columns = [
                    "TURNO", "PUNTO DE VENTA", "VENDEDOR", "VENTA COMBUSTIBLE", "VENTA OTROS",
                    "EFECTIVO SOLES", "YAPE/PLIN", "IZIPAY", "TRANSF. BANCARIA", "ADELANTO",
                    "CRÉDITO", "INTERNOS", "SERAFÍN", "EGRESOS", "FALTANTE/ SOBRANTE"
                ];

                autoTable(doc, {
                    head: [columns],
                    body: rows,
                    startY: 24,
                    theme: "grid",
                    tableWidth: "auto",
                    margin: { left: 10, right: 10 },
                    styles: {
                        fontSize: 8,
                        cellPadding: 2,
                        halign: "center",
                        valign: "middle",
                        lineWidth: 0.2,
                        lineColor: [0, 0, 0],
                    },
                    headStyles: {
                        textColor: [0, 0, 0],
                        fontStyle: "bold",
                    },
                    bodyStyles: {
                        textColor: [0, 0, 0],
                    },
                    columnStyles: {
                        0: { fillColor: [255, 230, 204] },
                        1: { fillColor: [255, 230, 204] },
                        2: { fillColor: [255, 230, 204] },
                        3: { fillColor: [255, 230, 204] },
                        4: { fillColor: [255, 230, 204] },
                        5: { fillColor: [204, 229, 255] },
                        6: { fillColor: [204, 229, 255] },
                        7: { fillColor: [204, 229, 255] },
                        8: { fillColor: [204, 229, 255] },
                        9: { fillColor: [204, 229, 255] },
                        10: { fillColor: [204, 229, 255] },
                        11: { fillColor: [204, 229, 255] },
                        12: { fillColor: [204, 229, 255] },
                        13: { fillColor: [175, 244, 160] },
                        14: { fillColor: [175, 244, 160] },
                    },
                    didParseCell: function (data) {
                        if (data.row.section === 'head') {
                            if (data.column.index < 5) {
                                data.cell.styles.fillColor = [255, 153, 102]; // Naranja oscuro para los primeros 7 encabezados
                            } else if (data.column.index < 13) {
                                data.cell.styles.fillColor = [102, 178, 255]; // Azul más oscuro para el resto
                            } else {
                                data.cell.styles.fillColor = [86, 226, 53]; // Azul más oscuro para el resto
                            }
                        }
                    }
                });

            } catch (error) {
                console.error("Error al generar PDF:", error);
                alert("No se pudo generar el PDF. Verifica la conexión con el servidor.");
            }

            try {

                const [resIzipay, resYape, resTransfer] = await Promise.all([
                    api.get(`/DetalleFormaPago/ListadoIzipay?FechaProceso=${fecha.value}`),
                    api.get(`/DetalleFormaPago/ListadoYapePlin?FechaProceso=${fecha.value}`),
                    api.get(`/DetalleFormaPago/ListadoTransferencia?FechaProceso=${fecha.value}`)
                ]);

                const maxFilas = Math.max(
                    resIzipay.data.length,
                    resYape.data.length,
                    resTransfer.data.length
                );

                const filas = [];
                for (let i = 0; i < maxFilas; i++) {
                    filas.push([
                        resIzipay.data[i]?.comprobante ?? "-",
                        resIzipay.data[i]?.nroOperacion ?? "-",
                        (resIzipay.data[i]?.importe ?? 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),

                        resYape.data[i]?.comprobante ?? "-",
                        resYape.data[i]?.nroOperacion ?? "-",
                        (resYape.data[i]?.importe ?? 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),

                        resTransfer.data[i]?.comprobante ?? "-",
                        resTransfer.data[i]?.nroOperacion ?? "-",
                        (resTransfer.data[i]?.importe ?? 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    ]);
                }

                // Totales al final
                const totalIzipay = resIzipay.data.reduce((acc, x) => acc + (x.importe ?? 0), 0);
                const totalYape = resYape.data.reduce((acc, x) => acc + (x.importe ?? 0), 0);
                const totalTransfer = resTransfer.data.reduce((acc, x) => acc + (x.importe ?? 0), 0);
                filas.push([
                    { content: "Total Forma de Pago 'IZIPAY':", colSpan: 2, styles: { halign: "right", fontStyle: "bold" } },
                    totalIzipay.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),

                    { content: "Total Forma de Pago 'YAPE/PLIN':", colSpan: 2, styles: { halign: "right", fontStyle: "bold" } },
                    totalYape.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),

                    { content: "Total Forma de Pago 'TRANSFERENCIA':", colSpan: 2, styles: { halign: "right", fontStyle: "bold" } },
                    totalTransfer.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                ]);

                autoTable(doc, {
                    head: [
                        [
                            { content: "DETALLE IZIPAY", colSpan: 3, styles: { halign: "center", fillColor: [77, 235, 255] } },
                            { content: "DETALLE YAPE/PLIN", colSpan: 3, styles: { halign: "center", fillColor: [255, 193, 7] } },
                            { content: "DETALLE TRANSFERENCIA", colSpan: 3, styles: { halign: "center", fillColor: [77, 255, 141] } }
                        ],
                        [
                            { content: "Nro. Documento", styles: { fillColor: [77, 235, 255] } },
                            { content: "Nro. Referencia", styles: { fillColor: [77, 235, 255] } },
                            { content: "Importe", styles: { fillColor: [77, 235, 255] } },

                            { content: "Nro. Documento", styles: { fillColor: [255, 193, 7] } },
                            { content: "Nro. Referencia", styles: { fillColor: [255, 193, 7] } },
                            { content: "Importe", styles: { fillColor: [255, 193, 7] } },

                            { content: "Nro. Documento", styles: { fillColor: [77, 255, 141] } },
                            { content: "Nro. Referencia", styles: { fillColor: [77, 255, 141] } },
                            { content: "Importe", styles: { fillColor: [77, 255, 141] } }
                        ],

                    ],
                    body: filas,
                    startY: doc.lastAutoTable.finalY + 4,
                    margin: { left: 10, right: 10 },
                    theme: "grid",
                    styles: {
                        fontSize: 8,
                        cellPadding: 2,
                        halign: "center",
                        valign: "middle",
                        lineWidth: 0.2,
                        lineColor: [0, 0, 0],
                    },
                    headStyles: {
                        textColor: [0, 0, 0],
                        fontStyle: "bold",
                    },
                    bodyStyles: {
                        textColor: [0, 0, 0],
                    }
                });


            } catch (error) {
                console.error("Error al generar PDF:", error);
                alert("No se pudo generar el PDF. Verifica la conexión con el servidor.");
            }

            try {
                const response = await api.get(`/DetalleCredito/Listado?FechaProceso=${fecha.value}`);
                const datos = response.data;

                const total = {
                    importe: 0
                };

                const rows = datos.map(item => {
                    const comprobante = item.comprobante ?? "";
                    const clienteRZ = item.clienteRZ ?? "";
                    const importe = item.importe ?? 0;

                    total.importe += importe;

                    return [
                        comprobante,
                        clienteRZ,
                        importe.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    ];
                });

                rows.push([
                    { content: "Total Soles:", colSpan: 2, styles: { halign: "right", fontStyle: "bold" } },
                    total.importe.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                ]);

                const head = [
                    [
                        { content: "DETALLE DE VENTAS AL CRÉDITO", colSpan: 3, styles: { halign: "center", fillColor: [102, 153, 255] } }
                    ],
                    [
                        { content: "Nro. Documento", styles: { fillColor: [102, 153, 255] } },
                        { content: "Nro. Referencia", styles: { fillColor: [102, 153, 255] } },
                        { content: "Importe", styles: { fillColor: [102, 153, 255] } },
                    ],
                ];

                autoTable(doc, {
                    head: head,
                    body: rows,
                    startY: doc.lastAutoTable.finalY + 4,
                    theme: "grid",
                    tableWidth: "auto",
                    margin: { left: 10, right: 10 },
                    styles: {
                        fontSize: 8,
                        cellPadding: 2,
                        halign: "center",
                        valign: "middle",
                        lineWidth: 0.2,
                        lineColor: [0, 0, 0],
                    },
                    headStyles: {
                        textColor: [0, 0, 0],
                        fontStyle: "bold",
                    },
                    bodyStyles: {
                        textColor: [0, 0, 0],
                    }
                });

            } catch (error) {
                console.error("Error al generar PDF:", error);
                alert("No se pudo generar el PDF. Verifica la conexión con el servidor.");
            }

            try {
                const response = await api.get(`/DetalleBoveda/Listado?FechaProceso=${fecha.value}`);
                const datos = response.data;

                const agrupado = {};
                datos.forEach(item => {
                    const vendedor = item.vendedor ?? "Sin vendedor";
                    if (!agrupado[vendedor]) {
                        agrupado[vendedor] = [];
                    }
                    agrupado[vendedor].push(item);
                });

                const total = { totalEgresos: 0 };
                const rows = [];

                for (const vendedor in agrupado) {
                    const items = agrupado[vendedor];
                    let subtotalVendedor = 0;

                    rows.push([
                        { content: vendedor, colSpan: 4, styles: { halign: "left", fontStyle: "bold", fillColor: [255, 204, 153] } }
                    ]);

                    // Filas de cada comprobante del vendedor
                    items.forEach(item => {
                        const comprobante = item.comprobante ?? "";
                        const fechaRegistro = item.fechaRegistro ?? "";
                        const totalEgresos = item.totalEgresos ?? 0;

                        subtotalVendedor += totalEgresos;
                        total.totalEgresos += totalEgresos;

                        rows.push([
                            vendedor,
                            comprobante,
                            fechaRegistro,
                            totalEgresos.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                        ]);
                    });
                    
                    rows.push([
                        { content: `${vendedor} - TOTAL (S/.):`, colSpan: 3, styles: { halign: "right", fontStyle: "bold" } },
                        subtotalVendedor.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    ]);
                }

                // Fila de total general
                rows.push([
                    { content: "Total Soles:", colSpan: 3, styles: { halign: "right", fontStyle: "bold" } },
                    total.totalEgresos.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                ]);

                const head = [
                    [
                        { content: "DETALLE DEPOSITO A BOVEDA / PAGOS A OTROS", colSpan: 4, styles: { halign: "center", fillColor: [255, 165, 0] } }
                    ],
                    [
                        { content: "Vendedor", styles: { fillColor: [255, 165, 0] } },
                        { content: "Comprobante", styles: { fillColor: [255, 165, 0] } },
                        { content: "Fecha de Registro", styles: { fillColor: [255, 165, 0] } },
                        { content: "Importe", styles: { fillColor: [255, 165, 0] } },
                    ],
                ];

                autoTable(doc, {
                    head: head,
                    body: rows,
                    startY: doc.lastAutoTable.finalY + 4,
                    theme: "grid",
                    tableWidth: "auto",
                    margin: { left: 10, right: 10 },
                    styles: {
                        fontSize: 8,
                        cellPadding: 2,
                        halign: "center",
                        valign: "middle",
                        lineWidth: 0.2,
                        lineColor: [0, 0, 0],
                    },
                    headStyles: {
                        textColor: [0, 0, 0],
                        fontStyle: "bold",
                    },
                    bodyStyles: {
                        textColor: [0, 0, 0],
                    }
                });

            } catch (error) {
                console.error("Error al generar PDF:", error);
                alert("No se pudo generar el PDF. Verifica la conexión con el servidor.");
            }

            try {
                const response = await api.get(`/DetalleProGratuito/Listado?FechaProceso=${fecha.value}`);
                const datos = response.data;

                const total = {
                    importe: 0
                };

                const rows = datos.map(item => {
                    const comprobante = item.comprobante ?? "";
                    const clienteID = item.clienteID ?? "";
                    const clienteRZ = item.clienteRZ ?? "";
                    const importe = item.importe ?? 0;

                    total.importe += importe;

                    return [
                        comprobante,
                        clienteID,
                        clienteRZ,
                        importe.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    ];
                });

                rows.push([
                    { content: "Total Soles:", colSpan: 3, styles: { halign: "right", fontStyle: "bold" } },
                    total.importe.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                ]);

                const head = [
                    [
                        { content: "DETALLE DE VENTAS GRATUITAS", colSpan: 4, styles: { halign: "center", fillColor: [86, 226, 53] } }
                    ],
                    [
                        { content: "Nro. Documento", styles: { fillColor: [86, 226, 53] } },
                        { content: "DNI/RUC", styles: { fillColor: [86, 226, 53] } },
                        { content: "Raz. Social/Nombres", styles: { fillColor: [86, 226, 53] } },
                        { content: "Importe", styles: { fillColor: [86, 226, 53] } },
                    ],
                ];

                autoTable(doc, {
                    head: head,
                    body: rows,
                    startY: doc.lastAutoTable.finalY + 4,
                    theme: "grid",
                    tableWidth: "auto",
                    margin: { left: 10, right: 10 },
                    styles: {
                        fontSize: 8,
                        cellPadding: 2,
                        halign: "center",
                        valign: "middle",
                        lineWidth: 0.2,
                        lineColor: [0, 0, 0],
                    },
                    headStyles: {
                        textColor: [0, 0, 0],
                        fontStyle: "bold",
                    },
                    bodyStyles: {
                        textColor: [0, 0, 0],
                    }
                });

            } catch (error) {
                console.error("Error al generar PDF:", error);
                alert("No se pudo generar el PDF. Verifica la conexión con el servidor.");
            }

            const blob = doc.output("blob");
            const blobUrl = URL.createObjectURL(blob);
            pdfUrl.value = blobUrl;

            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = `consolidado-${fecha.value}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };
        return { pdfUrl, fecha, errorMessages, generarPDF, formatoFecha, hoy };
    }
};
</script>