// ============================================
// CORRECCIONES PARA TU APP.JS - VERSIÓN FUNCIONAL
// ============================================

// Función global para alertas
window.showAlert = function(message, type = 'info') {
    // Eliminar alertas existentes
    document.querySelectorAll('.toast').forEach(toast => toast.remove());
    
    // Crear alerta
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    // Icono según tipo
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'warning') icon = 'exclamation-triangle';
    if (type === 'danger' || type === 'error') icon = 'times-circle';
    
    toast.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
    `;
    
    const toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        const container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
        container.appendChild(toast);
    } else {
        toastContainer.appendChild(toast);
    }
    
    // Mostrar con animación
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Auto-eliminar después de 5 segundos
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 5000);
};

document.addEventListener('DOMContentLoaded', function() {
    initApplication();
});

async function initApplication() {
    console.log('🌱 Iniciando AgroTracebility...');
    
    try {
        // 1. Configurar eventos
        setupEventListeners();
        
        // 2. Configurar valores por defecto
        setDefaultValues();
        
        // 3. Configurar autocompletado
        setupAutocomplete();
        
        console.log('✅ AgroTracebility inicializado correctamente');
        showAlert('Sistema listo para usar', 'success');
        
    } catch (error) {
        console.error('❌ Error al inicializar:', error);
        showAlert('Error al iniciar la aplicación', 'danger');
    }
}

// ============================================
// FUNCIONES DE INICIALIZACIÓN
// ============================================

function setDefaultValues() {
    // Valores por defecto para pruebas
    const tempInput = document.getElementById('temp-manual');
    const humInput = document.getElementById('hum-manual');
    const windInput = document.getElementById('wind-manual');
    const tiempoInput = document.getElementById('tiempo-exposicion');
    const areaInput = document.getElementById('area');
    
    if (tempInput) tempInput.value = '25';
    if (humInput) humInput.value = '60';
    if (windInput) windInput.value = '5';
    if (tiempoInput) tiempoInput.value = '120';
    if (areaInput) areaInput.value = '1.0';
}

function setupAutocomplete() {
    console.log('🔧 Configurando autocompletado...');
    
    // Configurar autocompletado para plaguicidas
    setupPesticideAutocomplete();
    
    // Configurar autocompletado para cultivos
    setupCropAutocomplete();
}

// ============================================
// AUTOCOMPLETADO PARA PLAGUICIDAS
// ============================================

function setupPesticideAutocomplete() {
    const tipoSelect = document.getElementById('tipo-plaguicida');
    const plaguicidaInput = document.getElementById('plaguicida-input');
    
    if (!tipoSelect || !plaguicidaInput) {
        console.error('❌ Elementos de plaguicida no encontrados');
        return;
    }
    
    // Evento cuando cambia el tipo
    tipoSelect.addEventListener('change', function() {
        const tipo = this.value;
        plaguicidaInput.value = '';
        
        if (tipo) {
            plaguicidaInput.disabled = false;
            plaguicidaInput.placeholder = `Buscar ${tipo.toLowerCase()}...`;
        } else {
            plaguicidaInput.disabled = true;
            plaguicidaInput.placeholder = 'Seleccione tipo primero...';
        }
        
        // Ocultar detalles previos
        const detailsDiv = document.getElementById('plaguicida-details');
        if (detailsDiv) detailsDiv.style.display = 'none';
    });
    
    // Evento de búsqueda en tiempo real
    plaguicidaInput.addEventListener('input', function() {
        const tipo = tipoSelect.value;
        const query = this.value.toLowerCase();
        const suggestionsDiv = this.parentElement.querySelector('.autocomplete-suggestions');
        
        if (!tipo || query.length < 2) {
            if (suggestionsDiv) suggestionsDiv.innerHTML = '';
            return;
        }
        
        // Filtrar plaguicidas
        const filtered = PESTICIDES_DB.filter(p => 
            p.tipo === tipo && 
            p.nombre.toLowerCase().includes(query)
        );
        
        showAutocompleteSuggestions(filtered, suggestionsDiv, 'plaguicida');
    });
    
    // Evento para cerrar sugerencias al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.autocomplete-container')) {
            document.querySelectorAll('.autocomplete-suggestions').forEach(div => {
                div.innerHTML = '';
            });
        }
    });
}

// ============================================
// AUTOCOMPLETADO PARA CULTIVOS
// ============================================

function setupCropAutocomplete() {
    const cultivoInput = document.getElementById('cultivo-input');
    
    if (!cultivoInput) {
        console.error('❌ Elemento de cultivo no encontrado');
        return;
    }
    
    // Evento de búsqueda en tiempo real
    cultivoInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        const suggestionsDiv = this.parentElement.querySelector('.autocomplete-suggestions');
        
        if (query.length < 2) {
            if (suggestionsDiv) suggestionsDiv.innerHTML = '';
            return;
        }
        
        // Filtrar cultivos
        const filtered = CROPS_DB.filter(c => 
            c.nombre.toLowerCase().includes(query) ||
            (c.tipo && c.tipo.toLowerCase().includes(query))
        );
        
        showAutocompleteSuggestions(filtered, suggestionsDiv, 'cultivo');
    });
}

function showAutocompleteSuggestions(items, container, type) {
    if (!container) return;
    
    if (items.length === 0) {
        container.innerHTML = `
            <div style="padding: 10px; color: #666; font-size: 0.9rem; text-align: center;">
                No se encontraron resultados
            </div>
        `;
        return;
    }
    
    let html = '';
    
    items.forEach(item => {
        html += `
            <div class="autocomplete-suggestion" 
                 data-id="${item.id}"
                 data-name="${item.nombre}"
                 data-type="${type}">
                ${item.nombre}
                ${type === 'plaguicida' ? `<small style="color: #666; float: right;">${item.toxicidad}</small>` : ''}
            </div>
        `;
    });
    
    container.innerHTML = html;
    
    // Agregar eventos a las sugerencias
    container.querySelectorAll('.autocomplete-suggestion').forEach(suggestion => {
        suggestion.addEventListener('click', function() {
            selectAutocompleteItem(this);
        });
    });
}

function selectAutocompleteItem(element) {
    const id = element.dataset.id;
    const name = element.dataset.name;
    const type = element.dataset.type;
    
    if (type === 'plaguicida') {
        const input = document.getElementById('plaguicida-input');
        const detailsDiv = document.getElementById('plaguicida-details');
        
        if (input) input.value = name;
        
        // Buscar el plaguicida en la base de datos
        const pesticide = PESTICIDES_DB.find(p => p.id === parseInt(id));
        if (pesticide && detailsDiv) {
            detailsDiv.innerHTML = generatePesticideDetails(pesticide);
            detailsDiv.style.display = 'block';
        }
        
        // Almacenar ID seleccionado
        window.selectedPesticideId = id;
        
    } else if (type === 'cultivo') {
        const input = document.getElementById('cultivo-input');
        const detailsDiv = document.getElementById('cultivo-details');
        
        if (input) input.value = name;
        
        // Buscar el cultivo en la base de datos
        const crop = CROPS_DB.find(c => c.id === parseInt(id));
        if (crop && detailsDiv) {
            detailsDiv.innerHTML = generateCropDetails(crop);
            detailsDiv.style.display = 'block';
        }
        
        // Almacenar ID seleccionado
        window.selectedCropId = id;
    }
    
    // Ocultar sugerencias
    element.parentElement.innerHTML = '';
    
    showAlert(`✅ ${name} seleccionado`, 'success');
}

function generatePesticideDetails(pesticide) {
    const toxicityColor = {
        'Alta': '#EF4444',
        'Media': '#F59E0B',
        'Baja': '#10B981'
    };
    
    return `
        <div style="background: #F5F3FF; padding: 12px; border-radius: 8px; margin-top: 10px;">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                <i class="${pesticide.icono || 'fas fa-spray-can'}" style="color: #7C3AED;"></i>
                <div>
                    <strong>${pesticide.nombre}</strong>
                    <div style="font-size: 0.8rem; color: #666;">
                        ${pesticide.tipo} • 
                        <span style="color: ${toxicityColor[pesticide.toxicidad] || '#666'}">
                            ${pesticide.toxicidad}
                        </span>
                    </div>
                </div>
            </div>
            <div style="font-size: 0.9rem;">
                <div><strong>Dosis base:</strong> ${pesticide.dosisBase} ${pesticide.unidad}</div>
                <div><strong>Carencia:</strong> ${pesticide.carenciaBase} días</div>
            </div>
        </div>
    `;
}

function generateCropDetails(crop) {
    return `
        <div style="background: #F0F9FF; padding: 12px; border-radius: 8px; margin-top: 10px;">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                <i class="${crop.icono || 'fas fa-seedling'}" style="color: #10B981;"></i>
                <div>
                    <strong>${crop.nombre}</strong>
                    <div style="font-size: 0.8rem; color: #666;">
                        ${crop.tipo || 'Cultivo'}
                    </div>
                </div>
            </div>
            <div style="font-size: 0.9rem;">
                <div><strong>Ciclo:</strong> ${crop.cicloDias || 'N/A'} días</div>
                <div><strong>Rendimiento:</strong> ${crop.rendimientoEsperado || 'N/A'}</div>
            </div>
        </div>
    `;
}

// ============================================
// CÁLCULO DE DOSIS - VERSIÓN CORREGIDA
// ============================================

function calculateDosis() {
    try {
        console.log('🧮 Calculando dosis...');
        
        // Obtener IDs seleccionados (de las variables globales)
        const pesticideId = window.selectedPesticideId;
        const cropId = window.selectedCropId;
        
        // Obtener área
        const areaInput = document.getElementById('area');
        const area = areaInput ? parseFloat(areaInput.value) : 0;
        
        // Validaciones
        if (!pesticideId) throw new Error('Seleccione un plaguicida');
        if (!cropId) throw new Error('Seleccione un cultivo');
        if (!area || area <= 0 || isNaN(area)) throw new Error('Ingrese un área válida (mayor que 0)');
        
        // Obtener datos completos
        const pesticide = PESTICIDES_DB.find(p => p.id === parseInt(pesticideId));
        const crop = CROPS_DB.find(c => c.id === parseInt(cropId));
        
        if (!pesticide || !crop) {
            throw new Error('Datos no encontrados en la base de datos');
        }
        
        // Obtener condiciones ambientales
        const temp = parseFloat(document.getElementById('temp-manual').value) || 25;
        const humidity = parseFloat(document.getElementById('hum-manual').value) || 60;
        const wind = parseFloat(document.getElementById('wind-manual').value) || 5;
        
        console.log('📊 Datos para cálculo:', { pesticide, crop, area, temp, humidity, wind });
        
        // 1. Calcular dosis base ajustada por cultivo
        // Usar factorDosis si existe en el cultivo, sino usar 1.0
        const cropFactor = crop.factorDosis || 1.0;
        let dosisAjustada = pesticide.dosisBase * cropFactor;
        
        console.log('📈 Dosis base ajustada por cultivo:', dosisAjustada);
        
        // 2. Ajustar por condiciones ambientales
        const factorAmbiental = calculateEnvironmentalFactor(temp, humidity, wind);
        dosisAjustada *= factorAmbiental;
        
        console.log('🌡️ Factor ambiental:', factorAmbiental);
        console.log('📊 Dosis ajustada por ambiente:', dosisAjustada);
        
        // 3. Calcular cantidad total
        const cantidadTotal = dosisAjustada * area;
        
        console.log('🧪 Cantidad total:', cantidadTotal);
        
        // 4. Calcular carencia final
        const carenciaFinal = calculateFinalCarency(
            pesticide.carenciaBase,
            crop.tipo,
            temp,
            pesticide.toxicidad
        );
        
        // 5. Calcular próxima aplicación
        const nextApplication = calculateNextApplication(carenciaFinal);
        
        // Guardar cálculo en estado
        window.currentCalculation = {
            pesticide: pesticide,
            crop: crop,
            area: area,
            dosisAjustada: dosisAjustada,
            cantidadTotal: cantidadTotal,
            carenciaFinal: carenciaFinal,
            nextApplication: nextApplication,
            condiciones: { temp, humidity, wind },
            timestamp: new Date().toISOString()
        };
        
        // Mostrar resultados
        displayResults(dosisAjustada, cantidadTotal, carenciaFinal, nextApplication, pesticide);
        
        // Habilitar botón de registrar
        const registrarBtn = document.getElementById('registrar-btn');
        if (registrarBtn) registrarBtn.disabled = false;
        
        // Mostrar alerta de éxito
        showAlert('✅ Cálculo completado correctamente', 'success');
        
    } catch (error) {
        console.error('❌ Error en cálculo:', error);
        showAlert(`❌ ${error.message}`, 'danger');
    }
}

function calculateEnvironmentalFactor(temp, humidity, wind) {
    let factor = 1.0;
    
    // Factor temperatura
    if (temp < 10) factor *= 1.3;
    else if (temp <= 15) factor *= 1.2;
    else if (temp <= 20) factor *= 1.1;
    else if (temp <= 25) factor *= 1.0;
    else if (temp <= 30) factor *= 0.9;
    else if (temp <= 35) factor *= 0.8;
    else factor *= 0.6;
    
    // Factor humedad
    if (humidity < 40) factor *= 1.2;
    else if (humidity <= 60) factor *= 1.1;
    else if (humidity <= 80) factor *= 1.0;
    else if (humidity <= 85) factor *= 0.9;
    else factor *= 0.8;
    
    // Factor viento
    if (wind < 5) factor *= 1.0;
    else if (wind <= 10) factor *= 0.9;
    else if (wind <= 15) factor *= 0.7;
    else factor *= 0.0; // No aplicar con viento fuerte
    
    return factor;
}

function calculateFinalCarency(carenciaBase, cropType, temp, toxicidad) {
    let carencia = carenciaBase;
    
    // Ajustar por tipo de cultivo
    const cropFactors = {
        "Hortaliza": 1.2,
        "Grano": 1.0,
        "Frutal": 1.5,
        "Tubérculo": 1.3,
        "Semilla": 1.0,
        "Árbol": 1.5,
        "Arbusto": 1.3,
        "Forraje": 0.8
    };
    carencia *= cropFactors[cropType] || 1.0;
    
    // Ajustar por temperatura
    if (temp > 30) carencia *= 1.1;
    if (temp > 35) carencia *= 1.2;
    
    // Ajustar por toxicidad (mínimo)
    const minDays = {
        "Alta": 21,
        "Media": 14,
        "Baja": 7
    };
    carencia = Math.max(carencia, minDays[toxicidad] || 7);
    
    return Math.ceil(carencia);
}

function calculateNextApplication(carenciaFinal) {
    const today = new Date();
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + carenciaFinal);
    
    return nextDate.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

function displayResults(dosisAjustada, cantidadTotal, carenciaFinal, nextApplication, pesticide) {
    const resultsContainer = document.getElementById('results-container');
    const dosisResult = document.getElementById('dosis-result');
    const totalResult = document.getElementById('total-result');
    const carenciaResult = document.getElementById('carencia-result');
    const proximaAplicacion = document.getElementById('proxima-aplicacion');
    const statusMessage = document.getElementById('status-message');
    
    if (!resultsContainer || !dosisResult) {
        console.error('❌ Elementos de resultados no encontrados');
        return;
    }
    
    // Mostrar resultados - verificar que no sean NaN
    if (isNaN(dosisAjustada) || isNaN(cantidadTotal)) {
        console.error('❌ Valores NaN en resultados');
        showAlert('Error en el cálculo: valores no válidos', 'danger');
        return;
    }
    
    dosisResult.textContent = `${dosisAjustada.toFixed(3)} ${pesticide.unidad}`;
    totalResult.textContent = `${cantidadTotal.toFixed(3)} ${pesticide.unidad.split('/')[0] || 'unidades'}`;
    carenciaResult.textContent = `${carenciaFinal} días`;
    
    if (proximaAplicacion) {
        proximaAplicacion.textContent = nextApplication;
    }
    
    // Actualizar mensaje de estado
    if (statusMessage) {
        statusMessage.textContent = 'Cálculo validado y listo para registrar';
    }
    
    // Mostrar contenedor de resultados
    resultsContainer.style.display = 'block';
}

// ============================================
// CONFIGURACIÓN DE EVENTOS
// ============================================

function setupEventListeners() {
    console.log('🔗 Configurando eventos...');
    
    // Botón calcular
    const calcularBtn = document.getElementById('calcular-btn');
    if (calcularBtn) {
        calcularBtn.addEventListener('click', calculateDosis);
        console.log('✅ Evento calcular configurado');
    }
    
    // Botón registrar
    const registrarBtn = document.getElementById('registrar-btn');
    if (registrarBtn) {
        registrarBtn.addEventListener('click', registerApplication);
        console.log('✅ Evento registrar configurado');
    }
    
    // Botón limpiar
    const limpiarBtn = document.getElementById('limpiar-btn');
    if (limpiarBtn) {
        limpiarBtn.addEventListener('click', clearForm);
        console.log('✅ Evento limpiar configurado');
    }
    
    // Botón historial
    const historialBtn = document.getElementById('historial-btn');
    if (historialBtn) {
        historialBtn.addEventListener('click', function() {
            showAlert('Funcionalidad de historial en desarrollo', 'info');
        });
        console.log('✅ Evento historial configurado');
    }
    
    // Botón NFC
    const nfcBtn = document.getElementById('nfc-simulate');
    if (nfcBtn) {
        nfcBtn.addEventListener('click', simulateNFCScan);
        console.log('✅ Evento NFC configurado');
    }
    
    // EPI items
    document.querySelectorAll('.epi-item').forEach(item => {
        item.addEventListener('click', function() {
            const epi = this.getAttribute('data-epi');
            const checkbox = this.querySelector('input[type="checkbox"]');
            if (checkbox) {
                checkbox.checked = !checkbox.checked;
                this.classList.toggle('active', checkbox.checked);
            }
        });
    });
    
    // Validar clima en tiempo real
    ['temp-manual', 'hum-manual', 'wind-manual'].forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', updateWeatherRecommendation);
        }
    });
    
    console.log('✅ Todos los eventos configurados');
}

function updateWeatherRecommendation() {
    const temp = parseFloat(document.getElementById('temp-manual').value) || 25;
    const wind = parseFloat(document.getElementById('wind-manual').value) || 5;
    const adviceElement = document.getElementById('weather-advice');
    
    if (!adviceElement) return;
    
    const recContent = adviceElement.querySelector('.rec-content p');
    if (!recContent) return;
    
    let recommendation = '✅ Condiciones favorables para aplicación';
    
    if (temp > 35) {
        recommendation = '⚠️ Temperatura muy alta - Evitar aplicación';
    } else if (temp > 30) {
        recommendation = '⚠️ Temperatura alta - Aplicar en horas frescas';
    } else if (wind > 15) {
        recommendation = '❌ Viento fuerte - NO APLICAR';
    } else if (wind > 10) {
        recommendation = '⚠️ Viento moderado - Usar boquillas antideriva';
    }
    
    recContent.textContent = recommendation;
}

// ============================================
// FUNCIONES DE UTILIDAD
// ============================================

function clearForm() {
    console.log('🧹 Limpiando formulario...');
    
    // Limpiar autocompletado de plaguicida
    const tipoSelect = document.getElementById('tipo-plaguicida');
    if (tipoSelect) tipoSelect.value = '';
    
    const plaguicidaInput = document.getElementById('plaguicida-input');
    if (plaguicidaInput) {
        plaguicidaInput.value = '';
        plaguicidaInput.disabled = true;
        plaguicidaInput.placeholder = 'Seleccione tipo primero';
    }
    
    const plaguicidaDetails = document.getElementById('plaguicida-details');
    if (plaguicidaDetails) {
        plaguicidaDetails.style.display = 'none';
        plaguicidaDetails.innerHTML = '';
    }
    
    // Limpiar autocompletado de cultivo
    const cultivoInput = document.getElementById('cultivo-input');
    if (cultivoInput) cultivoInput.value = '';
    
    const cultivoDetails = document.getElementById('cultivo-details');
    if (cultivoDetails) {
        cultivoDetails.style.display = 'none';
        cultivoDetails.innerHTML = '';
    }
    
    // Limpiar otros campos
    const areaInput = document.getElementById('area');
    if (areaInput) areaInput.value = '1.0';
    
    const observaciones = document.getElementById('observaciones');
    if (observaciones) observaciones.value = '';
    
    const tempInput = document.getElementById('temp-manual');
    if (tempInput) tempInput.value = '25';
    
    const humInput = document.getElementById('hum-manual');
    if (humInput) humInput.value = '60';
    
    const windInput = document.getElementById('wind-manual');
    if (windInput) windInput.value = '5';
    
    const tiempoInput = document.getElementById('tiempo-exposicion');
    if (tiempoInput) tiempoInput.value = '120';
    
    // Limpiar resultados
    const resultsContainer = document.getElementById('results-container');
    if (resultsContainer) resultsContainer.style.display = 'none';
    
    const registrarBtn = document.getElementById('registrar-btn');
    if (registrarBtn) registrarBtn.disabled = true;
    
    // Limpiar EPI
    document.querySelectorAll('.epi-item').forEach(item => {
        item.classList.remove('active');
        const checkbox = item.querySelector('input[type="checkbox"]');
        if (checkbox) checkbox.checked = false;
    });
    
    // Limpiar variables globales
    window.selectedPesticideId = null;
    window.selectedCropId = null;
    window.currentCalculation = null;
    
    showAlert('Formulario limpiado correctamente', 'info');
}

// ============================================
// SIMULACIÓN NFC
// ============================================

function simulateNFCScan() {
    const nfcBtn = document.getElementById('nfc-simulate');
    const nfcInfo = document.getElementById('nfc-info');
    const loteId = document.getElementById('lote-id');
    const loteCultivo = document.getElementById('lote-cultivo');
    const loteArea = document.getElementById('lote-area');
    
    if (!nfcBtn) return;
    
    console.log('📱 Simulando escaneo NFC...');
    
    // Simular escaneo
    nfcBtn.disabled = true;
    nfcBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Escaneando...';
    
    setTimeout(() => {
        // Datos simulados
        const cultivos = ['Maíz', 'Trigo', 'Soya', 'Tomate', 'Papa'];
        const cultivoAleatorio = cultivos[Math.floor(Math.random() * cultivos.length)];
        const areaAleatoria = (Math.random() * 4 + 1).toFixed(1);
        
        // Actualizar UI
        if (loteId) loteId.textContent = `LT-${Math.floor(Math.random() * 9000 + 1000)}`;
        if (loteCultivo) loteCultivo.textContent = cultivoAleatorio;
        if (loteArea) loteArea.textContent = `${areaAleatoria} ha`;
        
        if (nfcInfo) nfcInfo.style.display = 'block';
        
        // Rellenar automáticamente el formulario
        const cultivoInput = document.getElementById('cultivo-input');
        const areaInput = document.getElementById('area');
        
        if (cultivoInput) cultivoInput.value = cultivoAleatorio;
        if (areaInput) areaInput.value = areaAleatoria;
        
        // Buscar y seleccionar cultivo automáticamente
        const crop = CROPS_DB.find(c => c.nombre === cultivoAleatorio);
        if (crop) {
            window.selectedCropId = crop.id;
            const detailsDiv = document.getElementById('cultivo-details');
            if (detailsDiv) {
                detailsDiv.innerHTML = generateCropDetails(crop);
                detailsDiv.style.display = 'block';
            }
        }
        
        nfcBtn.disabled = false;
        nfcBtn.innerHTML = '<i class="fas fa-qrcode"></i> Simular Escaneo NFC';
        
        showAlert(`Lote escaneado correctamente: ${cultivoAleatorio}`, 'success');
        console.log('✅ NFC simulado correctamente');
        
    }, 1500);
}

// ============================================
// REGISTRO DE APLICACIÓN
// ============================================

function registerApplication() {
    try {
        if (!window.currentCalculation) {
            throw new Error('Primero realice un cálculo');
        }
        
        console.log('💾 Registrando aplicación...');
        
        // Crear registro
        const registro = {
            ...window.currentCalculation,
            id: Date.now().toString(36) + Math.random().toString(36).substr(2),
            fechaCreacion: new Date().toISOString(),
            observaciones: document.getElementById('observaciones').value || ''
        };
        
        console.log('📋 Registro creado:', registro);
        
        // Mostrar mensaje de éxito
        showAlert('✅ Aplicación registrada exitosamente', 'success');
        
        // Limpiar formulario después de registrar
        setTimeout(() => {
            clearForm();
        }, 2000);
        
    } catch (error) {
        console.error('❌ Error al registrar:', error);
        showAlert(`❌ ${error.message}`, 'danger');
    }
}

console.log('✨ AgroTracebility cargado - Listo para usar');
