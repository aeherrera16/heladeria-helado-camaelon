# --- Stage 1: Build Frontend and Backend ---
FROM mirror.gcr.io/library/node:20-alpine AS builder
WORKDIR /app

# Copiar archivos de configuración de workspaces y dependencias
COPY package.json package-lock.json ./
COPY frontend/package.json ./frontend/
COPY backend/package.json ./backend/

# Instalar todas las dependencias (incluyendo devDependencies para poder compilar)
RUN npm ci

# Copiar el código fuente completo
COPY frontend ./frontend
COPY backend ./backend

# Establecer la variable de entorno para que el frontend use rutas relativas en producción
ENV VITE_API_URL=""

# Compilar frontend y backend
RUN npm run build

# --- Stage 2: Production Image ---
FROM mirror.gcr.io/library/node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

# Copiar archivos de configuración de workspaces y dependencias
COPY package.json package-lock.json ./
COPY backend/package.json ./backend/

# Instalar solo dependencias de producción
RUN npm ci --omit=dev

# Copiar los compilados del backend y del frontend
COPY --from=builder /app/backend/dist ./backend/dist
COPY --from=builder /app/frontend/dist ./frontend/dist

# Asegurar que exista el directorio data para la persistencia efímera local
RUN mkdir -p /app/data

EXPOSE 8080

# Comando para iniciar el backend
CMD ["node", "backend/dist/server.js"]
