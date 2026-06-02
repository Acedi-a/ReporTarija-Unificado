# 📱 App Ciudadana ReportaTarija

## 📋 Contexto General del Proyecto
**ReportaTarija** es una plataforma de reporte ciudadano municipal diseñada para fomentar la participación ciudadana y optimizar la gestión de incidencias urbanas en la ciudad de Tarija. Este proyecto corresponde al **Cliente Móvil** (dirigido exclusivamente al ciudadano) desarrollado para la materia de **Ingeniería de Software 2** de la **UPDS**.

El ecosistema completo está integrado por:
*   **App Móvil Ciudadana (Este Repositorio):** Desarrollada con React Native/Expo para que los ciudadanos registren incidencias, capturen coordenadas geográficas, adjunten evidencia fotográfica y hagan seguimiento a sus reportes.
*   **Portal Web Municipal:** Panel administrativo para que los funcionarios municipales revisen, asignen, actualicen y resuelvan las solicitudes ciudadanas.
*   **BaaS (Backend as a Service) - InsForge:** Centraliza el almacenamiento de base de datos PostgreSQL (con API PostgREST), autenticación y almacenamiento de evidencias (Storage).

---

## 🛠️ Stack Tecnológico

La aplicación está construida sobre un conjunto de tecnologías modernas que garantizan un óptimo rendimiento en dispositivos móviles:

*   **Framework Principal:** [React Native](https://reactnative.dev/) + [Expo SDK 54](https://expo.dev/) (con arquitectura New Architecture habilitada).
*   **Lenguaje:** [TypeScript](https://www.typescriptlang.org/) de forma estricta.
*   **Manejador de Paquetes:** [pnpm](https://pnpm.io/) (Regla obligatoria del repositorio).
*   **Enrutamiento:** [Expo Router](https://docs.expo.dev/router/introduction/) (enrutamiento basado en archivos).
*   **Manejo de Formularios y Validación:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/).
*   **Integración del Backend:** SDK oficial `@insforge/sdk` para operaciones de base de datos, storage y autenticación.
*   **Servicios del Dispositivo:**
    *   `expo-location` para captura de coordenadas GPS.
    *   `expo-image-picker` para toma y selección de evidencia fotográfica.
*   **Componentes de Interfaz y Estilos:** Hojas de estilo integradas de React Native (Vanilla CSS approach) y set de iconos de `@expo/vector-icons`.
*   **Pruebas Unitarias:** [Jest](https://jestjs.io/) + `ts-jest` para un entorno aislado de ejecución.

---

## 📐 Arquitectura del Proyecto

El código está estructurado bajo un enfoque orientado a **Features** (características del negocio) con el fin de maximizar la cohesión y minimizar el acoplamiento:

```txt
app/                       # Expo Router (Estructura de Rutas)
  (tabs)/
    index.tsx              # Pantalla de Inicio / Dashboard
    create.tsx             # Formulario de Nuevo Reporte
    reports.tsx            # Lista de Mis Reportes (Historial)
    notifications.tsx      # Alertas Internas de Estado
    profile.tsx            # Perfil y Reputación del Ciudadano
  report/
    [id].tsx               # Detalle Completo de Reporte y Línea de Tiempo
  _layout.tsx              # Contenedor de Navegación por Pestañas (Tabs)
  login.tsx                # Inicio de Sesión
  register.tsx             # Registro de Ciudadano

src/
  features/                # Lógica del Negocio por Módulo
    auth/                  # Autenticación (Servicios, DTOs)
    home/                  # Dashboard (Visualizadores de Mapa, Hooks)
    reports/               # CRUD de Incidencias (Formularios, Hooks)
    notifications/         # Notificaciones Internas
    profile/               # Gestión de Rango y Puntos
  shared/                  # Recursos Reutilizables Comunes
    components/            # UI básica (Botones, Badges, Loaders)
    constants/             # Paletas de color, estados de reportes, rangos de reputación
    utils/                 # Funciones puras (validadores, formateadores)
  lib/                     # Clientes de integración
    insforge.ts            # Singleton de Conexión BaaS
```

---

## 💾 Modelo de Datos Compartido (BaaS)

La base de datos PostgreSQL gestionada en InsForge cuenta con el siguiente esquema lógico estructurado:

*   `users`: Datos de los ciudadanos y funcionarios. Restringe el rol a los valores `('CITIZEN', 'ADMIN', 'FUNCIONARIO', 'TECNICO', 'RESPONSABLE_AREA')`.
*   `areas`: Sectores del municipio (ej. Obras Públicas, Alumbrado, Aseo Urbano).
*   `categories`: Tipos de incidencias (`BACHE`, `ALUMBRADO_PUBLICO`, `BASURA_ACUMULADA`, `FUGA_DE_AGUA`, `SEMAFORO_DANADO`, `OTROS`) asociados a un área por defecto.
*   `reports`: Registro principal de incidentes con coordenadas decimales (`latitude`, `longitude`), dirección aproximada, barrio, prioridad e ID del ciudadano creador.
*   `evidences`: Urls de almacenamiento de imágenes adjuntas en los reportes.
*   `tracking`: Auditoría e historial del ciclo de vida del reporte (`PENDIENTE` ➔ `EN_REVISION` ➔ `ASIGNADO` ➔ `EN_PROCESO` ➔ `RESUELTO` o `RECHAZADO`).
*   `notifications`: Registro de notificaciones de cambio de estado enviadas de manera interna al ciudadano.

---

## 🎨 Patrones de Diseño Aplicados

Para cumplir con los principios de calidad académica, se implementaron de forma explícita 6 patrones de diseño de software:

1.  **Singleton (Creacional):** Implementado en `src/lib/insforge.ts` en la clase `InsforgeClient`. Asegura una única instancia de conexión con el SDK de InsForge de forma perezosa (*Lazy Initialization*) y con constructor privado.
2.  **Repository (Datos):** Encapsulado en la capa de servicios (`src/features/*/services/`). Aísla por completo las pantallas JSX del SDK directo, centralizando las consultas CRUD a la base de datos de InsForge.
3.  **Data Transfer Object — DTO (Estructura):** Implementado en clases como `CreateReportDto`, `LoginDto` y `RegisterDto`. Transportan conjuntos estructurados de datos mitigando el Bad Smell de *Primitive Obsession* en las firmas de los métodos.
4.  **Strategy (Comportamiento):** Mapea estrategias de renderizado dinámico en función de la plataforma. Para web se utiliza `HomeMapTab.web.tsx` (OpenStreetMap iframe) y para móviles nativos `HomeMapTab.native.tsx` (react-native-maps).
5.  **Facade / Fachada (Estructural):** Representada en hooks complejos como `useCreateReportForm.ts` y los servicios core. Unifica la interacción con sensores como geolocalización, cámara, validación del validador Zod y llamadas de red bajo una interfaz de funciones simple.
6.  **State / Tabla de Decisiones (Comportamiento):** Evita bifurcaciones anidadas condicionales (`if/else`) en la interfaz. Se aplica en `reportStatus.ts` y `reputation.ts` para mapear de forma declarativa la estética visual (colores, iconos, etiquetas) según el estado de la entidad.

---

## 🧪 Pruebas Unitarias y TDD

El proyecto cuenta con una cobertura integral de pruebas unitarias desarrolladas bajo la metodología **TDD (Test-Driven Development)**:

### 1. Ciclos TDD Realizados (Red-Green-Refactor)
Se construyeron 5 funciones utilitarias puras implementadas exclusivamente desde la suite de pruebas:

*   **`isValidReportTitle(title)`**: Valida que el título no sea vacío, no contenga solo espacios y se encuentre en el rango de longitud requerido.
*   **`formatCoordinates(lat, lon)`**: Formatea la geolocalización decimal a una cadena visual con precisión fija de 6 decimales, controlando adecuadamente los valores nulos.
*   **`canCancelReport(status)`**: Determina si un ciudadano puede cancelar una incidencia basándose en su estado actual (solo permitido en `PENDIENTE` o `EN_REVISION`).
*   **`truncateText(text, limit)`**: Trunca cadenas largas agregando puntos suspensivos (`...`) en interfaces de lista reducidas.
*   **`getReportPriorityLabel(priority)`**: Mapea la clave de base de datos a una cadena visual amigable precedida por un emoji indicador de severidad (ej. `BAJA` ➔ `🟢 Baja`).

### 2. Prueba de Humo (Smoke Test)
Ubicada en `__tests__/smoke.test.ts`, esta prueba valida de forma rápida la estabilidad inicial del arranque del sistema:
*   Comprueba que el Singleton de `InsforgeClient` comparta de forma exacta la misma referencia en memoria.
*   Verifica que `authService` responda adecuadamente con un usuario demo en situaciones sin conectividad física, garantizando la resiliencia del arranque de la app.

Para ejecutar todas las pruebas, ejecute el comando:
```bash
pnpm test
```

---

## 🛠️ Refactorizaciones y Bad Smells Corregidos

Se realizó una auditoría y limpieza profunda del código original, reduciendo sustancialmente la complejidad ciclomática y el tamaño de las vistas:

*   **Extract Component:** Se extrajeron componentes inline gigantes de las pantallas a subcomponentes aislados y descriptivos (ej. `NotificationCard`, `DescriptionInput`, `QuickCategoryRow`, `HeroNewReportCard`).
*   **Extract Hook:** Se eliminó el exceso de lógica de estado (`useState`, `useEffect` y lógica de llamada a servicios) de las vistas a hooks de control reactivos dedicados (`useCreateReportForm`, `useMyReports`, `useNotificationsList`, `useReportDetail`).
*   **Replace Magic Number:** Se centralizaron constantes hardcodeadas y de configuración repetitiva (títulos mínimos, coordenadas GPS predeterminadas de Tarija `-21.5355, -64.7296`, colores primarios) en archivos de definición de constantes compartidas.
*   **Table-Driven Logic / Replace Conditional:** Se eliminaron estructuras condicionales acopladas (`switch-case` e `if-else` largos) reemplazándolas por diccionarios y mapas estáticos estables.

### 📊 Impacto de la Refactorización en Líneas de Código

| Componente / Pantalla | Líneas Iniciales | Líneas Finales | Reducción (%) |
| :--- | :---: | :---: | :---: |
| **Home Screen** | 369 | 110 | **70.2%** |
| **Create Report Screen** | 306 | 98 | **67.9%** |
| **Notifications Screen** | 281 | 110 | **60.8%** |
| **My Reports Screen** | 250 | 118 | **52.8%** |
| **Profile Screen** | 207 | 129 | **37.7%** |
| **Report Detail Screen** | 234 | 148 | **36.7%** |

---

## 🚀 Instalación y Ejecución Local

Siga los siguientes pasos para ejecutar el proyecto en su entorno local:

### ⚠️ Prerrequisitos
Asegúrese de tener instalado [Node.js](https://nodejs.org/) y el gestor de paquetes **pnpm**:
```bash
npm install -g pnpm
```

### 1. Clonar el repositorio e Instalar dependencias
Instale los paquetes requeridos usando **pnpm** (no utilice npm ni yarn):
```bash
pnpm install
```

### 2. Configurar Variables de Entorno
Copie el archivo de ejemplo `.env` y configure sus credenciales de InsForge correspondientes:
```bash
cp .env.example .env
```
Edite `.env` agregando:
```txt
EXPO_PUBLIC_INSFORGE_URL=https://tu-proyecto.insforge.app
EXPO_PUBLIC_INSFORGE_ANON_KEY=tu-anon-key-de-insforge
```

### 3. Iniciar el Servidor de Desarrollo de Expo
Para lanzar el emulador o interactuar con el dispositivo real a través de Expo Go:
```bash
pnpm start
```
*   Presione `a` para abrir en el emulador de Android.
*   Presione `w` para abrir en el navegador web (Modo Web).
*   Escanee el código QR desde la app de Expo Go en su celular para pruebas nativas.

