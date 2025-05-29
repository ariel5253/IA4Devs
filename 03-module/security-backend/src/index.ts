import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { PrismaClient } from '@prisma/client';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Security API',
      version: '1.0.0',
      description: 'API documentation for the Security System',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 9000}`,
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/interfaces/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Import routes
import authRoutes from './interfaces/routes/auth.routes';
import personaRoutes from './interfaces/routes/persona.routes';
import rolRoutes from './interfaces/routes/rol.routes';
import usuarioRoutes from './interfaces/routes/usuario.routes';
import moduloRoutes from './interfaces/routes/modulo.routes';
import vistaRoutes from './interfaces/routes/vista.routes';
import vistaModuloRoutes from './interfaces/routes/vista-modulo.routes';
import moduloRolRoutes from './interfaces/routes/modulo-rol.routes';
import accionVistaRoutes from './interfaces/routes/accion-vista.routes';
import permisoAccionRoutes from './interfaces/routes/permiso-accion.routes';

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/personas', personaRoutes);
app.use('/api/roles', rolRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/modulos', moduloRoutes);
app.use('/api/vistas', vistaRoutes);
app.use('/api/vista-modulos', vistaModuloRoutes);
app.use('/api/modulo-roles', moduloRolRoutes);
app.use('/api/accion-vistas', accionVistaRoutes);
app.use('/api/permiso-acciones', permisoAccionRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
});

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Closing HTTP server and Prisma Client...');
  await prisma.$disconnect();
  process.exit(0);
}); 