import { Router } from 'express';
import { ModuloController } from '../controllers/modulo.controller';

const router = Router();
const controller = new ModuloController();

/**
 * @swagger
 * /api/modulos:
 *   post:
 *     summary: Crear un nuevo módulo
 *     tags: [Módulos]
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
 *         description: Módulo creado exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.post('/', (req, res) => controller.create(req, res));

/**
 * @swagger
 * /api/modulos:
 *   get:
 *     summary: Obtener todos los módulos
 *     tags: [Módulos]
 *     responses:
 *       200:
 *         description: Lista de módulos
 */
router.get('/', (req, res) => controller.findAll(req, res));

/**
 * @swagger
 * /api/modulos/{id}:
 *   get:
 *     summary: Obtener un módulo por ID
 *     tags: [Módulos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Módulo encontrado
 *       404:
 *         description: Módulo no encontrado
 */
router.get('/:id', (req, res) => controller.findById(req, res));

/**
 * @swagger
 * /api/modulos/{id}:
 *   put:
 *     summary: Actualizar un módulo
 *     tags: [Módulos]
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
 *         description: Módulo actualizado exitosamente
 *       404:
 *         description: Módulo no encontrado
 */
router.put('/:id', (req, res) => controller.update(req, res));

/**
 * @swagger
 * /api/modulos/{id}:
 *   delete:
 *     summary: Eliminar un módulo
 *     tags: [Módulos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Módulo eliminado exitosamente
 *       404:
 *         description: Módulo no encontrado
 */
router.delete('/:id', (req, res) => controller.delete(req, res));

export default router; 