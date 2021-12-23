import express from 'express';
import url from './url';
import redirect from './redirect';

const router = express.Router();

router.use('/url', url);
router.use('/redirect', redirect);

export default router;
