# ==============================================================================
# Script de Firma de App Android - Windows PowerShell (Método Manual)
# ==============================================================================
# Este script automatiza el proceso manual de firma y generación de AAB para apps Expo
# Basado en: FIRMA_APP_ANDROID.md
#
# USO: .\scripts\firmar-app-windows.ps1
# ==============================================================================

# Configuración de colores para mejor legibilidad
function Write-ColorOutput {
    param(
        [string]$ForegroundColor,
        [string]$Message
    )
    Write-Host $Message -ForegroundColor $ForegroundColor
}

# Verificar que estamos en el directorio correcto
function Test-ProjectDirectory {
    Write-ColorOutput "Yellow" "`n[PASO 1] Verificando directorio del proyecto..."
    
    if (-not (Test-Path "app.json")) {
        Write-ColorOutput "Red" "ERROR: No se encontró app.json. Ejecuta este script desde la carpeta 'mobile'"
        Write-ColorOutput "Cyan" "Solución: cd mobile"
        exit 1
    }
    
    Write-ColorOutput "Green" "✓ Proyecto Expo detectado correctamente`n"
}

# Verificar dependencias necesarias
function Test-Dependencies {
    Write-ColorOutput "Yellow" "[PASO 2] Verificando dependencias necesarias...`n"
    
    $missing = @()
    
    # Verificar Node.js
    Write-ColorOutput "Cyan" "  → Verificando Node.js..."
    try {
        $nodeVersion = node --version
        Write-ColorOutput "Green" "  ✓ Node.js instalado: $nodeVersion"
    } catch {
        Write-ColorOutput "Red" "  ✗ Node.js NO encontrado"
        $missing += "Node.js (descarga: https://nodejs.org/)"
    }
    
    # Verificar npm
    Write-ColorOutput "Cyan" "  → Verificando npm..."
    try {
        $npmVersion = npm --version
        Write-ColorOutput "Green" "  ✓ npm instalado: $npmVersion"
    } catch {
        Write-ColorOutput "Red" "  ✗ npm NO encontrado"
        $missing += "npm (viene con Node.js)"
    }
    
    # Verificar Java
    Write-ColorOutput "Cyan" "  → Verificando Java (JDK)..."
    try {
        $javaVersion = java -version 2>&1 | Select-Object -First 1
        Write-ColorOutput "Green" "  ✓ Java instalado"
        Write-ColorOutput "White" "    $javaVersion"
    } catch {
        Write-ColorOutput "Red" "  ✗ Java (JDK) NO encontrado"
        Write-ColorOutput "Yellow" "    Descarga: https://adoptium.net/ o instala Android Studio"
        $missing += "Java JDK 11 o superior"
    }
    
    # Verificar ANDROID_HOME
    Write-ColorOutput "Cyan" "  → Verificando ANDROID_HOME..."
    $androidHome = $env:ANDROID_HOME
    if (-not $androidHome) {
        # Intentar ubicación por defecto
        $defaultPath = "$env:LOCALAPPDATA\Android\Sdk"
        if (Test-Path $defaultPath) {
            $env:ANDROID_HOME = $defaultPath
            Write-ColorOutput "Yellow" "  ⚠ ANDROID_HOME no configurado, usando: $defaultPath"
            Write-ColorOutput "White" "    Para hacerlo permanente, configura la variable de entorno"
        } else {
            Write-ColorOutput "Red" "  ✗ ANDROID_HOME NO encontrado"
            Write-ColorOutput "Yellow" "    Instala Android Studio y configura ANDROID_HOME"
            $missing += "Android SDK (instalar Android Studio)"
        }
    } else {
        Write-ColorOutput "Green" "  ✓ ANDROID_HOME configurado: $androidHome"
    }
    
    # Verificar zipalign (parte de Android SDK)
    if ($env:ANDROID_HOME) {
        $buildToolsPath = Get-ChildItem "$env:ANDROID_HOME\build-tools" -Directory | Sort-Object Name -Descending | Select-Object -First 1
        if ($buildToolsPath) {
            Write-ColorOutput "Green" "  ✓ Android Build Tools encontrado: $($buildToolsPath.Name)"
        } else {
            Write-ColorOutput "Yellow" "  ⚠ Build Tools no encontrado. Instálalos desde Android Studio"
        }
    }
    
    if ($missing.Count -gt 0) {
        Write-ColorOutput "Red" "`nERROR: Faltan dependencias:`n"
        foreach ($dep in $missing) {
            Write-ColorOutput "Red" "  - $dep"
        }
        Write-ColorOutput "Yellow" "`nInstala las dependencias faltantes y vuelve a ejecutar el script."
        exit 1
    }
    
    Write-ColorOutput "Green" "`n✓ Dependencias básicas verificadas`n"
}

