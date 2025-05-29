import { Router } from 'express';
import { VistaModuloController } from '../controllers/vista-modulo.controller';

const router = Router();
const controller = new VistaModuloController();

/**
 * @swagger
 * /api/vista-modulos:
 *   post:
 *     summary: Crear una nueva relación vista-módulo
 *     tags: [Vista-Módulos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - vistaId
 *               - moduloId
 *               - orden
 *             properties:
 *               vistaId:
 *                 type: integer
 *               moduloId:
 *                 type: integer
 *               orden:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Relación vista-módulo creada exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.post('/', controller.create.bind(controller));

/**
 * @swagger
 * /api/vista-modulos:
 *   get:
 *     summary: Obtener todas las relaciones vista-módulo
 *     tags: [Vista-Módulos]
 *     responses:
 *       200:
 *         description: Lista de relaciones vista-módulo
 */
router.get('/', controller.findAll.bind(controller));

/**
 * @swagger
 * /api/vista-modulos/{id}:
 *   get:
 *     summary: Obtener una relación vista-módulo por ID
 *     tags: [Vista-Módulos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Relación vista-módulo encontrada
 *       404:
 *         description: Relación vista-módulo no encontrada
 */
router.get('/:id', controller.findById.bind(controller));

/**
 * @swagger
 * /api/vista-modulos/vista/{vistaId}:
 *   get:
 *     summary: Obtener todas las relaciones de una vista
 *     tags: [Vista-Módulos]
 *     parameters:
 *       - in: path
 *         name: vistaId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de relaciones de la vista
 */
router.get('/vista/:vistaId', controller.findByVistaId.bind(controller));

/**
 * @swagger
 * /api/vista-modulos/modulo/{moduloId}:
 *   get:
 *     summary: Obtener todas las relaciones de un módulo
 *     tags: [Vista-Módulos]
 *     parameters:
 *       - in: path
 *         name: moduloId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de relaciones del módulo
 */
router.get('/modulo/:moduloId', controller.findByModuloId.bind(controller));

/**
 * @swagger
 * /api/vista-modulos/{id}:
 *   put:
 *     summary: Actualizar una relación vista-módulo
 *     tags: [Vista-Módulos]
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
 *               vistaId:
 *                 type: integer
 *               moduloId:
 *                 type: integer
 *               orden:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Relación vista-módulo actualizada exitosamente
 *       404:
 *         description: Relación vista-módulo no encontrada
 */
router.put('/:id', controller.update.bind(controller));

/**
 * @swagger
 * /api/vista-modulos/{id}:
 *   delete:
 *     summary: Eliminar una relación vista-módulo
 *     tags: [Vista-Módulos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Relación vista-módulo eliminada exitosamente
 *       404:
 *         description: Relación vista-módulo no encontrada
 */
router.delete('/:id', controller.delete.bind(controller));

export default router; 