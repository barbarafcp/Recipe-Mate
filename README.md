# Recipe Mate Frontend 🍲

Recipe Mate es una aplicación que permite a los usuarios seleccionar ingredientes y recibir recomendaciones de recetas en base a los ingredientes elegidos.

## Pre-requisitos

Asegúrate de tener instalado lo siguiente en tu máquina:

- Node.js (versión 16 o superior)
- Descargar Node.js
- Git - Instalar Git

## Instalación y Ejecución

### 1. Clonar el Repositorio
Abre tu terminal y clona el proyecto usando el siguiente comando:

```
git clone https://github.com/tu-usuario/recipe-mate.git
```
### 2. Ingresar al Directorio del Proyecto

```
cd Recipe-Mate
```
### 3. Instalar las Dependencias
Asegúrate de estar en la carpeta del proyecto y ejecuta el siguiente comando para instalar todas las dependencias necesarias:

```
npm install
```
### 4. Ejecutar el Proyecto en Modo Desarrollo
Para iniciar el servidor de desarrollo:

```
npm run dev
```
Verás una salida similar a esta:

```
  VITE v4.3.9  ready in 400 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```
5. Abrir en el Navegador
Abre tu navegador y visita la siguiente URL:

```
http://localhost:5173/
```

## Problemas Comunes

### 1. Axios no encontrado
Si ves un error relacionado con Axios, asegúrate de que está instalado correctamente:

```
npm install axios
```
### 2. Backend no disponible
Asegúrate de que tu backend está corriendo en http://127.0.0.1:8000 para que la aplicación pueda comunicarse correctamente.

