import express from 'express';
import LayoutHandler from '../db/queries/LayoutHandler.js';

const router = express.Router();
const layoutHandler = new LayoutHandler()

router.get('/all', async (_, res) => {
	const result = await layoutHandler.getAll()
	if (!result) {
		res.sendStatus(404);
		return;
	}
	res.status(200).send(result)
})

router.get('/:id', async (req, res) => {
	const result = await layoutHandler.getById(req.params.id)
	if (!result) {
		res.sendStatus(404);
		return;
	}
	res.status(200).send(result)
})


export default router