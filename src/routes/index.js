import { Router } from 'express';
import candidateController from '../controller/candidate';

const { getCandidates } = candidateController;

const router = Router();

router.get('/', getCandidates);
router.post('/validate-rule');

export default router;
