// ============================================
// SISTEMA DE DATOS AGRÍCOLAS MEJORADO
// 9 QUÍMICOS ESPECIALIZADOS + 20 CULTIVOS
// ============================================

const PESTICIDES_DB = [
    {
        id: 1,
        nombre: "Clorantraniliprol",
        tipo: "INSECTICIDA",
        dosisBase: 0.05,
        unidad: "L/ha",
        carenciaBase: 14,
        toxicidad: "Media",
        clase: "Diamida",
        lmr: 0.02,
        epiRequerido: ["guantes", "mascarilla"],
        compatibilidad: ["FUNGICIDAS", "ACARICIDAS"],
        restricciones: ["No aplicar en floración", "Rotar con otros modos de acción"],
        usos: ["Gusano cogollero", "Heliotis", "Palomilla"],
        cultivosPermitidos: [1, 2, 3, 6, 8, 11, 15],
        icono: "fas fa-caterpillar",
        descripcion: "Insecticida de nueva generación con acción por contacto e ingestión",
        modoAccion: "Activador de receptores de rianodina",
        tiempoEfecto: "2-4 horas",
        persistencia: "10-14 días",
        precioAprox: "$55/L"
    },
    {
        id: 2,
        nombre: "Fluxapyroxad",
        tipo: "FUNGICIDA",
        dosisBase: 0.4,
        unidad: "L/ha",
        carenciaBase: 21,
        toxicidad: "Baja",
        clase: "Carboxamida",
        lmr: 0.1,
        epiRequerido: ["guantes"],
        compatibilidad: ["INSECTICIDAS", "HERBICIDAS"],
        restricciones: ["Máximo 2 aplicaciones por ciclo"],
        usos: ["Roya de la hoja", "Manchas foliares", "Cercospora"],
        cultivosPermitidos: [2, 3, 4, 5, 9, 12, 16],
        icono: "fas fa-virus-slash",
        descripcion: "Fungicida sistémico preventivo y curativo",
        modoAccion: "Inhibidor de succinato deshidrogenasa",
        tiempoEfecto: "24-48 horas",
        persistencia: "14-21 días",
        precioAprox: "$68/L"
    },
    {
        id: 3,
        nombre: "Mesotrione",
        tipo: "HERBICIDA",
        dosisBase: 1.2,
        unidad: "L/ha",
        carenciaBase: 30,
        toxicidad: "Media",
        clase: "Triketona",
        lmr: 0.01,
        epiRequerido: ["guantes", "mascarilla", "gafas"],
        compatibilidad: ["INSECTICIDAS"],
        restricciones: ["Solo pre-emergencia", "No aplicar en suelos arenosos"],
        usos: ["Control de malezas gramíneas y hoja ancha"],
        cultivosPermitidos: [3, 4, 8],
        icono: "fas fa-weed",
        descripcion: "Herbicida selectivo para maíz y soya",
        modoAccion: "Inhibidor de HPPD",
        tiempoEfecto: "7-10 días",
        persistencia: "60-90 días",
        precioAprox: "$45/L"
    },
    {
        id: 4,
        nombre: "Abamectina B1",
        tipo: "ACARICIDA",
        dosisBase: 0.3,
        unidad: "L/ha",
        carenciaBase: 7,
        toxicidad: "Media",
        clase: "Avermectina",
        lmr: 0.01,
        epiRequerido: ["guantes", "mascarilla"],
        compatibilidad: ["FUNGICIDAS"],
        restricciones: ["No aplicar con temperaturas >35°C"],
        usos: ["Ácaro rojo", "Tetranychus", "Minadores"],
        cultivosPermitidos: [11, 12, 13, 14, 15, 16],
        icono: "fas fa-spider",
        descripcion: "Acaricida e insecticida con acción translaminar",
        modoAccion: "Agonista de canales de cloro",
        tiempoEfecto: "24-72 horas",
        persistencia: "10-14 días",
        precioAprox: "$38/L"
    },
    {
        id: 5,
        nombre: "Fluopyram",
        tipo: "NEMATICIDA",
        dosisBase: 1.5,
        unidad: "L/ha",
        carenciaBase: 45,
        toxicidad: "Media",
        clase: "Carboxamida",
        lmr: 0.05,
        epiRequerido: ["guantes", "mascarilla", "overol"],
        compatibilidad: ["FUNGICIDAS"],
        restricciones: ["Aplicación al suelo", "Usar equipo calibrado"],
        usos: ["Nematodos agalladores", "Pratylenchus"],
        cultivosPermitidos: [1, 6, 11, 12, 13, 15],
        icono: "fas fa-microscope",
        descripcion: "Nematicida y fungicida de suelo",
        modoAccion: "Inhibidor de succinato deshidrogenasa",
        tiempoEfecto: "7-14 días",
        persistencia: "45-60 días",
        precioAprox: "$85/L"
    },
    {
        id: 6,
        nombre: "Spinetoram",
        tipo: "INSECTICIDA",
        dosisBase: 0.15,
        unidad: "L/ha",
        carenciaBase: 3,
        toxicidad: "Baja",
        clase: "Espinosino",
        lmr: 0.1,
        epiRequerido: ["guantes"],
        compatibilidad: ["FUNGICIDAS", "ACARICIDAS"],
        restricciones: ["Aplicar en horas frescas", "Protegerse del sol"],
        usos: ["Trips", "Mosca blanca", "Pulgón"],
        cultivosPermitidos: [1, 6, 7, 8, 9, 10, 16],
        icono: "fas fa-bug-slash",
        descripcion: "Insecticida natural derivado de fermentación",
        modoAccion: "Activador de receptores nicotínicos",
        tiempoEfecto: "1-2 horas",
        persistencia: "5-7 días",
        precioAprox: "$42/L"
    },
    {
        id: 7,
        nombre: "Isopyrazam",
        tipo: "FUNGICIDA",
        dosisBase: 0.5,
        unidad: "L/ha",
        carenciaBase: 28,
        toxicidad: "Media",
        clase: "Carboxamida",
        lmr: 0.03,
        epiRequerido: ["guantes", "mascarilla"],
        compatibilidad: ["INSECTICIDAS"],
        restricciones: ["No exceder dosis recomendada"],
        usos: ["Septoria", "Roya amarilla", "Mancha neta"],
        cultivosPermitidos: [2, 5, 9],
        icono: "fas fa-shield-alt",
        descripcion: "Fungicida sistémico para cereales",
        modoAccion: "Inhibidor de respiración mitocondrial",
        tiempoEfecto: "48-72 horas",
        persistencia: "21-28 días",
        precioAprox: "$75/L"
    },
    {
        id: 8,
        nombre: "Tembotrione",
        tipo: "HERBICIDA",
        dosisBase: 1.0,
        unidad: "L/ha",
        carenciaBase: 45,
        toxicidad: "Media",
        clase: "Triketona",
        lmr: 0.02,
        epiRequerido: ["guantes", "mascarilla"],
        compatibilidad: ["INSECTICIDAS"],
        restricciones: ["Solo post-emergencia temprana"],
        usos: ["Control de malezas resistentes"],
        cultivosPermitidos: [3, 4],
        icono: "fas fa-seedling",
        descripcion: "Herbicida para malezas difíciles en maíz",
        modoAccion: "Inhibidor de HPPD",
        tiempoEfecto: "5-7 días",
        persistencia: "30-45 días",
        precioAprox: "$50/L"
    },
    {
        id: 9,
        nombre: "Cyflumetofen",
        tipo: "ACARICIDA",
        dosisBase: 0.25,
        unidad: "L/ha",
        carenciaBase: 14,
        toxicidad: "Baja",
        clase: "Benzohidrazida",
        lmr: 0.5,
        epiRequerido: ["guantes"],
        compatibilidad: ["FUNGICIDAS", "INSECTICIDAS"],
        restricciones: ["No aplicar bajo lluvia inminente"],
        usos: ["Ácaro de dos puntos", "Panonychus"],
        cultivosPermitidos: [11, 12, 13, 14, 15, 16],
        icono: "fas fa-spider-web",
        descripcion: "Acaricida específico de nuevo modo de acción",
        modoAccion: "Inhibidor de complejo II",
        tiempoEfecto: "3-5 días",
        persistencia: "14-21 días",
        precioAprox: "$60/L"
    }
];

