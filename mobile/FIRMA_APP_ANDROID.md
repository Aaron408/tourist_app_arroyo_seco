# Manual Completo: Firmar y Generar AAB para App Expo en Android (Método Manual)

## ⚠️ ADVERTENCIA IMPORTANTE PARA USUARIOS DE WINDOWS

Si estás usando **Windows** y tu proyecto está en una ruta como:
- `C:\Users\TuNombre\OneDrive\Documentos\nombre_proyecto_largo\`
- `C:\Users\TuNombre\Desktop\carpeta1\carpeta2\proyecto\`
- Cualquier ruta con más de 80 caracteres

**TENDRÁS PROBLEMAS DE COMPILACIÓN** debido al límite de 260 caracteres de Windows en las rutas de archivos.

### Solución Rápida (30 segundos):

```powershell
# Crear disco virtual T: que apunta a tu proyecto
subst T: "C:\ruta\completa\a\tu\proyecto"

# Compilar desde ahí
cd T:\mobile\android
.\gradlew.bat bundleRelease
```

**Lee la sección "Solución de Problemas - Rutas Largas"** para más detalles y soluciones permanentes.

---

## Índice
1. [¿Qué es un AAB y por qué es importante?](#qué-es-un-aab-y-por-qué-es-importante)
2. [Requisitos Previos](#requisitos-previos)
3. [Configuración Inicial del Proyecto Expo](#configuración-inicial-del-proyecto-expo)
4. [Generar Código Nativo Android](#generar-código-nativo-android)
5. [Crear y Configurar Keystore](#crear-y-configurar-keystore)
6. [Compilar el AAB con Gradle](#compilar-el-aab-con-gradle)
7. [Firmar el AAB Manualmente](#firmar-el-aab-manualmente)
8. [Trabajar con Google Play Console](#trabajar-con-google-play-console)
9. [Solución de Problemas Comunes](#solución-de-problemas-comunes)
10. [Checklist Final](#checklist-final)

---

## ¿Qué es un AAB y por qué es importante?

El **Android App Bundle (AAB)** es el formato de publicación oficial de Google Play desde agosto de 2021. A diferencia del APK tradicional, el AAB permite:

- **Reducción del tamaño de descarga** (hasta 15% más pequeño)
- **Entregas optimizadas** según el dispositivo del usuario
- **Play Feature Delivery** para funcionalidades bajo demanda
- **Play Asset Delivery** para recursos grandes

Google Play genera APKs optimizados a partir del AAB para cada configuración de dispositivo.

### Proceso Manual para Apps Expo

Para apps desarrolladas con **Expo**, usaremos el proceso manual completo:

1. **Generar código nativo**: `expo prebuild` crea la carpeta `android/`
2. **Configurar Android Studio**: Instalar SDK y herramientas
3. **Crear keystore**: Generar manualmente el archivo de firma
4. **Configurar Gradle**: Indicar dónde está el keystore
5. **Compilar AAB**: Usar Gradle para generar el bundle
6. **Firmar AAB**: Usar `jarsigner` para firmar manualmente

---

## Requisitos Previos

### 1. Software Necesario

- **Node.js** (versión 18 o superior)
- **npm** o **yarn**
- **Expo CLI** (`npm install -g expo-cli`)
- **Java Development Kit (JDK)** 11 o superior
- **Android Studio** (última versión)
- **Android SDK** (a través de Android Studio)
- **Git** (para control de versiones)
- Una cuenta de desarrollador de Google Play ($25 USD pago único)

### 2. Cuentas Necesarias

- **Cuenta de Google Play Console**: https://play.google.com/console

### 3. Información Necesaria

- Nombre del paquete de la aplicación (ej: `com.tuempresa.tuapp`)
- Versión de la app (versionCode y versionName en `app.json`)
- Información para el certificado del keystore (nombre, organización, etc.)

---

## Configuración Inicial del Proyecto Expo

### Paso 1: Verificar app.json

Abre el archivo `mobile/app.json` y verifica la configuración:

```json
{
  "expo": {
    "name": "tourist_app_arroyo_seco",
    "slug": "tourist_app_arroyo_seco",
    "version": "1.0.0",  // ← versionName
    "android": {
      "package": "com.tuempresa.tuapp",  // ← Necesario para Play Store
      "versionCode": 1,  // ← Incrementa con cada release
      "adaptiveIcon": {
        // ... configuración de iconos
      }
    }
  }
}
```

**Puntos importantes:**
- `version`: Versión legible para usuarios (ej: "1.0.0")
- `versionCode`: Número entero que debe incrementarse con cada nueva versión
- `android.package`: Identificador único de tu app (formato: com.dominio.app)

### Paso 2: Configurar android.package (Si no existe)

Si tu `app.json` no tiene `android.package`, agrégalo:

```json
{
  "expo": {
    "android": {
      "package": "com.arroyoseco.touristapp",
      "versionCode": 1,
      // ... resto de la configuración
    }
  }
}
```

⚠️ **IMPORTANTE**: El `package` no puede cambiarse después de publicar en Play Store.

---

## Generar Código Nativo Android

### Paso 1: Instalar Expo CLI (Si no lo tienes)

```bash
npm install -g expo-cli
```

Verifica la instalación:
```bash
expo --version
```

### Paso 2: Generar Carpeta Android

El comando `expo prebuild` genera el código nativo Android a partir de tu configuración de Expo:

```bash
cd mobile
npx expo prebuild --platform android
```

**¿Qué hace este comando?**
- Lee tu `app.json`
- Genera la carpeta `android/` con todo el código nativo
- Crea archivos `build.gradle`, `AndroidManifest.xml`, etc.
- Configura el proyecto para Android Studio

**Tiempo estimado**: 1-3 minutos

### Paso 3: Verificar que se Creó la Carpeta Android

Después de ejecutar `expo prebuild`, deberías tener:

```
mobile/
├── android/          ← Nueva carpeta generada
│   ├── app/
│   ├── build.gradle
│   ├── gradle/
│   └── ...
├── app.json
├── package.json
└── ...
```

---

## Crear y Configurar Keystore

### Paso 1: Crear un Keystore

El keystore es el archivo que contiene tu clave de firma. Debes guardarlo de forma segura.

**Ubicación recomendada**: Crea una carpeta `keystores` en la raíz del proyecto o en un lugar seguro fuera del proyecto.

**Crear el keystore:**

```bash
# Windows
keytool -genkeypair -v -storetype PKCS12 -keystore C:\keystores\mi-app-key.jks -alias mi-app-key -keyalg RSA -keysize 2048 -validity 10000