# Verificar y configurar app.json
function Test-AppJson {
    Write-ColorOutput "Yellow" "[PASO 3] Verificando configuración de app.json...`n"
    
    $appJson = Get-Content app.json | ConvertFrom-Json
    
    $issues = @()
    
    # Verificar version
    if (-not $appJson.expo.version) {
        $issues += "Falta 'version' en app.json"
    } else {
        Write-ColorOutput "Green" "  ✓ version: $($appJson.expo.version)"
    }
    
    # Verificar android.package
    if (-not $appJson.expo.android.package) {
        Write-ColorOutput "Red" "  ✗ FALTA 'android.package' en app.json"
        Write-ColorOutput "Yellow" "  ⚠ ADVERTENCIA: Sin package no podrás publicar en Play Store"
        Write-ColorOutput "Cyan" "  → Ejemplo: com.arroyoseco.touristapp"
        
        $addPackage = Read-Host "  ¿Deseas agregarlo ahora? (S/N)"
        if ($addPackage -eq "S" -or $addPackage -eq "s") {
            $packageName = Read-Host "  Ingresa el package name (ej: com.arroyoseco.touristapp)"
            if ($packageName) {
                if (-not $appJson.expo.android) {
                    $appJson.expo | Add-Member -MemberType NoteProperty -Name "android" -Value @{} -Force
                }
                $appJson.expo.android | Add-Member -MemberType NoteProperty -Name "package" -Value $packageName -Force
                $appJson | ConvertTo-Json -Depth 10 | Set-Content app.json
                Write-ColorOutput "Green" "  ✓ package agregado: $packageName"
            }
        } else {
            $issues += "android.package no configurado"
        }
    } else {
        Write-ColorOutput "Green" "  ✓ android.package: $($appJson.expo.android.package)"
    }
    
    # Verificar versionCode
    if (-not $appJson.expo.android.versionCode) {
        Write-ColorOutput "Yellow" "  ⚠ No hay versionCode. Se usará 1 por defecto"
        Write-ColorOutput "Cyan" "  → Agregando versionCode: 1"
        
        if (-not $appJson.expo.android) {
            $appJson.expo | Add-Member -MemberType NoteProperty -Name "android" -Value @{} -Force
        }
        $appJson.expo.android | Add-Member -MemberType NoteProperty -Name "versionCode" -Value 1 -Force
        $appJson | ConvertTo-Json -Depth 10 | Set-Content app.json
        Write-ColorOutput "Green" "  ✓ versionCode agregado: 1"
    } else {
        Write-ColorOutput "Green" "  ✓ android.versionCode: $($appJson.expo.android.versionCode)"
    }
    
    Write-ColorOutput "Green" "`n✓ Verificación de app.json completada`n"
}

# Generar código nativo Android
function Generate-NativeCode {
    Write-ColorOutput "Yellow" "[PASO 4] Generando código nativo Android...`n"
    
    if (Test-Path "android") {
        Write-ColorOutput "Yellow" "  ⚠ La carpeta 'android' ya existe"
        Write-ColorOutput "White" "  ¿Deseas regenerarla? Esto eliminará la carpeta actual."
        $regenerate = Read-Host "  (S/N)"
        if ($regenerate -eq "S" -or $regenerate -eq "s") {
            Write-ColorOutput "Cyan" "  → Eliminando carpeta android existente..."
            Remove-Item -Recurse -Force android
            Write-ColorOutput "Cyan" "  → Ejecutando: npx expo prebuild --platform android --clean"
            npx expo prebuild --platform android --clean
        } else {
            Write-ColorOutput "Green" "  → Manteniendo carpeta android existente"
            return
        }
    } else {
        Write-ColorOutput "Cyan" "  → Ejecutando: npx expo prebuild --platform android"
        Write-ColorOutput "White" "  Por qué este comando:"
        Write-ColorOutput "White" "    - Genera la carpeta 'android/' con código nativo"
        Write-ColorOutput "White" "    - Crea archivos build.gradle, AndroidManifest.xml, etc."
        Write-ColorOutput "White" "    - Necesario para compilar con Gradle`n"
        
        npx expo prebuild --platform android
    }
    
    if ($LASTEXITCODE -eq 0 -and (Test-Path "android")) {
        Write-ColorOutput "Green" "  ✓ Código nativo generado correctamente`n"
    } else {
        Write-ColorOutput "Red" "  ✗ Error al generar código nativo"
        Write-ColorOutput "Yellow" "  Verifica que expo-cli esté instalado: npm install -g expo-cli"
        exit 1
    }
}

