import express from 'express';
import LayoutHandler from '../db/queries/LayoutHandler.js';

const router = express.Router();
const layoutHandler = new LayoutHandler()

router.get('/:id', async (req, res) => {
	const _ = await layoutHandler.getById(req.params.id)
	res.sendStatus(200)
})

export default router