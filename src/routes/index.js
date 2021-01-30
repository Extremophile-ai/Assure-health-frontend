import { Router } from 'express';
import candidateController from '../controller/candidate';
import rulesValidation from '../controller/validation';

const { getCandidates } = candidateController;

const router = Router();

router.get('/', getCandidates);
router.post('/validate-rule', rulesValidation);

export default router;
