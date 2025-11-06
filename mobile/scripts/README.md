# Scripts de Firma de App Android (Método Manual)

Este directorio contiene scripts automatizados para firmar y generar archivos AAB para la aplicación móvil desarrollada con Expo, usando el **método manual completo**.

## ⚠️ Importante: Método Manual

Estos scripts utilizan el proceso **100% manual**:
- ✅ Generan código nativo con `expo prebuild`
- ✅ Crean y configuran keystore manualmente
- ✅ Compilan con Gradle (no EAS Build)
- ✅ Firmado manual del AAB

**NO utilizan EAS Build ni servicios en la nube.**

## Archivos Disponibles

### 📄 FIRMA_APP_ANDROID.md
Documentación completa y detallada sobre el proceso manual de firma de apps Expo para Android. Contiene:
- Explicación de qué es un AAB
- Requisitos previos (Android Studio, JDK, etc.)
- Generación de código nativo con `expo prebuild`
- Creación manual de keystore
- Configuración de Gradle
- Compilación con Gradle
- Firma manual del AAB
- Solución de problemas comunes
- Checklist final

**Ubicación**: `mobile/FIRMA_APP_ANDROID.md`

### 🔷 firmar-app-windows.ps1
Script de PowerShell para Windows que automatiza el proceso manual de firma.

**Uso:**
```powershell
cd mobile
.\scripts\firmar-app-windows.ps1
```

**Qué hace:**
1. Verifica que estás en el directorio correcto
2. Comprueba dependencias (Node.js, npm, Java JDK, Android SDK)
3. Verifica y configura `app.json`
4. Genera código nativo Android (`expo prebuild`)
5. Crea y configura keystore manualmente
6. Configura `build.gradle` para usar el keystore
7. Compila el AAB con Gradle (`gradlew bundleRelease`)

**Características:**
- ✅ Colores para mejor legibilidad
- ✅ Explicaciones de cada paso
- ✅ Validación automática de dependencias
- ✅ Verificación de variables de entorno (ANDROID_HOME)
- ✅ Guía interactiva paso a paso

### 🔷 firmar-app-linux.sh
Script de Bash para Linux/Mac que automatiza el proceso manual de firma.

**Uso:**
```bash
cd mobile
./scripts/firmar-app-linux.sh
# o
bash scripts/firmar-app-linux.sh
```

**Qué hace:**
- Lo mismo que el script de Windows, pero adaptado para sistemas Unix

**Características:**
- ✅ Mismo flujo que el script de Windows
- ✅ Compatible con Linux y macOS
- ✅ Verificación de permisos de ejecución
- ✅ Colores y formato legible

## Requisitos Previos

Antes de ejecutar los scripts, asegúrate de tener:

1. **Node.js** (versión 18 o superior)
   - Verificar: `node --version`
   - Descarga: https://nodejs.org/

2. **npm** (viene con Node.js)
   - Verificar: `npm --version`

3. **Java JDK** (versión 11 o superior)
   - Verificar: `java -version`
   - Descarga: https://adoptium.net/
   - O viene con Android Studio

4. **Android Studio**
   - Descarga: https://developer.android.com/studio
   - Instala el Android SDK (API 34 o superior)
   - Configura `ANDROID_HOME` en variables de entorno

5. **Cuenta de Google Play Console** (para publicar)
   - Requiere pago único de $25 USD
   - https://play.google.com/console

## Uso Rápido

### Primera Vez

1. **Navega al directorio mobile:**
   ```bash
   cd mobile
   ```

2. **Configura ANDROID_HOME** (si no está configurado):
   
   **Windows (PowerShell):**
   ```powershell
   $env:ANDROID_HOME = "C:\Users\$env:USERNAME\AppData\Local\Android\Sdk"
   ```
   
   **Linux/Mac:**
   ```bash
   export ANDROID_HOME=$HOME/Android/Sdk
   ```

3. **Ejecuta el script apropiado:**
   
   **Windows:**
   ```powershell
   .\scripts\firmar-app-windows.ps1
   ```
   
   **Linux/Mac:**
   ```bash
   ./scripts/firmar-app-linux.sh
   ```

4. **Sigue las instrucciones del script:**
   - El script te guiará paso a paso
   - Te preguntará cuando necesite tu intervención
   - Lee cada mensaje cuidadosamente

### Siguientes Veces

Una vez configurado:
- Solo ejecuta el script de nuevo
- El script detectará configuraciones existentes
- Podrás saltar pasos ya completados

## Explicación de los Comandos Principales

### ¿Por qué `npx expo prebuild --platform android`?

- **`expo prebuild`**: Genera código nativo a partir de tu configuración Expo
- **`--platform android`**: Solo genera código Android (no iOS)
- **Resultado**: Crea la carpeta `android/` con todo el código nativo necesario

### ¿Por qué `gradlew bundleRelease`?