// ============================================
// BASE DE DATOS DE CULTIVOS COMPLETA
// Incluye: SEMILLAS, ARBOLES, HORTALIZAS, GRANOS
// ============================================

const CROPS_DB = [
    // SEMILLAS Y GRANOS
    {
        id: 1,
        nombre: "Semilla de Maíz Híbrido",
        tipo: "Semilla",
        categoria: "Grano",
        cicloDias: 110,
        densidad: 60, // mil plantas/ha
        rendimientoEsperado: "9-12 ton/ha",
        precioSemilla: "$120-180/ha",
        icono: "fas fa-corn",
        climaOptimo: "Cálido (20-30°C)",
        sueloRecomendado: "Franco, bien drenado",
        fertilizacion: "N-P-K: 180-60-80 kg/ha"
    },
    {
        id: 2,
        nombre: "Semilla de Trigo de Invierno",
        tipo: "Semilla",
        categoria: "Grano",
        cicloDias: 210,
        densidad: 150, // kg/ha
        rendimientoEsperado: "4-6 ton/ha",
        precioSemilla: "$80-120/ha",
        icono: "fas fa-wheat",
        climaOptimo: "Templado (15-25°C)",
        sueloRecomendado: "Arcillo-arenoso",
        fertilizacion: "N-P-K: 120-40-40 kg/ha"
    },
    {
        id: 3,
        nombre: "Semilla de Soya RR",
        tipo: "Semilla",
        categoria: "Grano",
        cicloDias: 105,
        densidad: 40, // plantas/m²
        rendimientoEsperado: "3-4 ton/ha",
        precioSemilla: "$100-150/ha",
        icono: "fas fa-seedling",
        climaOptimo: "Cálido (25-35°C)",
        sueloRecomendado: "pH 6.0-6.8",
        fertilizacion: "Inocular con Bradyrhizobium"
    },
    {
        id: 4,
        nombre: "Semilla de Arroz Inundado",
        tipo: "Semilla",
        categoria: "Grano",
        cicloDias: 130,
        densidad: 80, // kg/ha
        rendimientoEsperado: "6-8 ton/ha",
        precioSemilla: "$60-90/ha",
        icono: "fas fa-rice",
        climaOptimo: "Cálido húmedo",
        sueloRecomendado: "Arcilloso, con capacidad de inundación",
        fertilizacion: "N-P-K: 120-40-40 kg/ha"
    },
    
    // HORTALIZAS
    {
        id: 5,
        nombre: "Tomate Saladette",
        tipo: "Hortaliza",
        categoria: "Fruto",
        cicloDias: 90,
        densidad: 25, // mil plantas/ha
        rendimientoEsperado: "60-80 ton/ha",
        precioSemilla: "$300-400/ha",
        icono: "fas fa-tomato",
        climaOptimo: "20-28°C",
        sueloRecomendado: "Franco, rico en materia orgánica",
        sistemaCultivo: "Tutorado, riego por goteo"
    },
    {
        id: 6,
        nombre: "Chile Jalapeño",
        tipo: "Hortaliza",
        categoria: "Fruto",
        cicloDias: 85,
        densidad: 40, // mil plantas/ha
        rendimientoEsperado: "20-30 ton/ha",
        precioSemilla: "$200-300/ha",
        icono: "fas fa-pepper",
        climaOptimo: "18-30°C",
        sueloRecomendado: "Bien drenado, pH 6.0-7.0",
        cosecha: "Multiple, cada 7-10 días"
    },
    {
        id: 7,
        nombre: "Cebolla Blanca",
        tipo: "Hortaliza",
        categoria: "Bulbo",
        cicloDias: 120,
        densidad: 300, // mil plantas/ha
        rendimientoEsperado: "40-50 ton/ha",
        precioSemilla: "$150-250/ha",
        icono: "fas fa-onion",
        climaOptimo: "15-25°C",
        sueloRecomendado: "Arenoso, sin piedras",
        almacenamiento: "2-3 meses en fresco"
    },
    {
        id: 8,
        nombre: "Zanahoria Nantes",
        tipo: "Hortaliza",
        categoria: "Raíz",
        cicloDias: 75,
        densidad: 800, // mil semillas/ha
        rendimientoEsperado: "35-45 ton/ha",
        precioSemilla: "$100-180/ha",
        icono: "fas fa-carrot",
        climaOptimo: "15-20°C",
        sueloRecomendado: "Arenoso profundo",
        siembra: "Directa en camas altas"
    },
    
    // ÁRBOLES FRUTALES
    {
        id: 9,
        nombre: "Naranjo Valencia",
        tipo: "Árbol",
        categoria: "Frutal",
        cicloDias: 365,
        densidad: 400, // plantas/ha
        inicioProduccion: "Año 3",
        produccionAdulto: "20-30 ton/ha",
        precioArbol: "$8-12/unidad",
        icono: "fas fa-orange",
        climaOptimo: "Subtropical",
        marcoPlantacion: "6x4 m",
        poda: "Formación y producción"
    },
    {
        id: 10,
        nombre: "Aguacate Hass",
        tipo: "Árbol",
        categoria: "Frutal",
        cicloDias: 365,
        densidad: 300, // plantas/ha
        inicioProduccion: "Año 4",
        produccionAdulto: "10-15 ton/ha",
        precioArbol: "$15-25/unidad",
        icono: "fas fa-avocado",
        climaOptimo: "20-28°C",
        sueloRecomendado: "Profundo, bien drenado",
        polinizacion: "Tipo A, requiere polinizador"
    },
    {
        id: 11,
        nombre: "Mango Ataulfo",
        tipo: "Árbol",
        categoria: "Frutal",
        cicloDias: 365,
        densidad: 200, // plantas/ha
        inicioProduccion: "Año 5",
        produccionAdulto: "15-20 ton/ha",
        precioArbol: "$10-18/unidad",
        icono: "fas fa-mango",
        climaOptimo: "Tropical",
        riego: "Crítico en floración",
        floracion: "Inducida por estrés hídrico"
    },
    {
        id: 12,
        nombre: "Limón Persa",
        tipo: "Árbol",
        categoria: "Frutal",
        cicloDias: 365,
        densidad: 500, // plantas/ha
        inicioProduccion: "Año 2",
        produccionAdulto: "30-40 ton/ha",
        precioArbol: "$6-10/unidad",
        icono: "fas fa-lemon",
        climaOptimo: "Cálido",
        produccion: "Continua durante el año",
        usos: "Industrial y fresco"
    },
    
    // CULTIVOS ESPECIALES
    {
        id: 13,
        nombre: "Café Arábica",
        tipo: "Arbusto",
        categoria: "Especial",
        cicloDias: 365,
        densidad: 2500, // plantas/ha
        inicioProduccion: "Año 3",
        produccionAdulto: "1.5-2.5 ton/ha (beneficiado)",
        precioPlanta: "$1.5-2.5/unidad",
        icono: "fas fa-coffee",
        climaOptimo: "18-22°C, altura 1000-2000 msnm",
        sombra: "Recomendada 40-60%",
        cosecha: "Selectiva, manual"
    },
    {
        id: 14,
        nombre: "Cacao Criollo",
        tipo: "Árbol",
        categoria: "Especial",
        cicloDias: 365,
        densidad: 1000, // plantas/ha
        inicioProduccion: "Año 4",
        produccionAdulto: "0.8-1.2 ton/ha (seco)",
        precioPlanta: "$3-5/unidad",
        icono: "fas fa-cocoa",
        climaOptimo: "24-28°C, humedad >70%",
        sombra: "Necesaria en primeros años",
        fermentacion: "Crítica para calidad"
    },
    {
        id: 15,
        nombre: "Arándano Highbush",
        tipo: "Arbusto",
        categoria: "Baya",
        cicloDias: 365,
        densidad: 3000, // plantas/ha
        inicioProduccion: "Año 2",
        produccionAdulto: "15-20 ton/ha",
        precioPlanta: "$4-7/unidad",
        icono: "fas fa-berries",
        climaOptimo: "Templado frío",
        sueloRecomendado: "Ácido (pH 4.5-5.5)",
        riego: "Por goteo con fertirriego"
    },
    {
        id: 16,
        nombre: "Frambuesa Heritage",
        tipo: "Arbusto",
        categoria: "Baya",
        cicloDias: 365,
        densidad: 12000, // plantas/ha
        inicioProduccion: "Año 1",
        produccionAdulto: "10-15 ton/ha",
        precioPlanta: "$2-4/unidad",
        icono: "fas fa-raspberry",
        climaOptimo: "15-25°C",
        sistema: "Espaldera",
        cosecha: "Diaria en temporada"
    },
    
    // FORRAJES
    {
        id: 17,
        nombre: "Alfalfa Cuf 101",
        tipo: "Forraje",
        categoria: "Leguminosa",
        cicloDias: 365,
        densidad: 20, // kg semilla/ha
        cortesAnuales: 8,
        produccionForraje: "18-22 ton MS/ha",
        precioSemilla: "$50-80/ha",
        icono: "fas fa-hay",
        climaOptimo: "Templado",
        riego: "Por aspersión o inundación",
        fijacionNitrogeno: "200-300 kg N/ha/año"
    },
    {
        id: 18,
        nombre: "Maíz Forrajero",
        tipo: "Forraje",
        categoria: "Gramínea",
        cicloDias: 100,
        densidad: 70, // mil plantas/ha
        produccionForraje: "40-60 ton MV/ha",
        precioSemilla: "$80-120/ha",
        icono: "fas fa-corn",
        cosecha: "Picado o ensilado",
        valorNutricional: "8-10% PC, 65% NDT"
    },
    
    // CULTIVOS DE RAÍZ
    {
        id: 19,
        nombre: "Papa Alpha",
        tipo: "Tubérculo",
        categoria: "Raíz",
        cicloDias: 95,
        densidad: 40, // mil plantas/ha
        rendimientoEsperado: "35-45 ton/ha",
        precioSemilla: "$400-600/ha",
        icono: "fas fa-potato",
        sueloRecomendado: "Suelto, sin compactación",
        siembra: "Semilla certificada",
        almacenamiento: "8-12°C, 90% humedad"
    },
    {
        id: 20,
        nombre: "Jengibre Orgánico",
        tipo: "Rizoma",
        categoria: "Especial",
        cicloDias: 240,
        densidad: 15, // ton semilla/ha
        rendimientoEsperado: "25-35 ton/ha",
        precioSemilla: "$2000-3000/ha",
        icono: "fas fa-ginger",
        climaOptimo: "25-30°C, sombra parcial",
        sueloRecomendado: "Orgánico, rico en humus",
        mercado: "Exportación, orgánico premium"
    }
];

