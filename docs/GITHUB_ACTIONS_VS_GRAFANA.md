# 🔄 GitHub Actions vs Grafana - Entendiendo las Diferencias

## 🎯 Pregunta Principal

**¿Por qué los tests de GitHub Actions NO aparecen en Grafana?**

---

## 📍 Respuesta Corta

**GitHub Actions** ejecuta los tests en **sus propias máquinas** (en la nube).  
**Grafana** está en **tu servidor VPS**.

Son dos mundos separados que **NO se comunican**.

---

## 🌍 Los Dos Mundos

### MUNDO 1: GitHub Actions ☁️

```
┌─────────────────────────────────────────────┐
│  GitHub Runners (Nube de GitHub)            │
│  Ubicación: Datacenter de Microsoft         │
│  IP: Dinámica (cambia cada vez)             │
│                                             │
│  ┌─────────────────────────────────┐       │
│  │  ubuntu-latest (VM temporal)    │       │
│  │                                 │       │
│  │  1. Clonar repositorio          │       │
│  │  2. Instalar K6 estándar        │       │
│  │  3. Ejecutar tests              │       │
│  │  4. Guardar JSON                │       │
│  │  5. Subir artifacts             │       │
│  │                                 │       │
│  │  localhost:9090 = 127.0.0.1     │       │
│  │  (esta máquina virtual)         │       │
│  └─────────────────────────────────┘       │
│                                             │
│  ❌ NO puede acceder a:                    │
│     vps-master.duckdns.org:9090            │
│     (tendría que ser público con auth)     │
└─────────────────────────────────────────────┘
```

**Características:**
- ✅ Ejecución automática (push, PR, schedule)
- ✅ Sin configuración de servidor
- ✅ Historial en GitHub
- ✅ Reportes en PRs
- ❌ NO envía a Prometheus
- ❌ NO aparece en Grafana

---

### MUNDO 2: Tu Servidor VPS 🖥️

```
┌─────────────────────────────────────────────┐
│  vps-master.duckdns.org                     │
│  IP: 74.208.45.131                          │
│  Ubicación: Tu datacenter                   │
│                                             │
│  ┌─────────────────────────────────┐       │
│  │  K6 + extensión prometheus      │       │
│  │         ↓ POST cada 5s          │       │
│  │  ┌─────────────────────┐        │       │
│  │  │   Prometheus        │        │       │
│  │  │   localhost:9090    │        │       │
│  │  └──────────┬──────────┘        │       │
│  │             ↓ scrape             │       │
│  │  ┌─────────────────────┐        │       │
│  │  │   Grafana           │        │       │
│  │  │   localhost:3000    │        │       │
│  │  └─────────────────────┘        │       │
│  └─────────────────────────────────┘       │
│                                             │
│  ✅ Prometheus recibe métricas             │
│  ✅ Grafana muestra dashboards             │
└─────────────────────────────────────────────┘
```

**Características:**
- ✅ K6 con extensión (prometheus-remote-write)
- ✅ Envía a Prometheus local
- ✅ Visualización en Grafana
- ✅ Gráficas en tiempo real
- ❌ Ejecución manual (SSH)
- ❌ No automático

---

## 🔀 Tabla Comparativa

| Característica | GitHub Actions | Servidor + Grafana |
|----------------|---------------|-------------------|
| **Ubicación** | Nube de GitHub | Tu servidor VPS |
| **Ejecución** | ✅ Automática | ❌ Manual (SSH) |
| **K6 version** | Estándar | Con extensión |
| **Output** | JSON files | Prometheus metrics |
| **Visualización** | GitHub UI | Grafana Dashboard |
| **Tiempo real** | ❌ No | ✅ Sí |
| **Historial** | ✅ 30+ días | ⚠️ Según retención |
| **CI/CD** | ✅ Perfecto | ❌ No automático |
| **Monitoreo** | ❌ Limitado | ✅ Completo |

---

## 🎯 Casos de Uso

### Usar GitHub Actions cuando:
- ✅ Quieres validar **cada cambio** automáticamente
- ✅ Necesitas bloquear merges si performance es mala
- ✅ Quieres reportes en Pull Requests
- ✅ Buscas integración con CI/CD
- ✅ No necesitas gráficas fancy (JSON es suficiente)

### Usar Servidor + Grafana cuando:
- ✅ Quieres ver **métricas en tiempo real**
- ✅ Necesitas **análisis profundo** de performance
- ✅ Quieres **dashboards visuales** bonitos
- ✅ Buscas **monitoreo continuo**
- ✅ Necesitas **comparar múltiples ejecuciones**

---

## 🚀 Estrategia Recomendada

### Opción A: Enfoque Híbrido (Recomendado) ⭐

**GitHub Actions para CI/CD:**
```yaml
# Workflow actual: .github/workflows/k6-load-testing.yml
# - Ejecuta en cada push/PR
# - Valida que no haya errores
# - Genera reportes
# - Sube artifacts
```

**Servidor para análisis profundo:**
```bash
# Ejecutar manualmente cuando necesites análisis:
ssh root@vps-master.duckdns.org
cd /home/github/tourist_app_arroyo_seco
./monitoring/k6/run-all-tests.sh
# Ver en: https://vps-master.duckdns.org/grafana/
```

