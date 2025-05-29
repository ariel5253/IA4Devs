# 🔐 Prompt Profesional para Generación de Aplicación Full Stack con Seguridad, Swagger y Arquitectura Profesional

## 🧠 Rol Esperado

Actúa como un desarrollador senior full stack con dominio profesional en:

- Frontend con React + Next.js
- Backend con Node.js + Express
- API RESTful documentada con Swagger
- ORM profesional (Prisma o Sequelize)
- Patrones de diseño (especialmente Factory Method con genéricos T, D, S)
- Arquitectura basada en DDD (Domain-Driven Design) para microservicios
- Principios SOLID
- Separación por capas, uso de DTOs, validadores, middlewares, contextos y servicios reutilizables

---

## 🎯 Objetivo del Proyecto

Desarrollar una solución compuesta por dos aplicaciones independientes pero integradas:

1. security-backend
   - API segura en Express sobre el puerto 9000
   - Documentada con Swagger en /api-docs
   - Estructurada con DDD, separación por capas y SOLID
   - Con autenticación basada en JWT
   - Persistencia con ORM (Prisma o Sequelize)

2. security-frontend
   - Aplicación Next.js corriendo sobre el puerto 80
   - Consume la API REST del backend
   - Protege rutas, gestiona autenticación e interfaces seguras
   - Permite operaciones CRUD sobre entidades del dominio

---

## 🗂️ Estructura Esperada

security-backend/
├── src/
│   ├── config/
│   ├── domain/
│   ├── application/
│   ├── infrastructure/
│   │   ├── repositories/
│   │   ├── database/
│   ├── interfaces/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── validators/
│   ├── dtos/
│   ├── utils/
│   └── index.ts
├── swagger/
├── .env
├── package.json
└── README.md

security-frontend/
├── src/
│   ├── pages/
│   ├── components/
│   ├── services/
│   ├── context/
│   ├── hooks/
│   ├── utils/
│   └── styles/
├── public/
├── .env.local
├── package.json
└── README.md

---

## ⚙️ Instrucciones Detalladas

### Paso 1: Inicialización de Proyectos

# Backend
mkdir security-backend && cd security-backend
npm init -y
npm install express cors dotenv jsonwebtoken zod
npm install swagger-ui-express swagger-jsdoc
npm install prisma --save-dev
npx prisma init

# Frontend
npx create-next-app@latest security-frontend --typescript
cd security-frontend
npm install axios

---

### Paso 2: Configuración de Puertos

.env del backend:

PORT=9000
JWT_SECRET=supersecretkey
DATABASE_URL="postgresql://postgres:abcd1234@localhost:5432/security_db"

.env.local del frontend:

PORT=80
NEXT_PUBLIC_API_URL=http://localhost:9000

---

## Swagger en Backend

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Security API',
      version: '1.0.0',
    },
  },
  apis: ['./src/interfaces/routes/*.ts'],
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

---

## Validaciones con Zod

import { z } from 'zod';

export const createUserSchema = z.object({
  nombre: z.string().min(1),
  email: z.string().email(),
});

---

## 📦 Entidades del Dominio

1. Persona  
2. Rol  
3. Usuario  
4. Asociación Roles del Usuario  
5. Módulos  
6. Vistas  
7. Vistas del módulo  
8. Módulos por rol  
9. Acciones de vistas  
10. Permisos por acción

---

## 🔐 Funcionalidades Obligatorias

- Login seguro con JWT
- Protección de rutas y módulos por rol/permiso
- CRUD completo de todas las entidades
- Consumo de API en frontend
- Documentación Swagger accesible en /api-docs
- Interfaz moderna, responsive y funcional

---

## 🧾 Resultado Esperado

Una aplicación completamente funcional que incluya:

- Backend API lista para producción, validada, documentada y protegida
- Frontend con login, consumo de API, rutas protegidas y CRUDs
- Swagger configurado correctamente
- Uso de buenas prácticas, patrones y arquitectura profesional

---

## 🧠 Extras Recomendados

- Uso de Docker para backend y base de datos
- Seeders de datos con Prisma
- Scripts de testing con Jest
- Logging estructurado (ej. con Winston)


---

## 🖼️ Requisitos del Frontend

- Cada entidad debe tener su propia página en el frontend (ej: `/usuarios`, `/roles`, `/modulos`, etc.).
- Todas las páginas deben mostrar un **DataTable** (puede ser react-table o similar) con:
  - Filtros por columna
  - Paginación
  - Búsqueda global
  - Botones de acción: Ver, Editar, Eliminar
  - Botón para **crear** un nuevo registro
  - Opción para **exportar el reporte** en formato Excel o PDF

### Funcionalidades específicas por vista

1. Visualizar lista completa con filtros
2. Crear nuevos registros con validación
3. Editar registros existentes
4. Eliminar registros con confirmación
5. Ver detalles individuales
6. Exportar reporte de datos visible

---

## 🧾 Resultado Esperado (Actualizado)

- Backend completo, seguro y documentado
- Frontend con CRUD funcional para cada entidad
- Reportes visuales en tablas dinámicas por entidad
- Exportación de datos a Excel o PDF
- Aplicación lista para despliegue