# Crear y configurar keystore
function Setup-Keystore {
    Write-ColorOutput "Yellow" "[PASO 5] Configurando keystore para firma...`n"
    
    # Preguntar ubicación del keystore
    Write-ColorOutput "White" "  ¿Ya tienes un keystore? (S/N)"
    $hasKeystore = Read-Host
    
    if ($hasKeystore -eq "S" -or $hasKeystore -eq "s") {
        Write-ColorOutput "Cyan" "  → Ingresa la ruta completa de tu keystore (.jks o .keystore):"
        $keystorePath = Read-Host "    Ruta"
        
        if (-not (Test-Path $keystorePath)) {
            Write-ColorOutput "Red" "  ✗ El archivo no existe: $keystorePath"
            exit 1
        }
        
        Write-ColorOutput "Cyan" "  → Ingresa el alias de tu clave:"
        $keyAlias = Read-Host "    Alias"
    } else {
        Write-ColorOutput "Cyan" "  → Crearemos un nuevo keystore"
        Write-ColorOutput "White" "  IMPORTANTE: Guarda el keystore y las contraseñas en un lugar seguro"
        
        $keystoreDir = Read-Host "  ¿Dónde quieres guardar el keystore? (ruta completa, ej: C:\keystores)"
        if (-not (Test-Path $keystoreDir)) {
            New-Item -ItemType Directory -Path $keystoreDir -Force | Out-Null
            Write-ColorOutput "Green" "  ✓ Carpeta creada: $keystoreDir"
        }
        
        $keystoreName = Read-Host "  Nombre del archivo keystore (ej: mi-app-key.jks)"
        $keystorePath = Join-Path $keystoreDir $keystoreName
        $keyAlias = Read-Host "  Alias de la clave (ej: mi-app-key)"
        
        Write-ColorOutput "Yellow" "`n  Ahora se creará el keystore. Te pedirá:"
        Write-ColorOutput "White" "    - Contraseña del keystore"
        Write-ColorOutput "White" "    - Contraseña de la clave"
        Write-ColorOutput "White" "    - Información del certificado (nombre, organización, etc.)`n"
        
        Write-ColorOutput "Cyan" "  → Ejecutando keytool..."
        Write-ColorOutput "White" "  Por qué este comando:"
        Write-ColorOutput "White" "    - keytool: Herramienta de Java para crear keystores"
        Write-ColorOutput "White" "    - -genkeypair: Genera un par de claves"
        Write-ColorOutput "White" "    - -keystore: Especifica dónde guardar el keystore"
        Write-ColorOutput "White" "    - -alias: Nombre de la clave dentro del keystore`n"
        
        keytool -genkeypair -v -storetype PKCS12 -keystore $keystorePath -alias $keyAlias -keyalg RSA -keysize 2048 -validity 10000
        
        if ($LASTEXITCODE -ne 0) {
            Write-ColorOutput "Red" "  ✗ Error al crear el keystore"
            exit 1
        }
        
        Write-ColorOutput "Green" "  ✓ Keystore creado exitosamente"
        Write-ColorOutput "Yellow" "  ⚠ GUARDA ESTE ARCHIVO Y LAS CONTRASEÑAS EN UN LUGAR SEGURO"
    }
    
    # Crear keystore.properties
    Write-ColorOutput "Cyan" "`n  → Creando archivo keystore.properties..."
    
    $storePassword = Read-Host "  Contraseña del keystore" -AsSecureString
    $storePasswordPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($storePassword))
    
    $keyPassword = Read-Host "  Contraseña de la clave" -AsSecureString
    $keyPasswordPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($keyPassword))
    
    # Convertir ruta a formato relativo desde android/
    $androidPath = Resolve-Path "android" -ErrorAction SilentlyContinue
    if ($androidPath) {
        # Calcular ruta relativa manualmente
        $keystoreAbs = (Resolve-Path $keystorePath).Path
        $androidAbs = $androidPath.Path
        $keystoreRelative = $keystoreAbs.Replace($androidAbs, ".").Replace("\", "/")
        if (-not $keystoreRelative.StartsWith(".")) {
            # Si no es relativa, usar ruta absoluta
            $keystoreRelative = $keystorePath
        }
    } else {
        # Si android no existe aún, usar ruta absoluta
        $keystoreRelative = $keystorePath
    }
    
    $keystoreProps = @"
storePassword=$storePasswordPlain
keyPassword=$keyPasswordPlain
keyAlias=$keyAlias
storeFile=$keystoreRelative
"@
    
    # Asegurarse de que android/ existe
    if (-not (Test-Path "android")) {
        Write-ColorOutput "Yellow" "  ⚠ La carpeta android/ no existe. Se creará después de generar código nativo."
        $keystorePropsPath = "keystore.properties.tmp"
    } else {
        $keystorePropsPath = "android\keystore.properties"
    }
    
    $keystoreProps | Out-File -FilePath $keystorePropsPath -Encoding UTF8 -NoNewline
    
    Write-ColorOutput "Green" "  ✓ keystore.properties creado"
    Write-ColorOutput "Yellow" "  ⚠ Este archivo contiene contraseñas. NO lo subas a Git"
    
    # Agregar a .gitignore
    if (Test-Path ".gitignore") {
        $gitignore = Get-Content .gitignore
        if ($gitignore -notcontains "android/keystore.properties") {
            Add-Content .gitignore "`nandroid/keystore.properties"
            Add-Content .gitignore "keystores/"
            Write-ColorOutput "Green" "  ✓ Agregado a .gitignore"
        }
    }
    
    Write-ColorOutput "Green" "`n✓ Keystore configurado`n"
}

