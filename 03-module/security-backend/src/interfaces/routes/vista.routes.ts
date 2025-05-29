import { Router } from 'express';
import { VistaController } from '../controllers/vista.controller';

const router = Router();
const controller = new VistaController();

/**
 * @swagger
 * /api/vistas:
 *   post:
 *     summary: Crear una nueva vista
 *     tags: [Vistas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - ruta
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               ruta:
 *                 type: string
 *               icono:
 *                 type: string
 *     responses:
 *       201:
 *         description: Vista creada exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.post('/', controller.create.bind(controller));

/**
 * @swagger
 * /api/vistas:
 *   get:
 *     summary: Obtener todas las vistas
 *     tags: [Vistas]
 *     responses:
 *       200:
 *         description: Lista de vistas
 */
router.get('/', controller.findAll.bind(controller));

/**
 * @swagger
 * /api/vistas/{id}:
 *   get:
 *     summary: Obtener una vista por ID
 *     tags: [Vistas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Vista encontrada
 *       404:
 *         description: Vista no encontrada
 */
router.get('/:id', controller.findById.bind(controller));

/**
 * @swagger
 * /api/vistas/{id}:
 *   put:
 *     summary: Actualizar una vista
 *     tags: [Vistas]
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
 *               ruta:
 *                 type: string
 *               icono:
 *                 type: string
 *     responses:
 *       200:
 *         description: Vista actualizada exitosamente
 *       404:
 *         description: Vista no encontrada
 */
router.put('/:id', controller.update.bind(controller));

/**
 * @swagger
 * /api/vistas/{id}:
 *   delete:
 *     summary: Eliminar una vista
 *     tags: [Vistas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Vista eliminada exitosamente
 *       404:
 *         description: Vista no encontrada
 */
router.delete('/:id', controller.delete.bind(controller));

export default router; 