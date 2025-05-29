import { Router } from 'express';
import { AccionVistaController } from '../controllers/accion-vista.controller';

const router = Router();
const controller = new AccionVistaController();

/**
 * @swagger
 * /api/accion-vistas:
 *   post:
 *     summary: Crear una nueva acción de vista
 *     tags: [Acciones de Vista]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - descripcion
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Acción de vista creada exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.post('/', (req, res) => controller.create(req, res));

/**
 * @swagger
 * /api/accion-vistas:
 *   get:
 *     summary: Obtener todas las acciones de vista
 *     tags: [Acciones de Vista]
 *     responses:
 *       200:
 *         description: Lista de acciones de vista
 */
router.get('/', (req, res) => controller.findAll(req, res));

/**
 * @swagger
 * /api/accion-vistas/{id}:
 *   get:
 *     summary: Obtener una acción de vista por ID
 *     tags: [Acciones de Vista]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Acción de vista encontrada
 *       404:
 *         description: Acción de vista no encontrada
 */
router.get('/:id', (req, res) => controller.findById(req, res));

/**
 * @swagger
 * /api/accion-vistas/{id}:
 *   put:
 *     summary: Actualizar una acción de vista
 *     tags: [Acciones de Vista]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Acción de vista actualizada exitosamente
 *       404:
 *         description: Acción de vista no encontrada
 */
router.put('/:id', (req, res) => controller.update(req, res));

/**
 * @swagger
 * /api/accion-vistas/{id}:
 *   delete:
 *     summary: Eliminar una acción de vista
 *     tags: [Acciones de Vista]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Acción de vista eliminada exitosamente
 *       404:
 *         description: Acción de vista no encontrada
 */
router.delete('/:id', (req, res) => controller.delete(req, res));

export default router; 