// ============================================
// SISTEMA DE CÁLCULO AVANZADO
// ============================================

const CALCULATION_SYSTEM = {
    // Factores de ajuste por tipo de cultivo
    cropAdjustmentFactors: {
        "Semilla": { 
            factorDosis: 1.0,
            precision: "Alta",
            aplicacion: "Preventiva" 
        },
        "Hortaliza": { 
            factorDosis: 1.2,
            precision: "Muy alta",
            aplicacion: "Curativa" 
        },
        "Árbol": { 
            factorDosis: 1.5,
            precision: "Media",
            aplicacion: "Dirigida" 
        },
        "Arbusto": { 
            factorDosis: 1.3,
            precision: "Alta",
            aplicacion: "Localizada" 
        },
        "Forraje": { 
            factorDosis: 0.8,
            precision: "Media",
            aplicacion: "Uniforme" 
        },
        "Tubérculo": { 
            factorDosis: 1.1,
            precision: "Alta",
            aplicacion: "Al suelo" 
        }
    },
    
    // Calculadora de dosis inteligente
    calculateDose(pesticideId, cropId, area, growthStage, pressure) {
        const pesticide = PESTICIDES_DB.find(p => p.id === pesticideId);
        const crop = CROPS_DB.find(c => c.id === cropId);
        
        if (!pesticide || !crop) return null;
        
        // Dosis base del producto
        let dose = pesticide.dosisBase;
        
        // Factor por tipo de cultivo
        const cropFactor = this.cropAdjustmentFactors[crop.tipo]?.factorDosis || 1.0;
        dose *= cropFactor;
        
        // Factor por etapa de crecimiento
        const growthFactor = this.getGrowthStageFactor(growthStage);
        dose *= growthFactor;
        
        // Factor por presión de plaga/enfermedad
        const pressureFactor = this.getPressureFactor(pressure);
        dose *= pressureFactor;
        
        // Factor por densidad de plantación
        if (crop.densidad) {
            const densityFactor = Math.sqrt(crop.densidad / 100);
            dose *= densityFactor;
        }
        
        // Redondeo y ajustes finales
        dose = Math.round(dose * 100) / 100;
        
        return {
            dosisPorHa: dose,
            dosisTotal: dose * area,
            unidad: pesticide.unidad,
            frecuencia: this.getApplicationFrequency(crop.tipo, pesticide.tipo),
            recomendaciones: this.getApplicationRecommendations(pesticide, crop)
        };
    },
    
    getGrowthStageFactor(stage) {
        const factors = {
            "Siembra": 0.7,
            "Emergencia": 0.8,
            "Vegetativo": 1.0,
            "Floración": 0.9,
            "Fructificación": 1.1,
            "Maduración": 0.6
        };
        return factors[stage] || 1.0;
    },
    
    getPressureFactor(pressure) {
        const factors = {
            "Baja": 0.8,
            "Moderada": 1.0,
            "Alta": 1.2,
            "Severa": 1.5
        };
        return factors[pressure] || 1.0;
    },
    
    getApplicationFrequency(cropType, pesticideType) {
        const frequencies = {
            "Semilla": "Pre-siembra",
            "Hortaliza": "7-14 días",
            "Árbol": "21-30 días",
            "Arbusto": "14-21 días",
            "Forraje": "Cada corte",
            "Tubérculo": "10-20 días"
        };
        
        const baseFreq = frequencies[cropType] || "14-21 días";
        
        // Ajuste por tipo de pesticida
        if (pesticideType === "HERBICIDA") return "1 aplicación por ciclo";
        if (pesticideType === "NEMATICIDA") return "1-2 aplicaciones por año";
        
        return baseFreq;
    },
    
    getApplicationRecommendations(pesticide, crop) {
        const recommendations = [];
        
        // Recomendaciones generales
        if (pesticide.tipo === "INSECTICIDA") {
            recommendations.push("Aplicar al detectar primeros daños");
            recommendations.push("Cubrir bien envés de hojas");
        }
        
        if (pesticide.tipo === "FUNGICIDA") {
            recommendations.push("Aplicar preventivamente");
            recommendations.push("Cubrir toda superficie foliar");
        }
        
        if (pesticide.tipo === "HERBICIDA") {
            recommendations.push("Aplicar con malezas pequeñas");
            recommendations.push("Evitar deriva a cultivos vecinos");
        }
        
        // Recomendaciones específicas por cultivo
        if (crop.tipo === "Árbol") {
            recommendations.push("Aplicar dirigido al follaje");
            recommendations.push("Considerar tamaño del árbol");
        }
        
        if (crop.tipo === "Hortaliza") {
            recommendations.push("Respetar período de carencia");
            recommendations.push("Aplicar en horas frescas");
        }
        
        return recommendations;
    },
    
    // Calculadora de costos
    calculateCost(pesticideId, cropId, area) {
        const pesticide = PESTICIDES_DB.find(p => p.id === pesticideId);
        const crop = CROPS_DB.find(c => c.id === cropId);
        
        if (!pesticide || !crop) return null;
        
        // Extraer precio de la cadena (ej: "$45/L" -> 45)
        const priceMatch = pesticide.precioAprox?.match(/\$([\d.]+)/);
        const unitPrice = priceMatch ? parseFloat(priceMatch[1]) : 50;
        
        // Calcular dosis
        const dose = this.calculateDose(pesticideId, cropId, area, "Vegetativo", "Moderada");
        
        // Costo del producto
        const productCost = dose.dosisTotal * unitPrice;
        
        // Costo de aplicación (estimado)
        const applicationCost = area * 5; // $5 por hectárea
        
        // Costo total
        const totalCost = productCost + applicationCost;
        
        return {
            costoProducto: Math.round(productCost * 100) / 100,
            costoAplicacion: applicationCost,
            costoTotal: Math.round(totalCost * 100) / 100,
            costoPorHectarea: Math.round((totalCost / area) * 100) / 100,
            unidad: pesticide.unidad,
            precioUnitario: unitPrice
        };
    },
    
    // Calculadora de rentabilidad
    calculateProfitability(cropId, pesticideId, area, marketPrice) {
        const crop = CROPS_DB.find(c => c.id === cropId);
        const pesticide = PESTICIDES_DB.find(p => p.id === pesticideId);
        
        if (!crop || !pesticide) return null;
        
        // Extraer rendimiento esperado (ej: "9-12 ton/ha" -> promedio 10.5)
        const yieldMatch = crop.rendimientoEsperado?.match(/([\d.]+)-([\d.]+)/);
        const avgYield = yieldMatch ? (parseFloat(yieldMatch[1]) + parseFloat(yieldMatch[2])) / 2 : 10;
        
        // Calcular producción total
        const totalProduction = avgYield * area;
        
        // Calcular ingresos
        const income = totalProduction * marketPrice;
        
        // Calcular costos
        const costs = this.calculateCost(pesticideId, cropId, area);
        
        if (!costs) return null;
        
        // Ganancia
        const profit = income - costs.costoTotal;
        
        return {
            produccionTotal: Math.round(totalProduction * 100) / 100,
            ingresos: Math.round(income * 100) / 100,
            costos: costs.costoTotal,
            ganancia: Math.round(profit * 100) / 100,
            roi: ((profit / costs.costoTotal) * 100).toFixed(1) + "%",
            toneladasPorHa: avgYield
        };
    }
};

