#!/bin/bash
################################################################################
# Script para ejecutar un test individual de K6
# Uso: ./run-single-test.sh [archivo-test.js]
################################################################################

set -e

# Detectar directorio del proyecto
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"

# Configuración
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
TEST_FILE=${1:-${PROJECT_DIR}/monitoring/k6/load-test-landing.js}
TEST_NAME=$(basename "$TEST_FILE" .js)
RESULTS_DIR="${PROJECT_DIR}/monitoring/k6/results"

# Navegar al directorio del proyecto
cd "$PROJECT_DIR"

# Crear directorio de resultados
mkdir -p "$RESULTS_DIR"

echo "🚀 Ejecutando: $TEST_NAME"
echo "⏰ Timestamp: $TIMESTAMP"
echo ""

# Ejecutar K6
K6_PROMETHEUS_RW_SERVER_URL=http://localhost:9090/prometheus/api/v1/write \
K6_PROMETHEUS_RW_PUSH_INTERVAL=5s \
k6 run \
  -o experimental-prometheus-rw \
  --tag testid=${TEST_NAME}-${TIMESTAMP} \
  --tag environment=production \
  --summary-export="${RESULTS_DIR}/summary-${TEST_NAME}-${TIMESTAMP}.json" \
  --out json="${RESULTS_DIR}/output-${TEST_NAME}-${TIMESTAMP}.json" \
  "$TEST_FILE"

echo ""
echo "✅ Test completado"
echo "📁 Resultados en: ${RESULTS_DIR}/"
echo ""
echo "📊 Ver métricas:"
echo "   • Prometheus: https://vps-master.duckdns.org/prometheus/graph"
echo "   • Grafana: https://vps-master.duckdns.org/grafana/"