- **`gradlew`**: Wrapper de Gradle (no necesitas Gradle instalado globalmente)
- **`bundleRelease`**: Compila la variante "release" y genera un AAB (no APK)
- **Resultado**: Genera `app-release.aab` en `android/app/build/outputs/bundle/release/`

### ¿Por qué AAB y no APK?

Google Play Store requiere AAB desde agosto de 2021 porque:
- Reduce el tamaño de descarga hasta 15%
- Genera APKs optimizados para cada dispositivo
- Mejora la experiencia del usuario

### ¿Por qué método manual y no EAS Build?

El método manual te da:
- ✅ Control total sobre el proceso
- ✅ No dependes de servicios en la nube
- ✅ Compilación local (más rápido una vez configurado)
- ✅ Entiendes cada paso del proceso
- ✅ Útil para aprender cómo funciona Android

## Proceso Paso a Paso

1. **Generar código nativo** (`expo prebuild`)
   - Crea carpeta `android/` con código nativo

2. **Crear keystore** (`keytool`)
   - Genera archivo `.jks` con tu clave de firma
   - Guarda contraseñas de forma segura

3. **Configurar keystore**
   - Crea `android/keystore.properties` con rutas y contraseñas
   - NO subir a Git

4. **Configurar build.gradle**
   - Edita `android/app/build.gradle`
   - Agrega configuración de `signingConfigs`

5. **Compilar AAB** (`gradlew bundleRelease`)
   - Gradle compila y firma automáticamente (si está bien configurado)

6. **Firmar manualmente** (si es necesario)
   - Usa `jarsigner` para firmar el AAB

7. **Subir a Play Store**
   - Descarga el AAB de `android/app/build/outputs/bundle/release/`
   - Súbelo a Google Play Console

## Solución de Problemas

### El script dice "No se encontró app.json"
**Solución**: Asegúrate de estar en el directorio `mobile`:
```bash
cd mobile
```

### Error "ANDROID_HOME is not set"
**Solución**: Configura la variable de entorno:
- **Windows**: Configura en "Variables de entorno" del sistema
- **Linux/Mac**: Agrega a `~/.bashrc` o `~/.zshrc`:
  ```bash
  export ANDROID_HOME=$HOME/Android/Sdk
  ```

### Error "Java not found"
**Solución**: Instala JDK 11 o superior:
- Descarga: https://adoptium.net/
- O instala Android Studio (incluye JDK)

### Error "gradlew no encontrado"
**Solución**: Ejecuta `expo prebuild` primero para generar la carpeta `android/`:
```bash
npx expo prebuild --platform android
```

### El build falla con error de keystore
**Soluciones comunes:**
1. Verifica que `keystore.properties` existe y tiene rutas correctas
2. Verifica que el keystore existe en la ruta especificada
3. Verifica que las contraseñas son correctas
4. Revisa `android/app/build.gradle` para asegurarte de que está configurado

## Próximos Pasos Después del Build

1. **Encontrar el AAB:**
   - Ubicación: `mobile/android/app/build/outputs/bundle/release/app-release.aab`
   - Verifica el tamaño (debe ser razonable, <150MB)

2. **Verificar la firma (opcional):**
   ```bash
   jarsigner -verify -verbose -certs app-release.aab
   ```

3. **Subir a Google Play Console:**
   - Inicia sesión en https://play.google.com/console
   - Selecciona tu app
   - Ve a "Producción" → "Crear nueva versión"
   - Sube el archivo AAB

4. **Completar información:**
   - Notas de la versión
   - Capturas de pantalla (si es primera vez)
   - Otros requisitos de Play Store

5. **Enviar para revisión:**
   - Revisa toda la información
   - Haz clic en "Enviar para revisión"

## Seguridad: Archivos que NO deben subirse a Git

⚠️ **NUNCA subas estos archivos a Git:**
- `android/keystore.properties` (contiene contraseñas)
- Archivos `.jks` o `.keystore`
- Carpeta `keystores/`

**Solución**: Agrega a `.gitignore`:
```
android/keystore.properties
keystores/
*.jks
*.keystore
```

## Recursos Adicionales

- **Documentación completa**: `mobile/FIRMA_APP_ANDROID.md`
- **Expo Prebuild Docs**: https://docs.expo.dev/workflow/prebuild/
- **Android Gradle Plugin**: https://developer.android.com/studio/build
- **Google Play Console**: https://play.google.com/console
- **Soporte Expo**: https://docs.expo.dev/

---

**Nota**: Los scripts están diseñados para ser interactivos y educativos. Cada paso explica qué hace y por qué es necesario. Si prefieres más control, puedes ejecutar los comandos manualmente siguiendo `FIRMA_APP_ANDROID.md`.

**Diferencia clave**: Este método es **completamente manual** y **NO usa EAS Build**. Tienes control total sobre cada paso del proceso.