# Configurar build.gradle
function Configure-BuildGradle {
    Write-ColorOutput "Yellow" "[PASO 6] Configurando build.gradle para usar el keystore...`n"
    
    if (-not (Test-Path "android\app\build.gradle")) {
        Write-ColorOutput "Red" "  ✗ No se encontró android/app/build.gradle"
        Write-ColorOutput "Yellow" "  Ejecuta primero el paso de generación de código nativo"
        return
    }
    
    Write-ColorOutput "Cyan" "  → Verificando configuración de firma en build.gradle..."
    
    $buildGradle = Get-Content "android\app\build.gradle" -Raw
    
    # Verificar si ya está configurado
    if ($buildGradle -match "signingConfigs") {
        Write-ColorOutput "Green" "  ✓ build.gradle ya tiene configuración de firma"
        Write-ColorOutput "White" "  ¿Deseas reconfigurarlo? (S/N)"
        $reconfig = Read-Host
        if ($reconfig -ne "S" -and $reconfig -ne "s") {
            return
        }
    }
    
    Write-ColorOutput "Yellow" "  ⚠ Necesitas editar android/app/build.gradle manualmente"
    Write-ColorOutput "White" "  Consulta FIRMA_APP_ANDROID.md para ver la configuración exacta"
    Write-ColorOutput "White" "  O sigue estos pasos:"
    Write-ColorOutput "Cyan" "`n  1. Agrega al inicio (después de 'apply plugin'):"
    Write-ColorOutput "White" "     def keystorePropertiesFile = rootProject.file(`"keystore.properties`")"
    Write-ColorOutput "White" "     def keystoreProperties = new Properties()"
    Write-ColorOutput "White" "     if (keystorePropertiesFile.exists()) {"
    Write-ColorOutput "White" "         keystoreProperties.load(new FileInputStream(keystorePropertiesFile))"
    Write-ColorOutput "White" "     }"
    Write-ColorOutput "Cyan" "`n  2. Agrega en android { ... }:"
    Write-ColorOutput "White" "     signingConfigs {"
    Write-ColorOutput "White" "         release {"
    Write-ColorOutput "White" "             if (keystorePropertiesFile.exists()) {"
    Write-ColorOutput "White" "                 keyAlias keystoreProperties['keyAlias']"
    Write-ColorOutput "White" "                 keyPassword keystoreProperties['keyPassword']"
    Write-ColorOutput "White" "                 storeFile file(keystoreProperties['storeFile'])"
    Write-ColorOutput "White" "                 storePassword keystoreProperties['storePassword']"
    Write-ColorOutput "White" "             }"
    Write-ColorOutput "White" "         }"
    Write-ColorOutput "White" "     }"
    Write-ColorOutput "Cyan" "`n  3. En buildTypes.release, agrega:"
    Write-ColorOutput "White" "     signingConfig signingConfigs.release`n"
    
    Read-Host "  Presiona Enter cuando hayas editado build.gradle"
    
    Write-ColorOutput "Green" "`n✓ Continuando con el siguiente paso`n"
}

