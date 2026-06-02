🏛️📱 Ecosistema ReportaTarija
Plataforma municipal de reporte ciudadano para la gestión de incidencias urbanas en Tarija.

ReactReact NativeTypeScriptExpoVite

Materia: Ingeniería de Software 2  ·  Tema: Soluciones para el sector público y social
Universidad: UPDS  ·  Autor: Jiménez Daniel Gustavo

📋 Contexto General
ReportaTarija es un ecosistema diseñado para fomentar la participación ciudadana y optimizar la gestión municipal. Se compone de dos aplicaciones front-end que convergen en un único Backend as a Service (BaaS):

📱 App Móvil Ciudadana: Desarrollada con React Native/Expo para que los ciudadanos registren incidencias, capturen coordenadas, adjunten evidencia y hagan seguimiento.
🏛️ Portal Web Municipal: Desarrollada con React/Vite para que los funcionarios revisen, asignen, actualicen y resuelvan las solicitudes desde un panel administrativo.
Ambos clientes se conectan de forma segura a InsForge (BaaS), el cual centraliza la base de datos PostgreSQL, autenticación y almacenamiento.

📂 Estructura del Repositorio (Monorepo)
ReporTarija-Unificado/├── App-ReporTarija/             # 📱 Cliente móvil (React Native + Expo)└── Portal-web-ReporTarija/      # 🏛️ Cliente web administrativo (React + Vite)
🛠️ Stack Tecnológico Compartido y por Módulo
Core Compartido
Lenguaje: TypeScript (Estricto)
Backend: InsForge SDK (PostgreSQL + PostgREST + Auth + Storage)
Formularios/Validación: React Hook Form + Zod
Gestor de Paquetes: pnpm (Obligatorio)
📱 App Móvil (App-ReporTarija)
Framework: React Native + Expo SDK 54 (New Architecture)
Navegación: Expo Router (File-based)
Sensores: expo-location, expo-image-picker
Testing: Jest + ts-jest
🏛️ Portal Web (Portal-web-ReporTarija)
Framework: React + Vite
Estilos: Tailwind CSS + Radix UI + shadcn
Estado/Caché: TanStack Query
Mapas: MapLibre GL
Testing: Vitest + Playwright
💾 Modelo de Datos Compartido (BaaS)
La base de datos PostgreSQL en InsForge cuenta con el siguiente esquema lógico utilizado por ambas aplicaciones:

users: Datos de ciudadanos y funcionarios (Roles: CITIZEN, ADMIN, FUNCIONARIO, TECNICO, RESPONSABLE_AREA).
areas: Sectores del municipio (Obras Públicas, Alumbrado, etc.).
categories: Tipos de incidencias (BACHE, ALUMBRADO_PUBLICO, etc.) asociadas a un área.
reports: Registro principal con coordenadas, dirección, prioridad e ID del creador.
evidences: URLs de imágenes adjuntas a los reportes.
tracking: Historial del ciclo de vida (PENDIENTE ➔ EN_REVISION ➔ ASIGNADO ➔ EN_PROCESO ➔ RESUELTO / RECHAZADO).
notifications: Registro de alertas de cambio de estado.
🧩 Patrones de Diseño Aplicados
Se implementaron patrones de forma explícita en ambos proyectos para garantizar calidad académica:

Patrón
Implementación en el Ecosistema
Singleton	Clientes de InsForge y QueryClient centralizados (una única instancia).
Repository	Servicios por feature que encapsulan el acceso al BaaS en ambas apps.
Facade	Hooks personalizados que simplifican servicios, queries y lógica de sensores.
DTO	Clases y esquemas Zod para transporte seguro de datos (Login, Reportes, Acciones).
Strategy	Renderizado dinámico en App Móvil: Mapa Web (iframe) vs Mapa Nativo.
Adapter	Servicio de Asistente IA en el Portal Web, adaptando llamadas externas.
Observer	TanStack Query en el Portal actualiza la vista ante cambios en datos.
State/Table-Driven	Mapeo declarativo en App Móvil para evitar condicionales (estilos por estado/prioridad).

🧹 Calidad, Refactorización y TDD
Ambos proyectos fueron sometidos a auditoría de Bad Smells y desarrollados bajo metodología TDD (Red-Green-Refactor).

Refactorización: Extracción de componentes y hooks (reducción de ~50-70% LOC en vistas), eliminación de Magic Numbers y reemplazo de condicionales anidados por lógica tabular.
Pruebas Unitarias: Validación de DTOs, reglas de negocio (ej. reportes vencidos a los 15 días) y funciones puras (formateo de coordenadas, truncado de texto).
Pruebas E2E / Smoke: Flujos críticos comprobados con Playwright (Portal) y tests de arranque con Jest (App).
🚀 Guía de Instalación y Ejecución
⚠️ Prerrequisitos
Instalar Node.js.
Instalar el gestor de paquetes pnpm de forma global:
bash

npm install -g pnpm
📱 Ejecutar la App Móvil
Navegar a la carpeta de la app:
bash

cd App-ReporTarija
Instalar dependencias:
bash

pnpm install
Configurar variables de entorno (crear .env basado en .env.example):
txt

EXPO_PUBLIC_INSFORGE_URL=https://tu-proyecto.insforge.app
EXPO_PUBLIC_INSFORGE_ANON_KEY=tu-anon-key
Iniciar servidor:
bash

pnpm start
🏛️ Ejecutar el Portal Web
Navegar a la carpeta del portal:
bash

cd Portal-web-ReporTarija
Instalar dependencias:
bash

pnpm install
Configurar variables de entorno (crear .env basado en .env.example):
txt

VITE_INSFORGE_URL=https://uri.insforge.com
VITE_INSFORGE_ANON_KEY=tu_anon_key
VITE_SMOKE_ADMIN_EMAIL=admin@reportatarija.bo
VITE_SMOKE_ADMIN_PASSWORD=tu_password
Iniciar servidor de desarrollo:
bash

pnpm dev
<div align="center">

Desarrollado con ❤️ para la Alcaldía de Tarija &nbsp;·&nbsp; Ingeniería de Software 2 - UPDS

</div>
```