// ============================================
// SISTEMA DE RECOMENDACIONES INTELIGENTES
// ============================================

class RecommendationEngine {
    constructor() {
        this.userHistory = [];
        this.seasonalData = this.getSeasonalData();
    }
    
    getSeasonalData() {
        const month = new Date().getMonth();
        return {
            season: month < 3 ? "Invierno" : month < 6 ? "Primavera" : month < 9 ? "Verano" : "Otoño",
            month: month + 1
        };
    }
    
    // Recomendaciones estacionales
    getSeasonalRecommendations(region) {
        const season = this.seasonalData.season;
        const recommendations = [];
        
        if (season === "Primavera") {
            recommendations.push({
                tipo: "Preventivo",
                mensaje: "Aplicar fungicidas preventivos antes de lluvias",
                productos: [2, 7], // Fungicidas
                cultivos: [1, 2, 5, 6]
            });
            recommendations.push({
                tipo: "Insecticida",
                mensaje: "Control de plagas tempranas en hortalizas",
                productos: [1, 6],
                cultivos: [5, 6, 7, 8]
            });
        }
        
        if (season === "Verano") {
            recommendations.push({
                tipo: "Acaricida",
                mensaje: "Control de ácaros en frutales",
                productos: [4, 9],
                cultivos: [9, 10, 11, 12]
            });
            recommendations.push({
                tipo: "Herbicida",
                mensaje: "Control de malezas en granos",
                productos: [3, 8],
                cultivos: [1, 2, 3, 4]
            });
        }
        
        return recommendations;
    }
    
