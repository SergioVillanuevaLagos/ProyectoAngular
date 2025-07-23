# HakoRoom - Plataforma de Arriendo de Habitaciones

HakoRoom es una aplicación web completa desarrollada con Angular y Node.js que facilita el arriendo de habitaciones para estudiantes. La plataforma conecta arrendadores con estudiantes mediante un sistema de publicaciones detalladas.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación y Configuración](#instalación-y-configuración)
- [Funcionalidades](#funcionalidades)
- [Arquitectura](#arquitectura)
- [Base de Datos](#base-de-datos)
- [API Endpoints](#api-endpoints)
- [Componentes Principales](#componentes-principales)
- [Servicios](#servicios)
- [Autenticación](#autenticación)
- [Uso](#uso)

## 🚀 Características

- **Sistema de autenticación** con Google OAuth y login tradicional
- **Gestión de propiedades** con imágenes, descripciones y características
- **Sistema de favoritos** para usuarios
- **Calificaciones y reseñas** de propiedades
- **Sistema de reportes** para problemas con propiedades
- **Panel de administración** para gestionar locaciones y reportes
- **Mapas interactivos** con Google Maps
- **Filtros de búsqueda** avanzados
- **Diseño responsive** para móviles y desktop
- **Agendamiento de visitas**

## 🛠 Tecnologías Utilizadas

### Frontend
- **Angular 18** - Framework principal
- **TypeScript** - Lenguaje de programación
- **Bootstrap 5** - Framework CSS
- **Angular Material** - Componentes UI
- **Google Maps API** - Mapas interactivos
- **Angular OAuth2 OIDC** - Autenticación con Google

### Backend
- **Node.js** - Servidor backend
- **Express.js** - Framework web
- **MySQL** - Base de datos
- **Multer** - Manejo de archivos/imágenes
- **CORS** - Cross-Origin Resource Sharing

## 📁 Estructura del Proyecto

```
ProyectoAngular/
├── src/
│   ├── app/
│   │   ├── views/                 # Vistas principales
│   │   │   └── home/             # Página de inicio
│   │   ├── shared/               # Componentes compartidos
│   │   │   └── components/       # Componentes reutilizables
│   │   │       ├── navbar/       # Barra de navegación
│   │   │       ├── login/        # Formulario de login
│   │   │       ├── register/     # Formulario de registro
│   │   │       ├── listar-locaciones/     # Lista de propiedades
│   │   │       ├── detalle-locacion/      # Detalle de propiedad
│   │   │       ├── admin-reportes/        # Gestión de reportes
│   │   │       └── admin-locaciones/      # Gestión de locaciones
│   │   ├── user/                 # Módulo de usuarios
│   │   │   ├── user-profile/     # Perfil de usuario
│   │   │   └── google-registration/       # Registro con Google
│   │   ├── services/             # Servicios Angular
│   │   │   ├── auth-service.service.ts    # Autenticación
│   │   │   ├── locacion.service.ts        # Gestión de locaciones
│   │   │   ├── favoritos.service.ts       # Gestión de favoritos
│   │   │   └── reportes.service.ts        # Gestión de reportes
│   │   └── models/               # Modelos de datos
│   └── assets/                   # Recursos estáticos
└── backend-server/               # Servidor Node.js
    └── app.js                    # Servidor principal
```

## ⚙️ Instalación y Configuración

### Prerrequisitos
- Node.js (v16 o superior)
- Angular CLI
- MySQL Server
- Cuenta de Google Cloud (para OAuth)

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd ProyectoAngular
```

### 2. Instalar dependencias del frontend
```bash
npm install
```

### 3. Configurar la base de datos
1. Crear una base de datos MySQL llamada `hakoroom`
2. Crear las siguientes tablas:

```sql
-- Tabla de usuarios
CREATE TABLE usuario (
    IDUsuario INT AUTO_INCREMENT PRIMARY KEY,
    Run VARCHAR(12) UNIQUE,
    Nombre VARCHAR(50),
    ApellidoPaterno VARCHAR(50),
    ApellidoMaterno VARCHAR(50),
    Correo VARCHAR(100) UNIQUE,
    Contrasena VARCHAR(255),
    IdRol INT DEFAULT 1
);

-- Tabla de locaciones
CREATE TABLE locacion (
    IDLocacion INT AUTO_INCREMENT PRIMARY KEY,
    Area DECIMAL(10,2),
    Habitaciones INT,
    Imagen LONGBLOB,
    Ubicacion VARCHAR(255),
    Descripcion TEXT,
    PrecioMensual DECIMAL(10,2),
    IDAdmin INT,
    TipoLocacion INT,
    Puntaje DECIMAL(3,2) DEFAULT 0,
    Banos INT,
    TotalVotos INT DEFAULT 0,
    ReglasCasa TEXT,
    ServiciosIncluidos TEXT,
    FOREIGN KEY (IDAdmin) REFERENCES usuario(IDUsuario)
);

-- Tabla de favoritos
CREATE TABLE favoritos (
    IDFavoritos INT AUTO_INCREMENT PRIMARY KEY,
    IdUsuario INT,
    IdLocacion INT,
    FOREIGN KEY (IdUsuario) REFERENCES usuario(IDUsuario),
    FOREIGN KEY (IdLocacion) REFERENCES locacion(IDLocacion)
);

-- Tabla de reportes
CREATE TABLE reporte (
    IDReporte INT AUTO_INCREMENT PRIMARY KEY,
    IDUsuarioReportante INT,
    IDPropiedadReportado INT,
    IDDueñoReportado INT,
    Detalle TEXT,
    Estado VARCHAR(50) DEFAULT 'Pendiente',
    FechaReporte DATE,
    FOREIGN KEY (IDUsuarioReportante) REFERENCES usuario(IDUsuario),
    FOREIGN KEY (IDPropiedadReportado) REFERENCES locacion(IDLocacion),
    FOREIGN KEY (IDDueñoReportado) REFERENCES usuario(IDUsuario)
);

-- Tabla de visitas
CREATE TABLE visita (
    IDVisita INT AUTO_INCREMENT PRIMARY KEY,
    FechaVisita DATE,
    HoraVisita TIME,
    Nombre VARCHAR(50),
    ApellidoPaterno VARCHAR(50),
    ApellidoMaterno VARCHAR(50),
    Correo VARCHAR(100)
);
```

### 4. Configurar el servidor backend
```bash
cd backend-server
npm init -y
npm install express mysql body-parser cors multer
```

### 5. Ejecutar la aplicación

**Backend:**
```bash
cd backend-server
node app.js
```

**Frontend:**
```bash
ng serve
```

La aplicación estará disponible en `http://localhost:4200`

## 🔧 Funcionalidades

### Para Usuarios Regulares
- **Registro e inicio de sesión** con email/contraseña o Google
- **Búsqueda de propiedades** con filtros avanzados
- **Visualización de detalles** de propiedades con mapas
- **Sistema de favoritos** para guardar propiedades preferidas
- **Calificación de propiedades** con sistema de estrellas
- **Reporte de problemas** con propiedades
- **Agendamiento de visitas**

### Para Administradores
- **Publicación de propiedades** con múltiples imágenes
- **Gestión completa** de sus locaciones publicadas
- **Panel de reportes** para manejar quejas de usuarios
- **Estadísticas** de sus propiedades

## 🏗 Arquitectura

### Frontend (Angular)
La aplicación sigue una arquitectura modular con:

- **Componentes**: Elementos UI reutilizables
- **Servicios**: Lógica de negocio y comunicación con API
- **Guards**: Protección de rutas
- **Pipes**: Transformación de datos
- **Modelos**: Interfaces TypeScript para tipado

### Backend (Node.js + Express)
API RESTful que maneja:

- **Autenticación**: JWT y OAuth2
- **CRUD de locaciones**: Crear, leer, actualizar, eliminar
- **Gestión de usuarios**: Registro, login, perfiles
- **Subida de archivos**: Imágenes de propiedades
- **Sistema de reportes**: Gestión de quejas

## 💾 Base de Datos

### Modelo de Datos
- **usuario**: Información de usuarios y administradores
- **locacion**: Propiedades con todas sus características
- **favoritos**: Relación usuario-propiedad favorita
- **reporte**: Sistema de reportes de problemas
- **visita**: Agendamiento de visitas

## 🌐 API Endpoints

### Locaciones
- `GET /locaciones` - Obtener todas las locaciones
- `GET /locaciones/:id` - Obtener locación por ID
- `POST /locaciones` - Crear nueva locación
- `PUT /locaciones/:id` - Actualizar locación
- `DELETE /locaciones/:id` - Eliminar locación
- `GET /locaciones/:id/imagen` - Obtener imagen de locación
- `POST /locaciones/:id/calificar` - Calificar locación

### Usuarios
- `GET /usuarios` - Obtener todos los usuarios
- `POST /usuarios` - Crear usuario
- `POST /login` - Iniciar sesión
- `GET /usuarios/email/:email` - Buscar usuario por email

### Favoritos
- `GET /favoritos/:idUsuario` - Obtener favoritos de usuario
- `POST /favoritos` - Agregar favorito
- `DELETE /favoritos` - Eliminar favorito

### Reportes
- `GET /reporte` - Obtener todos los reportes
- `POST /reporte` - Crear reporte
- `PUT /reportes/:id` - Actualizar estado de reporte

## 🧩 Componentes Principales

### NavbarComponent
Barra de navegación principal con:
- Links a secciones principales
- Botón de login/logout
- Menú de administración (solo para admins)

### HomeComponent
Página de inicio con:
- Información de la empresa
- Misión y visión
- Enlaces a funcionalidades principales

### ListarLocacionesComponent
Lista de propiedades con:
- Cards de propiedades
- Información básica (precio, ubicación, características)
- Enlaces a detalle

### DetalleLocacionComponent
Detalle completo de propiedad con:
- Galería de imágenes
- Información completa
- Mapa de ubicación
- Sistema de calificación
- Botón de favoritos
- Opción de reporte

### UserProfileComponent
Perfil de usuario que muestra:
- Información personal
- Propiedades publicadas (si es admin)
- Favoritos guardados

### AdminReportesComponent
Panel de administración para:
- Visualizar todos los reportes
- Cambiar estado de reportes
- Gestionar quejas de usuarios

## 🔧 Servicios

### AuthService
Maneja la autenticación:
```typescript
- login(userData): void
- logout(): void
- isLoggedIn$: Observable<boolean>
```

### LocacionService
Gestiona las locaciones:
```typescript
- getLocaciones(): Observable<any>
- getLocacionById(id): Observable<Locacion>
- crearLocacion(data): Observable<any>
- calificarLocacion(id, puntaje): Observable<any>
```

### FavoritosService
Maneja favoritos:
```typescript
- getFavoritosByUsuario(id): Observable<any>
- agregarFavorito(userId, locationId): Observable<any>
- eliminarFavorito(userId, locationId): Observable<any>
```

## 🔐 Autenticación

### Login Tradicional
- Email y contraseña
- Validación en backend
- Almacenamiento en localStorage

### Google OAuth
- Integración con Google OAuth2
- Registro automático para nuevos usuarios
- Flujo de completar registro si faltan datos

## 📱 Uso

### Como Usuario Regular

1. **Registro/Login**: Crea una cuenta o inicia sesión
2. **Explorar**: Navega por las propiedades disponibles
3. **Filtrar**: Usa los filtros para encontrar lo que buscas
4. **Favoritos**: Guarda propiedades que te interesen
5. **Calificar**: Deja reseñas de propiedades
6. **Reportar**: Informa problemas si los encuentras

### Como Administrador

1. **Publicar**: Crea nuevas publicaciones de propiedades
2. **Gestionar**: Administra tus locaciones publicadas
3. **Reportes**: Revisa y responde a reportes de usuarios
4. **Estadísticas**: Monitorea el rendimiento de tus propiedades

## 📄 Licencia

Este proyecto es de uso educativo y de demostración.

## 👥 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📞 Soporte

Para soporte técnico o preguntas sobre el proyecto, contacta al equipo de desarrollo.
