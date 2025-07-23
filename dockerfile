# Etapa de construcción
FROM node:20-alpine AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Construye la aplicación
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Copia el resultado de la construcción para reemplazar el contenido por defecto de nginx
COPY --from=build /app/dist/proyecto-angular/browser /usr/share/nginx/html

# Copia configuración personalizada de nginx si es necesario
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expone el puerto 80
EXPOSE 80

# Inicia el servidor nginx
CMD ["nginx", "-g", "daemon off;"]