    // Recomendaciones por tipo de problema
    getProblemRecommendations(problemType, cropId) {
        const crop = CROPS_DB.find(c => c.id === cropId);
        if (!crop) return [];
        
        const recommendations = [];
        
        switch (problemType) {
            case "Insectos":
                recommendations.push(...this.getInsectRecommendations(crop));
                break;
            case "Hongos":
                recommendations.push(...this.getFungusRecommendations(crop));
                break;
            case "Malezas":
                recommendations.push(...this.getWeedRecommendations(crop));
                break;
            case "Ácaros":
                recommendations.push(...this.getMiteRecommendations(crop));
                break;
            case "Nematodos":
                recommendations.push(...this.getNematodeRecommendations(crop));
                break;
        }
        
        return recommendations.slice(0, 3); // Máximo 3 recomendaciones
    }
    
    getInsectRecommendations(crop) {
        const insecticides = PESTICIDES_DB.filter(p => 
            p.tipo === "INSECTICIDA" && 
            p.cultivosPermitidos.includes(crop.id)
        );
        
        return insecticides.map(p => ({
            producto: p.nombre,
            tipo: p.clase,
            dosis: `${p.dosisBase} ${p.unidad}`,
            carencia: `${p.carenciaBase} días`,
            toxicidad: p.toxicidad
        }));
    }
    
