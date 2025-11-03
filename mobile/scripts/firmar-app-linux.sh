#!/bin/bash

# ==============================================================================
# Script de Firma de App Android - Linux/Mac Bash (Método Manual)
# ==============================================================================
# Este script automatiza el proceso manual de firma y generación de AAB para apps Expo
# Basado en: FIRMA_APP_ANDROID.md
#
# USO: ./scripts/firmar-app-linux.sh
#      o: bash scripts/firmar-app-linux.sh
# ==============================================================================

# Colores para mejor legibilidad
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
NC='\033[0m' # No Color

# Funciones de utilidad
print_step() {
    echo -e "${YELLOW}[PASO $1] $2${NC}\n"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${CYAN}  → $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_explanation() {
    echo -e "${WHITE}  $1${NC}"
}

# Verificar que estamos en el directorio correcto
test_project_directory() {
    print_step "1" "Verificando directorio del proyecto..."
    
    if [ ! -f "app.json" ]; then
        print_error "No se encontró app.json"
        echo -e "${CYAN}Solución: cd mobile${NC}"
        exit 1
    fi
    
    print_success "Proyecto Expo detectado correctamente\n"
}

# Verificar dependencias necesarias
test_dependencies() {
    print_step "2" "Verificando dependencias necesarias...\n"
    
    local missing=0
    
    # Verificar Node.js
    print_info "Verificando Node.js..."
    if command -v node &> /dev/null; then
        local node_version=$(node --version)
        print_success "Node.js instalado: $node_version"
    else
        print_error "Node.js NO encontrado"
        echo -e "${WHITE}  Descarga: https://nodejs.org/${NC}"
        missing=1
    fi
    
    # Verificar npm
    print_info "Verificando npm..."
    if command -v npm &> /dev/null; then
        local npm_version=$(npm --version)
        print_success "npm instalado: $npm_version"
    else
        print_error "npm NO encontrado"
        missing=1
    fi
    
    # Verificar Java
    print_info "Verificando Java (JDK)..."
    if command -v java &> /dev/null; then
        local java_version=$(java -version 2>&1 | head -n 1)
        print_success "Java instalado"
        echo -e "${WHITE}    $java_version${NC}"
    else
        print_error "Java (JDK) NO encontrado"
        echo -e "${WHITE}  Descarga: https://adoptium.net/ o instala Android Studio${NC}"
        missing=1
    fi
    
    # Verificar ANDROID_HOME
    print_info "Verificando ANDROID_HOME..."
    if [ -z "$ANDROID_HOME" ]; then
        # Intentar ubicación por defecto
        local default_path="$HOME/Android/Sdk"
        if [ -d "$default_path" ]; then
            export ANDROID_HOME="$default_path"
            print_warning "ANDROID_HOME no configurado, usando: $default_path"
            print_info "Para hacerlo permanente, agrega a ~/.bashrc o ~/.zshrc:"
            echo -e "${WHITE}    export ANDROID_HOME=\$HOME/Android/Sdk${NC}"
        else
            print_error "ANDROID_HOME NO encontrado"
            print_info "Instala Android Studio y configura ANDROID_HOME"
            missing=1
        fi
    else
        print_success "ANDROID_HOME configurado: $ANDROID_HOME"
    fi
    
    # Verificar zipalign (parte de Android SDK)
    if [ -n "$ANDROID_HOME" ]; then
        local build_tools=$(find "$ANDROID_HOME/build-tools" -name "zipalign" -type f 2>/dev/null | head -n 1)
        if [ -n "$build_tools" ]; then
            local version=$(basename $(dirname $build_tools))
            print_success "Android Build Tools encontrado: $version"
        else
            print_warning "Build Tools no encontrado. Instálalos desde Android Studio"
        fi
    fi
    
    if [ $missing -eq 1 ]; then
        print_error "\nFaltan dependencias. Instálalas antes de continuar.\n"
        exit 1
    fi
    
    print_success "\nDependencias básicas verificadas\n"
}

# Verificar y configurar app.json
test_app_json() {
    print_step "3" "Verificando configuración de app.json...\n"
    
    if ! command -v jq &> /dev/null; then
        print_warning "jq no está instalado (opcional, pero útil para verificar JSON)"
        print_info "Instalación: sudo apt-get install jq (Ubuntu/Debian) o brew install jq (Mac)"
        echo ""
        print_info "Verificando app.json manualmente..."
        
        # Verificaciones básicas sin jq
        if grep -q '"version"' app.json; then
            local version=$(grep -o '"version"[[:space:]]*:[[:space:]]*"[^"]*"' app.json | cut -d'"' -f4)
            print_success "version encontrado: $version"
        else
            print_error "Falta 'version' en app.json"
        fi
        
        if grep -q '"package"' app.json; then
            local package=$(grep -o '"package"[[:space:]]*:[[:space:]]*"[^"]*"' app.json | cut -d'"' -f4)
            print_success "android.package encontrado: $package"
        else
            print_warning "FALTA 'android.package' en app.json"
            print_warning "ADVERTENCIA: Sin package no podrás publicar en Play Store"
            print_info "Ejemplo: com.arroyoseco.touristapp"
            echo ""
            read -p "  ¿Deseas agregarlo ahora? (S/N): " add_package
            if [ "$add_package" = "S" ] || [ "$add_package" = "s" ]; then
                read -p "  Ingresa el package name (ej: com.arroyoseco.touristapp): " package_name
                if [ -n "$package_name" ]; then
                    print_warning "Edita app.json manualmente y agrega:"
                    echo -e "${WHITE}  \"android\": {${NC}"
                    echo -e "${WHITE}    \"package\": \"$package_name\",${NC}"
                    echo -e "${WHITE}    ...${NC}"
                    read -p "  Presiona Enter cuando hayas editado app.json..."
                fi
            fi
        fi
        
        if grep -q '"versionCode"' app.json; then
            local versionCode=$(grep -o '"versionCode"[[:space:]]*:[[:space:]]*[0-9]*' app.json | grep -o '[0-9]*')
            print_success "android.versionCode encontrado: $versionCode"
        else
            print_warning "No hay versionCode. Se usará 1 por defecto"
        fi
    else
        # Verificaciones con jq
        local version=$(jq -r '.expo.version // empty' app.json 2>/dev/null)
        if [ -n "$version" ] && [ "$version" != "null" ]; then
            print_success "version: $version"
        else
            print_error "Falta 'version' en app.json"
        fi
        
        local package=$(jq -r '.expo.android.package // empty' app.json 2>/dev/null)
        if [ -n "$package" ] && [ "$package" != "null" ]; then
            print_success "android.package: $package"
        else
            print_warning "FALTA 'android.package' en app.json"
            print_warning "ADVERTENCIA: Sin package no podrás publicar en Play Store"
            print_info "Ejemplo: com.arroyoseco.touristapp"
            echo ""
            read -p "  ¿Deseas agregarlo ahora? (S/N): " add_package
            if [ "$add_package" = "S" ] || [ "$add_package" = "s" ]; then
                read -p "  Ingresa el package name (ej: com.arroyoseco.touristapp): " package_name
                if [ -n "$package_name" ]; then
                    # Usar jq para editar el JSON
                    jq ".expo.android.package = \"$package_name\"" app.json > app.json.tmp && mv app.json.tmp app.json
                    print_success "package agregado: $package_name"
                fi
            fi
        fi
        
        local versionCode=$(jq -r '.expo.android.versionCode // empty' app.json 2>/dev/null)
        if [ -n "$versionCode" ] && [ "$versionCode" != "null" ]; then
            print_success "android.versionCode: $versionCode"
        else
            print_warning "No hay versionCode. Se usará 1 por defecto"
        fi
    fi
    
    print_success "\nVerificación de app.json completada\n"
}

# Generar código nativo Android
generate_native_code() {
    print_step "4" "Generando código nativo Android...\n"
    
    if [ -d "android" ]; then
        print_warning "La carpeta 'android' ya existe"
        print_info "¿Deseas regenerarla? Esto eliminará la carpeta actual."
        read -p "  (S/N): " regenerate
        if [ "$regenerate" = "S" ] || [ "$regenerate" = "s" ]; then
            print_info "Eliminando carpeta android existente..."
            rm -rf android
            print_info "Ejecutando: npx expo prebuild --platform android --clean"
            npx expo prebuild --platform android --clean
        else
            print_success "Manteniendo carpeta android existente"
            return
        fi
    else
        print_info "Ejecutando: npx expo prebuild --platform android"
        print_explanation "Por qué este comando:"
        print_explanation "  - Genera la carpeta 'android/' con código nativo"
        print_explanation "  - Crea archivos build.gradle, AndroidManifest.xml, etc."
        print_explanation "  - Necesario para compilar con Gradle\n"
        
        npx expo prebuild --platform android
    fi
    
    if [ $? -eq 0 ] && [ -d "android" ]; then
        print_success "Código nativo generado correctamente\n"
    else
        print_error "Error al generar código nativo"
        print_info "Verifica que expo-cli esté instalado: npm install -g expo-cli"
        exit 1
    fi
}

# Crear y configurar keystore
setup_keystore() {
    print_step "5" "Configurando keystore para firma...\n"
    
    # Preguntar ubicación del keystore
    print_info "¿Ya tienes un keystore? (S/N)"
    read has_keystore
    
    if [ "$has_keystore" = "S" ] || [ "$has_keystore" = "s" ]; then
        print_info "Ingresa la ruta completa de tu keystore (.jks o .keystore):"
        read -p "  Ruta: " keystore_path
        
        if [ ! -f "$keystore_path" ]; then
            print_error "El archivo no existe: $keystore_path"
            exit 1
        fi
        
        print_info "Ingresa el alias de tu clave:"
        read -p "  Alias: " key_alias
    else
        print_info "Crearemos un nuevo keystore"
        print_warning "IMPORTANTE: Guarda el keystore y las contraseñas en un lugar seguro"
        
        read -p "  ¿Dónde quieres guardar el keystore? (ruta completa, ej: ~/keystores): " keystore_dir
        keystore_dir=$(eval echo "$keystore_dir")
        
        if [ ! -d "$keystore_dir" ]; then
            mkdir -p "$keystore_dir"
            print_success "Carpeta creada: $keystore_dir"
        fi
        
        read -p "  Nombre del archivo keystore (ej: mi-app-key.jks): " keystore_name
        keystore_path="$keystore_dir/$keystore_name"
        read -p "  Alias de la clave (ej: mi-app-key): " key_alias
        
        print_warning "\nAhora se creará el keystore. Te pedirá:"
        print_explanation "- Contraseña del keystore"
        print_explanation "- Contraseña de la clave"
        print_explanation "- Información del certificado (nombre, organización, etc.)\n"
        
        print_info "Ejecutando keytool..."
        print_explanation "Por qué este comando:"
        print_explanation "  - keytool: Herramienta de Java para crear keystores"
        print_explanation "  - -genkeypair: Genera un par de claves"
        print_explanation "  - -keystore: Especifica dónde guardar el keystore"
        print_explanation "  - -alias: Nombre de la clave dentro del keystore\n"
        
        keytool -genkeypair -v -storetype PKCS12 -keystore "$keystore_path" -alias "$key_alias" -keyalg RSA -keysize 2048 -validity 10000
        
        if [ $? -ne 0 ]; then
            print_error "Error al crear el keystore"
            exit 1
        fi
        
        print_success "Keystore creado exitosamente"
        print_warning "⚠ GUARDA ESTE ARCHIVO Y LAS CONTRASEÑAS EN UN LUGAR SEGURO"
    fi
    
    # Crear keystore.properties
    print_info "\nCreando archivo keystore.properties..."
    
    read -sp "  Contraseña del keystore: " store_password
    echo ""
    read -sp "  Contraseña de la clave: " key_password
    echo ""
    
    # Convertir ruta a formato relativo desde android/
    if [ -d "android" ]; then
        # Calcular ruta relativa
        android_path=$(realpath android 2>/dev/null || echo "$(pwd)/android")
        keystore_abs=$(realpath "$keystore_path" 2>/dev/null || echo "$keystore_path")
        keystore_relative=$(realpath --relative-to="$android_path" "$keystore_abs" 2>/dev/null || echo "$keystore_path")
    else
        # Si android no existe aún, usar ruta absoluta
        keystore_relative=$(realpath "$keystore_path" 2>/dev/null || echo "$keystore_path")
    fi
    
    keystore_props_file="android/keystore.properties"
    if [ ! -d "android" ]; then
        keystore_props_file="keystore.properties.tmp"
    fi
    
    cat > "$keystore_props_file" << EOF
storePassword=$store_password
keyPassword=$key_password
keyAlias=$key_alias
storeFile=$keystore_relative
EOF
    
    print_success "keystore.properties creado"
    print_warning "⚠ Este archivo contiene contraseñas. NO lo subas a Git"
    
    # Agregar a .gitignore
    if [ -f ".gitignore" ]; then
        if ! grep -q "android/keystore.properties" .gitignore; then
            echo "" >> .gitignore
            echo "android/keystore.properties" >> .gitignore
            echo "keystores/" >> .gitignore
            print_success "Agregado a .gitignore"
        fi
    fi
    
    print_success "\nKeystore configurado\n"
}

# Configurar build.gradle
configure_build_gradle() {
    print_step "6" "Configurando build.gradle para usar el keystore...\n"
    
    if [ ! -f "android/app/build.gradle" ]; then
        print_error "No se encontró android/app/build.gradle"
        print_info "Ejecuta primero el paso de generación de código nativo"
        return
    fi
    
    print_info "Verificando configuración de firma en build.gradle..."
    
    if grep -q "signingConfigs" android/app/build.gradle; then
        print_success "build.gradle ya tiene configuración de firma"
        print_info "¿Deseas reconfigurarlo? (S/N)"
        read reconfig
        if [ "$reconfig" != "S" ] && [ "$reconfig" != "s" ]; then
            return
        fi
    fi
    
    print_warning "⚠ Necesitas editar android/app/build.gradle manualmente"
    print_info "Consulta FIRMA_APP_ANDROID.md para ver la configuración exacta"
    print_info "O sigue estos pasos:"
    echo ""
    print_info "1. Agrega al inicio (después de 'apply plugin'):"
    echo -e "${WHITE}     def keystorePropertiesFile = rootProject.file(\"keystore.properties\")${NC}"
    echo -e "${WHITE}     def keystoreProperties = new Properties()${NC}"
    echo -e "${WHITE}     if (keystorePropertiesFile.exists()) {${NC}"
    echo -e "${WHITE}         keystoreProperties.load(new FileInputStream(keystorePropertiesFile))${NC}"
    echo -e "${WHITE}     }${NC}"
    print_info "\n2. Agrega en android { ... }:"
    echo -e "${WHITE}     signingConfigs {${NC}"
    echo -e "${WHITE}         release {${NC}"
    echo -e "${WHITE}             if (keystorePropertiesFile.exists()) {${NC}"
    echo -e "${WHITE}                 keyAlias keystoreProperties['keyAlias']${NC}"
    echo -e "${WHITE}                 keyPassword keystoreProperties['keyPassword']${NC}"
    echo -e "${WHITE}                 storeFile file(keystoreProperties['storeFile'])${NC}"
    echo -e "${WHITE}                 storePassword keystoreProperties['storePassword']${NC}"
    echo -e "${WHITE}             }${NC}"
    echo -e "${WHITE}         }${NC}"
    echo -e "${WHITE}     }${NC}"
    print_info "\n3. En buildTypes.release, agrega:"
    echo -e "${WHITE}     signingConfig signingConfigs.release${NC}"
    echo ""
    
    read -p "  Presiona Enter cuando hayas editado build.gradle"
    
    print_success "\nContinuando con el siguiente paso\n"
}

# Compilar el AAB
build_aab() {
    print_step "7" "Compilando AAB con Gradle...\n"
    
    if [ ! -d "android" ]; then
        print_error "La carpeta android/ no existe"
        print_info "Ejecuta primero el paso de generación de código nativo"
        exit 1
    fi
    
    print_info "Ejecutando: ./gradlew bundleRelease"
    print_explanation "Por qué este comando:"
    print_explanation "  - ./gradlew: Wrapper de Gradle"
    print_explanation "  - bundleRelease: Compila la variante release y genera AAB"
    print_explanation "  - El AAB estará en: android/app/build/outputs/bundle/release/"
    print_explanation "Este proceso puede tardar 5-15 minutos\n"
    
    cd android
    
    chmod +x gradlew
    ./gradlew bundleRelease
    
    if [ $? -eq 0 ]; then
        local aab_path="app/build/outputs/bundle/release/app-release.aab"
        if [ -f "$aab_path" ]; then
            print_success "\nAAB compilado exitosamente!"
            print_info "Ubicación: android/$aab_path"
            
            local size_mb=$(du -h "$aab_path" | cut -f1)
            print_info "Tamaño: $size_mb\n"
        else
            print_warning "⚠ Build completado pero no se encontró el AAB en la ubicación esperada"
        fi
    else
        print_error "Error durante la compilación"
        print_info "Revisa los errores arriba"
        cd ..
        exit 1
    fi
    
    cd ..
}

# Función principal
main() {
    echo -e "${CYAN}==============================================================================${NC}"
    echo -e "${CYAN}  SCRIPT DE FIRMA DE APP ANDROID - EXPO (MÉTODO MANUAL)${NC}"
    echo -e "${CYAN}  Generación de AAB firmado para Google Play Store${NC}"
    echo -e "${CYAN}==============================================================================${NC}\n"
    
    # Cambiar al directorio mobile si no estamos ahí
    if [ ! -f "app.json" ]; then
        if [ -f "mobile/app.json" ]; then
            cd mobile
            print_warning "Cambiando al directorio mobile...\n"
        fi
    fi
    
    test_project_directory
    test_dependencies
    test_app_json
    generate_native_code
    setup_keystore
    
    # Mover keystore.properties si se creó antes de android/
    if [ -f "keystore.properties.tmp" ] && [ -d "android" ]; then
        mv keystore.properties.tmp android/keystore.properties
    fi
    
    configure_build_gradle
    build_aab
    
    echo -e "${GREEN}==============================================================================${NC}"
    echo -e "${GREEN}  PROCESO COMPLETADO${NC}"
    echo -e "${GREEN}==============================================================================${NC}"
    echo -e "\n${WHITE}PRÓXIMOS PASOS:${NC}"
    echo -e "${WHITE}  1. Verifica el AAB en: android/app/build/outputs/bundle/release/app-release.aab${NC}"
    echo -e "${WHITE}  2. Si no se firmó automáticamente, fírmalo manualmente con jarsigner${NC}"
    echo -e "${WHITE}  3. Sube el AAB a Google Play Console${NC}"
    echo -e "\n${WHITE}Para más información, consulta: mobile/FIRMA_APP_ANDROID.md${NC}\n"
}

# Hacer el script ejecutable
chmod +x "$0" 2>/dev/null

# Ejecutar función principal
main
