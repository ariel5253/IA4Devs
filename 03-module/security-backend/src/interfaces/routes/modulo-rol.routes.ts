import { Router } from 'express';
import { ModuloRolController } from '../controllers/modulo-rol.controller';

const router = Router();
const controller = new ModuloRolController();

/**
 * @swagger
 * /api/modulo-roles:
 *   post:
 *     summary: Crear una nueva relación módulo-rol
 *     tags: [Módulo-Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - moduloId
 *               - rolId
 *             properties:
 *               moduloId:
 *                 type: integer
 *               rolId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Relación módulo-rol creada exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.post('/', controller.create.bind(controller));

/**
 * @swagger
 * /api/modulo-roles:
 *   get:
 *     summary: Obtener todas las relaciones módulo-rol
 *     tags: [Módulo-Roles]
 *     responses:
 *       200:
 *         description: Lista de relaciones módulo-rol
 */
router.get('/', controller.findAll.bind(controller));

/**
 * @swagger
 * /api/modulo-roles/{id}:
 *   get:
 *     summary: Obtener una relación módulo-rol por ID
 *     tags: [Módulo-Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Relación módulo-rol encontrada
 *       404:
 *         description: Relación módulo-rol no encontrada
 */
router.get('/:id', controller.findById.bind(controller));

/**
 * @swagger
 * /api/modulo-roles/modulo/{moduloId}:
 *   get:
 *     summary: Obtener todas las relaciones de un módulo
 *     tags: [Módulo-Roles]
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
 * /api/modulo-roles/rol/{rolId}:
 *   get:
 *     summary: Obtener todas las relaciones de un rol
 *     tags: [Módulo-Roles]
 *     parameters:
 *       - in: path
 *         name: rolId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de relaciones del rol
 */
router.get('/rol/:rolId', controller.findByRolId.bind(controller));

/**
 * @swagger
 * /api/modulo-roles/{id}:
 *   put:
 *     summary: Actualizar una relación módulo-rol
 *     tags: [Módulo-Roles]
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
 *               moduloId:
 *                 type: integer
 *               rolId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Relación módulo-rol actualizada exitosamente
 *       404:
 *         description: Relación módulo-rol no encontrada
 */
router.put('/:id', controller.update.bind(controller));

/**
 * @swagger
 * /api/modulo-roles/{id}:
 *   delete:
 *     summary: Eliminar una relación módulo-rol
 *     tags: [Módulo-Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Relación módulo-rol eliminada exitosamente
 *       404:
 *         description: Relación módulo-rol no encontrada
 */
router.delete('/:id', controller.delete.bind(controller));

export default router; 