    getFungusRecommendations(crop) {
        const fungicides = PESTICIDES_DB.filter(p => 
            p.tipo === "FUNGICIDA" && 
            p.cultivosPermitidos.includes(crop.id)
        );
        
        return fungicides.map(p => ({
            producto: p.nombre,
            tipo: p.clase,
            dosis: `${p.dosisBase} ${p.unidad}`,
            carencia: `${p.carenciaBase} días`,
            modoAccion: p.modoAccion
        }));
    }
    
    getWeedRecommendations(crop) {
        const herbicides = PESTICIDES_DB.filter(p => 
            p.tipo === "HERBICIDA" && 
            p.cultivosPermitidos.includes(crop.id)
        );
        
        return herbicides.map(p => ({
            producto: p.nombre,
            tipo: p.clase,
            dosis: `${p.dosisBase} ${p.unidad}`,
            momento: "Pre o post-emergencia",
            restricciones: p.restricciones[0]
        }));
    }
    
    getMiteRecommendations(crop) {
        const miticides = PESTICIDES_DB.filter(p => 
            p.tipo === "ACARICIDA" && 
            p.cultivosPermitidos.includes(crop.id)
        );
        
        return miticides.map(p => ({
            producto: p.nombre,
            tipo: p.clase,
            dosis: `${p.dosisBase} ${p.unidad}`,
            eficacia: "Ácaros específicos",
            tiempoEfecto: p.tiempoEfecto
        }));
    }
    
