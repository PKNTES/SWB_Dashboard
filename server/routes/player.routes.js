import express from 'express';
import { createPlayer, deletePlayer, getAllPlayers,
         getPlayerDetails, updatePlayer } from '../controllers/player.controller.js';

const router = express.Router();

router.route('/').get(getAllPlayers);
router.route('/:id').get(getPlayerDetails);
router.route('/').post(createPlayer);
router.route('/:id').patch(updatePlayer);
router.route('/:id').delete(deletePlayer);

export default router;