# Compilar el AAB
function Build-AAB {
    Write-ColorOutput "Yellow" "[PASO 7] Compilando AAB con Gradle...`n"
    
    if (-not (Test-Path "android")) {
        Write-ColorOutput "Red" "  ✗ La carpeta android/ no existe"
        Write-ColorOutput "Yellow" "  Ejecuta primero el paso de generación de código nativo"
        exit 1
    }
    
    Write-ColorOutput "Cyan" "  → Ejecutando: gradlew.bat bundleRelease"
    Write-ColorOutput "White" "  Por qué este comando:"
    Write-ColorOutput "White" "    - gradlew.bat: Wrapper de Gradle para Windows"
    Write-ColorOutput "White" "    - bundleRelease: Compila la variante release y genera AAB"
    Write-ColorOutput "White" "    - El AAB estará en: android/app/build/outputs/bundle/release/"
    Write-ColorOutput "White" "  Este proceso puede tardar 5-15 minutos`n"
    
    Push-Location android
    try {
        .\gradlew.bat bundleRelease
        
        if ($LASTEXITCODE -eq 0) {
            $aabPath = "app\build\outputs\bundle\release\app-release.aab"
            if (Test-Path $aabPath) {
                Write-ColorOutput "Green" "`n✓ AAB compilado exitosamente!"
                Write-ColorOutput "Cyan" "  Ubicación: android\$aabPath"
                
                $aabInfo = Get-Item $aabPath
                $sizeMB = [math]::Round($aabInfo.Length / 1MB, 2)
                Write-ColorOutput "White" "  Tamaño: $sizeMB MB`n"
            } else {
                Write-ColorOutput "Yellow" "  ⚠ Build completado pero no se encontró el AAB en la ubicación esperada"
            }
        } else {
            Write-ColorOutput "Red" "  ✗ Error durante la compilación"
            Write-ColorOutput "Yellow" "  Revisa los errores arriba"
            exit 1
        }
    } finally {
        Pop-Location
    }
}

# Función principal
function Main {
    Write-ColorOutput "Cyan" "=============================================================================="
    Write-ColorOutput "Cyan" "  SCRIPT DE FIRMA DE APP ANDROID - EXPO (MÉTODO MANUAL)"
    Write-ColorOutput "Cyan" "  Generación de AAB firmado para Google Play Store"
    Write-ColorOutput "Cyan" "=============================================================================="
    
    # Cambiar al directorio mobile si no estamos ahí
    if (-not (Test-Path "app.json")) {
        if (Test-Path "mobile\app.json") {
            Set-Location mobile
            Write-ColorOutput "Yellow" "→ Cambiando al directorio mobile...`n"
        }
    }
    
    Test-ProjectDirectory
    Test-Dependencies
    Test-AppJson
    Generate-NativeCode
    Setup-Keystore
    
    # Mover keystore.properties si se creó antes de android/
    if (Test-Path "keystore.properties.tmp") {
        if (Test-Path "android") {
            Move-Item "keystore.properties.tmp" "android\keystore.properties" -Force
        }
    }
    
    Configure-BuildGradle
    Build-AAB
    
    Write-ColorOutput "Green" "=============================================================================="
    Write-ColorOutput "Green" "  PROCESO COMPLETADO"
    Write-ColorOutput "Green" "=============================================================================="
    Write-ColorOutput "White" "`nPRÓXIMOS PASOS:"
    Write-ColorOutput "White" "  1. Verifica el AAB en: android/app/build/outputs/bundle/release/app-release.aab"
    Write-ColorOutput "White" "  2. Si no se firmó automáticamente, fírmalo manualmente con jarsigner"
    Write-ColorOutput "White" "  3. Sube el AAB a Google Play Console"
    Write-ColorOutput "White" "`nPara más información, consulta: mobile/FIRMA_APP_ANDROID.md`n"
}

# Ejecutar función principal
Main