    getNematodeRecommendations(crop) {
        const nematicides = PESTICIDES_DB.filter(p => 
            p.tipo === "NEMATICIDA" && 
            p.cultivosPermitidos.includes(crop.id)
        );
        
        return nematicides.map(p => ({
            producto: p.nombre,
            tipo: p.clase,
            dosis: `${p.dosisBase} ${p.unidad}`,
            aplicacion: "Al suelo",
            carencia: `${p.carenciaBase} días`
        }));
    }
    
    // Registro de actividad
    logActivity(activity, details) {
        this.userHistory.push({
            timestamp: new Date().toISOString(),
            activity,
            details,
            season: this.seasonalData.season
        });
        
        // Mantener historial limitado
        if (this.userHistory.length > 100) {
            this.userHistory.shift();
        }
    }
    
    // Estadísticas de uso
    getUsageStatistics() {
        const stats = {
            totalActivities: this.userHistory.length,
            activitiesByType: {},
            recentActivities: this.userHistory.slice(-5),
            favoriteProducts: {},
            favoriteCrops: {}
        };
        
        // Contar actividades por tipo
        this.userHistory.forEach(activity => {
            stats.activitiesByType[activity.activity] = 
                (stats.activitiesByType[activity.activity] || 0) + 1;
        });
        
        return stats;
    }
}

// ============================================
// EXPORTACIÓN PARA USO GLOBAL
// ============================================

window.PESTICIDES_DB = PESTICIDES_DB;
window.CROPS_DB = CROPS_DB;
window.CALCULATION_SYSTEM = CALCULATION_SYSTEM;
window.RecommendationEngine = RecommendationEngine;

// Inicializar motor de recomendaciones
window.recommendationEngine = new RecommendationEngine();

console.log("✅ Sistema de datos agrícolas cargado correctamente");
console.log(`📊 ${PESTICIDES_DB.length} químicos especializados disponibles`);
console.log(`🌱 ${CROPS_DB.length} cultivos registrados (semillas, árboles, hortalizas)`);