**Ventajas:**
- ✅ Lo mejor de ambos mundos
- ✅ Tests automáticos en CI/CD
- ✅ Análisis profundo cuando lo necesitas
- ✅ No complica la configuración

---

### Opción B: Todo en Servidor (Grafana Siempre)

**Modificar workflow para ejecutar en servidor:**
- Archivo creado: `.github/workflows/k6-remote-execution.yml`
- GitHub Actions se conecta vía SSH a tu servidor
- Ejecuta tests ALLÍ (donde está Prometheus)
- Métricas SÍ llegan a Grafana

**Requiere:**
1. Configurar SSH key en GitHub Secrets
2. Abrir puerto SSH en servidor (o usar VPN)
3. Mantener servidor siempre disponible

**Ventajas:**
- ✅ Automatización + Grafana
- ✅ Todo centralizado

**Desventajas:**
- ❌ Más complejo de configurar
- ❌ Dependencia del servidor
- ❌ Riesgo de seguridad (exponer SSH)

---

## 📊 ¿Qué Muestra Cada Uno?

### GitHub Actions - Summary

```
📊 Resultados - Landing Page

| Métrica            | Valor      |
|--------------------|------------|
| Total Requests     | 1,234      |
| Failed Rate        | 2.34%      |
| Avg Duration       | 234.56ms   |
| P95 Duration       | 456.78ms   |

✅ Thresholds: PASSED
```

### Grafana Dashboard - Gráficas

```
[Gráfica de línea mostrando:]
- HTTP Requests/second a lo largo del tiempo
- Response time (P50, P95, P99) fluctuando
- VUs (usuarios) subiendo y bajando (rampa)
- Error rate en tiempo real
- Checks success rate

Todo con colores, tooltips, zoom, etc.
```

---

## 🔧 ¿Cómo Funciona Cada Uno?

### GitHub Actions (Actual)

```yaml
# 1. GitHub detecta push
on:
  push:
    branches: [main, TEST]

# 2. Ejecuta en runner de GitHub
jobs:
  test-landing:
    runs-on: ubuntu-latest  # ← Máquina de GitHub
    steps:
      - uses: actions/checkout@v4
      - run: |
          sudo apt-get install k6  # ← K6 estándar
          k6 run \
            --out json=results.json \  # ← Solo JSON
            load-test.js

# 3. Resultado: JSON en artifacts
# ❌ NO conecta a Prometheus
```

### Servidor (Con Grafana)

```bash
# 1. Ejecutas manualmente
./monitoring/k6/run-all-tests.sh

# 2. Script usa K6 con extensión
K6_PROMETHEUS_RW_SERVER_URL=http://localhost:9090/prometheus/api/v1/write \
k6-prometheus run \
  -o experimental-prometheus-rw \  # ← Envía a Prometheus
  load-test.js

# 3. Mientras corre:
K6 → (POST cada 5s) → Prometheus → Grafana
                                      ↓
                              Dashboard se actualiza

# ✅ Visualización en tiempo real
```

---

## 💡 Para tu Entregable

### Lo que DEBES mostrar:

1. **GitHub Actions:**
   - ✅ Captura del workflow ejecutándose
   - ✅ Captura de resultados en Summary
   - ✅ Captura de artifacts generados
   - ✅ Código del workflow (.yml)

2. **Grafana:**
   - ✅ Captura del dashboard con métricas
   - ✅ Debe mostrar datos de UNA EJECUCIÓN MANUAL
   - ✅ Ejecutada en el SERVIDOR con `run-all-tests.sh`

### Explicación en el PDF:

```
"Se implementaron dos formas de ejecutar las pruebas:

1. GitHub Actions (CI/CD automático):
   - Se ejecuta automáticamente en cada push
   - Valida thresholds y genera reportes
   - Resultados en formato JSON

2. Servidor + Grafana (Análisis profundo):
   - Se ejecuta manualmente en el servidor
   - Envía métricas a Prometheus en tiempo real
   - Visualización en dashboards de Grafana

Ambos métodos son complementarios y sirven
propósitos diferentes dentro del pipeline."
```

---

## ✅ Conclusión

**No es un BUG, es por DISEÑO:**

- GitHub Actions = CI/CD automático (validación)
- Servidor + Grafana = Monitoreo profundo (análisis)

**Para el entregable:**
- Usa GitHub Actions para mostrar automatización
- Usa Servidor para mostrar Grafana
- Explica que son complementarios

**Ambos sistemas funcionan correctamente, solo que en diferentes contextos.**

---

## 🎓 Respuesta a tu Pregunta Original

> "¿Por qué los tests de GitHub NO se vieron reflejados en Grafana?"

**Respuesta:**

Porque GitHub Actions ejecuta K6 en una máquina virtual en la nube que NO tiene acceso a tu Prometheus local. Es como si dos personas en ciudades diferentes escribieran en cuadernos diferentes: no se pueden ver lo que escribe el otro.

Para que aparezca en Grafana, los tests DEBEN ejecutarse en el mismo servidor donde está Prometheus (tu VPS), usando K6 con la extensión de prometheus-remote-write.

---

**¿Quedó más claro? 🚀**

