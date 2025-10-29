#!/bin/bash
################################################################################
# Script para ejecutar todos los tests de K6 automáticamente
# Detecta todos los archivos load-test-*.js y los ejecuta
################################################################################

set -e

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuración
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
RESULTS_DIR="monitoring/k6/results/${TIMESTAMP}"
K6_DIR="monitoring/k6"

# Navegar al directorio del proyecto
cd "$(dirname "$0")/../.."

# Crear directorio de resultados
mkdir -p "$RESULTS_DIR"

echo -e "${BLUE}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║       K6 LOAD TESTING - AUTOMATED TEST EXECUTION              ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${GREEN}📅 Fecha:${NC} $(date '+%Y-%m-%d %H:%M:%S')"
echo -e "${GREEN}📁 Resultados:${NC} $RESULTS_DIR"
echo ""

# Encontrar todos los archivos de test
TEST_FILES=($(find "$K6_DIR" -maxdepth 1 -name "load-test-*.js" -type f | sort))

if [ ${#TEST_FILES[@]} -eq 0 ]; then
    echo -e "${RED}❌ No se encontraron archivos de test en $K6_DIR${NC}"
    exit 1
fi

echo -e "${YELLOW}🔍 Tests encontrados: ${#TEST_FILES[@]}${NC}"
for file in "${TEST_FILES[@]}"; do
    echo "   - $(basename $file)"
done
echo ""

# Contador de tests
TOTAL_TESTS=${#TEST_FILES[@]}
CURRENT_TEST=0
PASSED_TESTS=0
FAILED_TESTS=0

# Ejecutar cada test
for TEST_FILE in "${TEST_FILES[@]}"; do
    CURRENT_TEST=$((CURRENT_TEST + 1))
    TEST_NAME=$(basename "$TEST_FILE" .js)
    
    echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
    echo -e "${GREEN}🚀 Test $CURRENT_TEST/$TOTAL_TESTS: $TEST_NAME${NC}"
    echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
    
    # Archivos de salida
    SUMMARY_FILE="$RESULTS_DIR/${TEST_NAME}-summary.json"
    OUTPUT_FILE="$RESULTS_DIR/${TEST_NAME}-output.json"
    LOG_FILE="$RESULTS_DIR/${TEST_NAME}.log"
    
    # Ejecutar K6 con exportación a Prometheus
    echo -e "${YELLOW}⏳ Ejecutando test...${NC}"
    
    if K6_PROMETHEUS_RW_SERVER_URL=http://localhost:9090/prometheus/api/v1/write \
       K6_PROMETHEUS_RW_PUSH_INTERVAL=5s \
       k6 run \
         -o experimental-prometheus-rw \
         --tag testid=${TEST_NAME}-${TIMESTAMP} \
         --tag environment=production \
         --summary-export="$SUMMARY_FILE" \
         --out json="$OUTPUT_FILE" \
         "$TEST_FILE" 2>&1 | tee "$LOG_FILE"; then
        
        echo -e "${GREEN}✅ Test completado exitosamente${NC}"
        PASSED_TESTS=$((PASSED_TESTS + 1))
    else
        echo -e "${RED}❌ Test falló${NC}"
        FAILED_TESTS=$((FAILED_TESTS + 1))
    fi
    
    echo ""
    
    # Pequeña pausa entre tests
    if [ $CURRENT_TEST -lt $TOTAL_TESTS ]; then
        echo -e "${YELLOW}⏸️  Pausa de 5 segundos antes del siguiente test...${NC}"
        sleep 5
        echo ""
    fi
done

# Resumen final
echo -e "${BLUE}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                    RESUMEN FINAL                               ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${GREEN}📊 Tests ejecutados:${NC} $TOTAL_TESTS"
echo -e "${GREEN}✅ Tests exitosos:${NC} $PASSED_TESTS"
echo -e "${RED}❌ Tests fallidos:${NC} $FAILED_TESTS"
echo ""
echo -e "${GREEN}📁 Resultados guardados en:${NC}"
echo "   $RESULTS_DIR"
echo ""
echo -e "${YELLOW}📈 Ver métricas en:${NC}"
echo "   • Prometheus: https://vps-master.duckdns.org/prometheus/graph"
echo "   • Grafana: https://vps-master.duckdns.org/grafana/"
echo ""

# Listar archivos generados
if [ -d "$RESULTS_DIR" ] && [ "$(ls -A $RESULTS_DIR)" ]; then
    echo -e "${GREEN}📄 Archivos generados:${NC}"
    ls -lh "$RESULTS_DIR"
else
    echo -e "${YELLOW}⚠️  No se generaron archivos de resultados${NC}"
fi

# Exit code
if [ $FAILED_TESTS -gt 0 ]; then
    exit 1
else
    exit 0
fi