# Linux/Mac
keytool -genkeypair -v -storetype PKCS12 -keystore ~/keystores/mi-app-key.jks -alias mi-app-key -keyalg RSA -keysize 2048 -validity 10000
```

**Información que te pedirá:**

1. **Contraseña del keystore**: Crea una contraseña segura (guárdala)
2. **Confirmar contraseña**: Repite la contraseña
3. **Nombre y apellidos**: Tu nombre o nombre de empresa
4. **Unidad organizativa**: Departamento (opcional)
5. **Organización**: Nombre de empresa
6. **Ciudad o localidad**: Tu ciudad
7. **Estado o provincia**: Tu estado/provincia
8. **Código de país**: Código de 2 letras (ej: MX, ES, AR)
9. **Contraseña de la clave**: Puede ser la misma o diferente al keystore

**⚠️ IMPORTANTE:**
- Guarda el keystore en un lugar seguro
- Documenta todas las contraseñas
- Haz backup del keystore
- Si lo pierdes, no podrás actualizar tu app en Play Store

### Paso 2: Crear Archivo de Propiedades del Keystore

Crea un archivo `android/keystore.properties` (este archivo NO debe subirse a Git):

```properties
storePassword=tu_contraseña_del_keystore
keyPassword=tu_contraseña_de_la_clave
keyAlias=mi-app-key
storeFile=../../keystores/mi-app-key.jks
```

**Ubicación del keystore:**
- Si está en `C:\keystores\mi-app-key.jks` (Windows), usa: `storeFile=../../keystores/mi-app-key.jks`
- Ajusta la ruta relativa según donde hayas guardado tu keystore
- En Linux/Mac, si está en `~/keystores/mi-app-key.jks`, usa: `storeFile=../../keystores/mi-app-key.jks`

### Paso 3: Configurar build.gradle para Usar el Keystore

Edita el archivo `android/app/build.gradle` y agrega la configuración de firma:

**1. Al inicio del archivo, después de `apply plugin`:**

```gradle
// Cargar propiedades del keystore
def keystorePropertiesFile = rootProject.file("keystore.properties")
def keystoreProperties = new Properties()
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}
```

**2. En la sección `android { ... }`, dentro de `buildTypes`, agrega:**

```gradle
android {
    // ... otras configuraciones
    
    signingConfigs {
        release {
            if (keystorePropertiesFile.exists()) {
                keyAlias keystoreProperties['keyAlias']
                keyPassword keystoreProperties['keyPassword']
                storeFile file(keystoreProperties['storeFile'])
                storePassword keystoreProperties['storePassword']
            }
        }
    }
    
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

### Paso 4: Agregar keystore.properties al .gitignore

Asegúrate de que `android/keystore.properties` esté en `.gitignore`:

```bash
# Agregar a .gitignore
echo "android/keystore.properties" >> .gitignore
echo "keystores/" >> .gitignore  # También ignora la carpeta de keystores
```

---

## Compilar el AAB con Gradle

### Paso 1: Instalar Android Studio

1. Descarga Android Studio: https://developer.android.com/studio
2. Instálalo siguiendo el asistente
3. Abre Android Studio al menos una vez para configurar el SDK

### Paso 2: Configurar Android SDK

1. Abre Android Studio
2. Ve a `File` → `Settings` (o `Preferences` en Mac)
3. Ve a `Appearance & Behavior` → `System Settings` → `Android SDK`
4. En la pestaña `SDK Platforms`, instala:
   - Android 14.0 (API 34) o superior
5. En la pestaña `SDK Tools`, asegúrate de tener:
   - Android SDK Build-Tools
   - Android SDK Platform-Tools
   - Android SDK Command-line Tools

### Paso 3: Configurar Variables de Entorno

Necesitas configurar `ANDROID_HOME` para que Gradle encuentre el SDK.

**Windows (PowerShell - Sesión actual):**
```powershell
$env:ANDROID_HOME = "C:\Users\$env:USERNAME\AppData\Local\Android\Sdk"
$env:PATH += ";$env:ANDROID_HOME\platform-tools;$env:ANDROID_HOME\tools"
```

**Windows (Permanente):**
1. Busca "Variables de entorno" en el menú de inicio
2. Agrega variable de usuario:
   - Nombre: `ANDROID_HOME`
   - Valor: `C:\Users\TuUsuario\AppData\Local\Android\Sdk`
3. Edita `PATH` y agrega:
   - `%ANDROID_HOME%\platform-tools`
   - `%ANDROID_HOME%\tools`

**Linux/Mac (Bash - Sesión actual):**
```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/tools
```

**Linux/Mac (Permanente):**
Agrega al final de `~/.bashrc` o `~/.zshrc`:
```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/tools
```

Luego ejecuta:
```bash
source ~/.bashrc  # o source ~/.zshrc
```

### Paso 3.1: Configurar gradle.properties (Optimización para Windows)

Edita `mobile/android/gradle.properties` para optimizar la compilación:

```properties
# Limitar arquitecturas (reduce problemas de rutas largas en Windows)
reactNativeArchitectures=arm64-v8a

# Optimizaciones de memoria para Gradle
org.gradle.jvmargs=-Xmx2048m -XX:MaxMetaspaceSize=512m
org.gradle.parallel=true

# Habilitar AndroidX
android.useAndroidX=true

# Optimizaciones de compilación
android.enablePngCrunchInReleaseBuilds=true
```

**¿Por qué solo arm64-v8a?**
- Cubre el 95%+ de dispositivos Android modernos
- Reduce significativamente los archivos temporales generados
- Evita problemas de rutas largas en Windows
- Compilación más rápida

**Si necesitas más arquitecturas** (solo cuando el problema de rutas esté resuelto):
```properties
reactNativeArchitectures=armeabi-v7a,arm64-v8a,x86,x86_64
```

### Paso 4: Verificar Instalación de Java

Gradle requiere Java (JDK):

```bash
java -version
```

Debería mostrar Java 11 o superior. Si no, instala JDK 11+.

**Ubicación del JDK en Windows:**
- Usualmente viene con Android Studio
- O descarga desde: https://adoptium.net/

### Paso 5: Compilar el AAB

⚠️ **IMPORTANTE PARA WINDOWS**: Si tu proyecto está en una ruta larga (ej: OneDrive/Documentos), lee primero la sección de "Solución de Problemas - Rutas Largas" antes de compilar.

**Opción A - Con Disco Virtual (Recomendado para Windows con rutas largas):**

```powershell
# 1. Crear disco virtual
subst T: "C:\Users\tu_usuario\OneDrive\Documentos\tourist_app_arroyo_seco-1"

# 2. Navegar al proyecto usando el disco virtual
cd T:\mobile\android

# 3. Compilar
.\gradlew.bat bundleRelease
```

**Opción B - Compilación Normal:**

Navega a la carpeta `android` y ejecuta Gradle:

```bash
cd mobile/android
./gradlew bundleRelease
```

**Windows:**
```bash
cd mobile\android
gradlew.bat bundleRelease
```

**¿Qué hace este comando?**
- `bundleRelease`: Compila la variante "release" y genera un AAB
- El AAB estará en: `android/app/build/outputs/bundle/release/app-release.aab`
- Si configuraste el keystore correctamente, el AAB ya viene firmado

**Tiempo estimado**: 5-15 minutos (primera vez puede tardar más)

**Posibles errores durante la compilación:**
- ❌ "ninja: error: Filename longer than 260 characters" → Ver solución de rutas largas arriba
- ❌ "SDK location not found" → Verifica ANDROID_HOME
- ❌ "Keystore file not found" → Verifica ruta en keystore.properties

### Paso 6: Verificar el AAB Generado

El archivo debería estar en:

```
mobile/android/app/build/outputs/bundle/release/app-release.aab
```

**Si usaste disco virtual T:, también puedes copiarlo a una ubicación más accesible:**

```powershell
# Copiar a la carpeta build principal de android
Copy-Item "T:\mobile\android\app\build\outputs\bundle\release\app-release.aab" -Destination "T:\mobile\android\build\app-release.aab"
```

Verifica que existe:
```bash
# Windows (ruta normal)
dir android\app\build\outputs\bundle\release\

# Windows (con disco virtual)
dir T:\mobile\android\build\

# Linux/Mac
ls -lh android/app/build/outputs/bundle/release/
```

**Información del archivo:**
- Tamaño esperado: 20-50 MB (dependiendo de tu app)
- Nombre: `app-release.aab`
- Este es el archivo que subirás a Google Play Console

---

## Firmar el AAB Manualmente

Si el AAB no se firmó automáticamente durante la compilación, puedes firmarlo manualmente:

### Paso 1: Verificar si ya está firmado (Opcional)

```bash
jarsigner -verify -verbose -certs android/app/build/outputs/bundle/release/app-release.aab
```

Si muestra "jar verified", ya está firmado. Si no, continúa con el siguiente paso.

### Paso 2: Firmar el AAB

```bash
jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 -keystore C:\keystores\mi-app-key.jks android\app\build\outputs\bundle\release\app-release.aab mi-app-key
```

**Linux/Mac:**
```bash
jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 -keystore ~/keystores/mi-app-key.jks android/app/build/outputs/bundle/release/app-release.aab mi-app-key
```

Te pedirá las contraseñas del keystore y de la clave.

### Paso 3: Verificar la Firma

```bash
jarsigner -verify -verbose -certs android/app/build/outputs/bundle/release/app-release.aab
```

Debería mostrar "jar verified" si todo está correcto.

### Paso 4: Alinear el AAB (Opcional pero Recomendado)

Alinea el AAB para optimizarlo:

```bash
# Windows (zipalign está en Android SDK)
"%ANDROID_HOME%\build-tools\34.0.0\zipalign" -v 4 android\app\build\outputs\bundle\release\app-release.aab android\app\build\outputs\bundle\release\app-release-aligned.aab

# Linux/Mac
$ANDROID_HOME/build-tools/34.0.0/zipalign -v 4 android/app/build/outputs/bundle/release/app-release.aab android/app/build/outputs/bundle/release/app-release-aligned.aab
```

**Nota**: Ajusta la versión de build-tools según la que tengas instalada (ej: 34.0.0, 33.0.0, etc.)

---

## Trabajar con Google Play Console

### Paso 1: Configurar Google Play App Signing (Recomendado)

Google Play App Signing gestiona y protege tu clave de firma.

**Primera vez:**

1. Ve a https://play.google.com/console
2. Inicia sesión con tu cuenta de desarrollador
3. Selecciona o crea una aplicación
4. Ve a `Configuración` → `Integridad de la app` → `Firma de aplicaciones`
5. **Acepta los términos** de Google Play App Signing
6. Sigue las instrucciones para subir tu clave de firma

### Paso 2: Crear una Nueva Versión

**1. Navega a la sección de lanzamientos:**
- Panel de Google Play Console
- Selecciona tu aplicación
- Ve a `Producción` (o `Pruebas` para testing)

**2. Crear nueva versión:**
- Haz clic en `Crear nueva versión`

**3. Subir el AAB:**
- Arrastra y suelta `app-release.aab` o haz clic en `Cargar`
- El archivo está en: `mobile/android/app/build/outputs/bundle/release/app-release.aab`
- Espera a que se procese (puede tardar unos minutos)

**4. Completar información de la versión:**

```
Nombre de la versión: 1.0.0 (debe coincidir con version en app.json)
Código de versión: 1 (debe coincidir con versionCode en app.json)

Notas de la versión:
- Primera versión pública
- Función de inicio de sesión
- Panel de usuario
```

**5. Configurar países/regiones:**
- Selecciona en qué países estará disponible tu app
- Puedes seleccionar todos o específicos

**6. Revisar y enviar:**
- Revisa toda la información
- Haz clic en `Guardar` y luego en `Revisar versión`
- Si todo está correcto, haz clic en `Iniciar lanzamiento`

### Paso 3: Completar la Ficha de Play Store (Primera Vez)

Antes de publicar, debes completar:

- **Detalles de la Aplicación**: Título, descripción
- **Recursos Gráficos**: Icono 512x512, capturas de pantalla
- **Categorización**: Categoría, tipo de contenido
- **Clasificación de Contenido**: Cuestionario de clasificación
- **Política de Privacidad**: URL obligatoria

---

## Solución de Problemas Comunes

### ⚠️ Error CRÍTICO: "ninja: error: Filename longer than 260 characters" (Windows)

**Causa**: Windows tiene un límite de 260 caracteres en las rutas de archivos. Si tu proyecto está en una ruta larga como `C:\Users\nombre\OneDrive\Documentos\nombre_proyecto_largo\`, las compilaciones nativas de React Native fallarán.

**Síntomas**:
- Error: `ninja: error: mkdir(...): No such file or directory`
- Error: `Filename longer than 260 characters`
- Advertencias de CMake sobre rutas muy largas
- Falla en la compilación de `react-native-reanimated` o `react-native-safe-area-context`

**Soluciones (en orden de preferencia):**

#### Solución 1: Usar un Disco Virtual (Rápido y Efectivo) ⭐

Esta es la solución más rápida si no puedes mover el proyecto:

```powershell
# Crear disco virtual T: que apunta a tu proyecto
subst T: "C:\Users\tu_usuario\OneDrive\Documentos\tourist_app_arroyo_seco-1"

# Navegar al proyecto usando el disco virtual
cd T:\mobile\android

# Compilar desde la ruta corta
.\gradlew.bat bundleRelease
```

**Ventajas:**
- ✅ Solución inmediata (30 segundos)
- ✅ No necesitas mover archivos
- ✅ No necesitas permisos de administrador
- ✅ Funciona con OneDrive

**Desventajas:**
- ⚠️ El disco virtual se pierde al reiniciar la computadora
- ⚠️ Debes recrearlo cada vez que abras una nueva terminal

**Para hacerlo permanente**, crea un script `crear-disco-virtual.ps1`:
```powershell
# crear-disco-virtual.ps1
subst T: "C:\Users\tu_usuario\OneDrive\Documentos\tourist_app_arroyo_seco-1"
Write-Host "Disco virtual T: creado exitosamente" -ForegroundColor Green
```

Ejecútalo cada vez que abras PowerShell antes de compilar.

#### Solución 2: Mover el Proyecto a una Ruta Corta (Recomendado a Largo Plazo)

Mueve tu proyecto a una ubicación más corta:

```powershell
# Crear carpeta en raíz
New-Item -ItemType Directory -Path "C:\dev" -Force

# Mover el proyecto
Move-Item -Path "C:\Users\tu_usuario\OneDrive\Documentos\tourist_app_arroyo_seco-1" -Destination "C:\dev\tourist_app"

# Navegar al nuevo proyecto
cd C:\dev\tourist_app\mobile\android

# Compilar
.\gradlew.bat bundleRelease
```

**Comparación de rutas:**
- ❌ Antes: `C:\Users\raton\OneDrive\Documentos\tourist_app_arroyo_seco-1\mobile\android\app` (79 caracteres base)
- ✅ Después: `C:\dev\tourist_app\mobile\android\app` (37 caracteres base)

**Ventajas:**
- ✅ Solución permanente
- ✅ Compilaciones más rápidas
- ✅ Compatible con todas las herramientas

**Desventajas:**
- ⚠️ Requiere mover archivos (5-10 minutos)
- ⚠️ Debes actualizar rutas en tu IDE
- ⚠️ Si usas OneDrive, perderás la sincronización automática

#### Solución 3: Habilitar Rutas Largas en Windows (Requiere Admin + Reinicio)

Habilita soporte de rutas largas en Windows:

**Opción A - Via Registro (PowerShell como Administrador):**
```powershell
# Ejecutar PowerShell como Administrador
New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force

# Reiniciar la computadora
Restart-Computer
```

**Opción B - Via Group Policy (Windows 10/11 Pro):**
1. Presiona `Win + R`, escribe `gpedit.msc`
2. Navega a: `Computer Configuration` → `Administrative Templates` → `System` → `Filesystem`
3. Habilita "Enable Win32 long paths"
4. Reinicia la computadora

**Ventajas:**
- ✅ Solución permanente a nivel de sistema
- ✅ Funciona para todos los proyectos

**Desventajas:**
- ⚠️ Requiere permisos de administrador
- ⚠️ Requiere reiniciar la computadora
- ⚠️ Algunas herramientas antiguas pueden no funcionar

#### Solución 4: Compilar Solo Arquitectura arm64-v8a

Reduce la cantidad de archivos generados compilando solo para dispositivos modernos:

Edita `mobile/android/gradle.properties`:
```properties
# Compilar solo para arm64-v8a (reduce problemas de rutas)
reactNativeArchitectures=arm64-v8a
```

**Ventajas:**
- ✅ Reduce archivos temporales generados
- ✅ Compilación más rápida
- ✅ Suficiente para 95% de dispositivos Android modernos

**Desventajas:**
- ⚠️ No funcionará en dispositivos muy antiguos (Android < 5.0)

### Error: "versionCode X has already been used"

**Causa**: Ya subiste un AAB con ese versionCode.

**Solución**:
1. Abre `mobile/app.json`
2. Incrementa `android.versionCode` (ej: de 1 a 2)
3. Actualiza `version` si es necesario (ej: de "1.0.0" a "1.1.0")
4. Regenera el código nativo:
   ```bash
   cd mobile
   npx expo prebuild --platform android --clean
   ```
5. Recompila el AAB:
   ```bash
   cd android
   ./gradlew bundleRelease  # o gradlew.bat bundleRelease en Windows
   ```

### Error: "ANDROID_HOME is not set"

**Causa**: Las variables de entorno no están configuradas.

**Solución**:
- Verifica que `ANDROID_HOME` esté configurado (ver sección de variables de entorno)
- En Windows, reinicia la terminal después de configurar
- En Linux/Mac, ejecuta `source ~/.bashrc` o reinicia la terminal

### Error: "Command 'gradlew' not found" o "gradlew.bat no encontrado"

**Causa**: No se generó la carpeta `android/` o no estás en el directorio correcto.

**Solución**:
```bash
cd mobile
npx expo prebuild --platform android
cd android
# Ahora deberías poder ejecutar gradlew
```

### Error: "Keystore file not found"

**Causa**: La ruta en `keystore.properties` es incorrecta.

**Solución**:
1. Verifica la ruta del keystore en `android/keystore.properties`
2. La ruta debe ser relativa a `android/` o absoluta
3. Ejemplo: Si el keystore está en `C:\keystores\mi-app-key.jks` y estás en `android/`, usa:
   ```
   storeFile=C:/keystores/mi-app-key.jks
   ```
   O ruta relativa:
   ```
   storeFile=../../keystores/mi-app-key.jks
   ```

### Error: "Execution failed for task ':app:bundleRelease'"

**Causas posibles**:
- Falta el keystore configurado
- Contraseña incorrecta en `keystore.properties`
- Problemas con dependencias de Gradle

**Soluciones**:
1. Verifica que `keystore.properties` existe y tiene las rutas correctas
2. Verifica que el keystore existe en la ruta especificada
3. Intenta limpiar el proyecto:
   ```bash
   cd android
   ./gradlew clean  # o gradlew.bat clean en Windows
   ./gradlew bundleRelease
   ```

### Error: "jarsigner: unable to sign jar"

**Causa**: Contraseña incorrecta o alias incorrecto.

**Solución**:
- Verifica el alias del keystore: `keytool -list -keystore mi-app-key.jks`
- Verifica que las contraseñas sean correctas
- Asegúrate de usar el alias correcto en el comando jarsigner

### El AAB es muy grande (>150MB)

**Soluciones**:
1. Habilita código de ofuscación: `minifyEnabled true` (ya debería estar en build.gradle)
2. Habilita reducción de recursos: `shrinkResources true`
3. Usa WebP en lugar de PNG para imágenes
4. Considera Play Asset Delivery para recursos grandes

---

## Checklist Final

### Configuración del Proyecto

- ☐ `android.package` configurado en `app.json`
- ☐ `versionCode` incrementado correctamente
- ☐ `version` actualizado en `app.json`
- ☐ Código nativo generado (`expo prebuild`)
- ☐ Carpeta `android/` creada y verificada

### Keystore

- ☐ Keystore creado y guardado en lugar seguro
- ☐ Contraseñas documentadas y seguras
- ☐ Backup del keystore creado
- ☐ `keystore.properties` configurado correctamente
- ☐ `keystore.properties` agregado a `.gitignore`
- ☐ `build.gradle` configurado para usar el keystore

### Android SDK

- ☐ Android Studio instalado
- ☐ Android SDK instalado (API 34 o superior)
- ☐ Build Tools instalados
- ☐ `ANDROID_HOME` configurado en variables de entorno
- ☐ Java JDK instalado (11 o superior)

### Compilación

- ☐ `ANDROID_HOME` verificado y configurado
- ☐ **[WINDOWS]** Ruta del proyecto verificada (máximo 80 caracteres recomendado)
- ☐ **[WINDOWS CON RUTA LARGA]** Disco virtual creado con `subst`
- ☐ `gradlew bundleRelease` ejecutado exitosamente
- ☐ AAB generado en `android/app/build/outputs/bundle/release/`
- ☐ AAB copiado a ubicación accesible (opcional)
- ☐ AAB firmado (verificado con jarsigner)
- ☐ Tamaño del AAB razonable (<150MB)

### Google Play Console

- ☐ Información de la app completa
- ☐ Capturas de pantalla subidas (mínimo 2)
- ☐ Icono de 512x512 subido
- ☐ Política de privacidad configurada
- ☐ AAB subido y procesado correctamente
- ☐ Notas de la versión escritas
- ☐ versionCode coincide entre `app.json` y Play Console

### Pruebas

- ☐ Prueba interna realizada (opcional)
- ☐ Probado en múltiples dispositivos Android
- ☐ Funciones críticas verificadas
- ☐ No hay crashes conocidos

---

## Comandos Rápidos de Referencia

### Crear Disco Virtual (Windows - Para Rutas Largas)
```powershell
# Crear disco virtual T: apuntando a tu proyecto
subst T: "C:\Users\tu_usuario\OneDrive\Documentos\tourist_app_arroyo_seco-1"

# Verificar que se creó
cd T:\

# Eliminar disco virtual (cuando termines)
subst T: /D
```

### Generar Código Nativo
```bash
cd mobile
npx expo prebuild --platform android
```

### Crear Keystore
```bash
keytool -genkeypair -v -storetype PKCS12 -keystore keystores/mi-app-key.jks -alias mi-app-key -keyalg RSA -keysize 2048 -validity 10000
```

### Compilar AAB

**Opción 1 - Con disco virtual (Windows con rutas largas):**
```powershell
subst T: "C:\ruta\completa\a\tu\proyecto"
cd T:\mobile\android
.\gradlew.bat bundleRelease
```

**Opción 2 - Normal:**
```bash
cd mobile/android
./gradlew bundleRelease  # Linux/Mac
gradlew.bat bundleRelease  # Windows
```

### Limpiar Build (Si hay problemas)
```bash
cd mobile/android
./gradlew clean  # Linux/Mac
.\gradlew.bat clean  # Windows

# Eliminar caché de CMake
Remove-Item -Recurse -Force app\.cxx  # Windows PowerShell
rm -rf app/.cxx  # Linux/Mac
```

### Copiar AAB a Ubicación Accesible (Opcional)
```powershell
# Windows con disco virtual
Copy-Item "T:\mobile\android\app\build\outputs\bundle\release\app-release.aab" -Destination "T:\mobile\android\build\app-release.aab"

# Windows normal
Copy-Item "android\app\build\outputs\bundle\release\app-release.aab" -Destination "android\build\app-release.aab"
```

### Firmar AAB Manualmente
```bash
jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 -keystore keystores/mi-app-key.jks android/app/build/outputs/bundle/release/app-release.aab mi-app-key
```

### Verificar Firma
```bash
jarsigner -verify -verbose -certs android/app/build/outputs/bundle/release/app-release.aab
```

---

## Recursos Adicionales

**Documentación Oficial:**
- Expo Prebuild: https://docs.expo.dev/workflow/prebuild/
- Android App Bundle: https://developer.android.com/guide/app-bundle
- Google Play Console: https://support.google.com/googleplay/android-developer

**Herramientas Útiles:**
- Android Studio: https://developer.android.com/studio
- Bundletool: https://github.com/google/bundletool (para probar AABs)
- Google Play Console: https://play.google.com/console

**Mejores Prácticas:**
- Mantén siempre un backup de tu keystore
- Incrementa versionCode en cada actualización
- Usa pruebas internas antes de producción
- Lee las políticas de Google Play regularmente
- Monitorea los reportes de crashes en Play Console
- NO subas `keystore.properties` o archivos `.jks` a Git
- **[WINDOWS]** Evita rutas largas - usa carpetas en raíz como `C:\dev\`
- **[WINDOWS]** Si usas OneDrive, considera desactivar la sincronización de la carpeta del proyecto durante compilación
- Crea un script de compilación con el disco virtual si trabajas con rutas largas
- Documenta el proceso de compilación específico de tu proyecto

**Tips Específicos para Windows:**
- Prefiere `C:\dev\proyecto` sobre `C:\Users\...\OneDrive\Documentos\proyecto`
- Usa `subst` para crear discos virtuales si no puedes mover el proyecto
- Configura `reactNativeArchitectures=arm64-v8a` en gradle.properties
- Si OneDrive sincroniza tu proyecto, puede ralentizar la compilación
- Considera usar WSL2 (Windows Subsystem for Linux) para compilaciones más estables

---
