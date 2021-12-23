import express, { Request, Response } from 'express';
import UrlRepo from '../db/repository/UrlRepo';

const router = express.Router();

/**
 * @api {get} /:code
 * @apiName RedirectUrl
 * @apiDescription Redirect to long URL
 */
router.get('', async (req: Request, res: Response) => {
  const { code } = req.params;

  try {
    // Find url by urlCode
    const url = await UrlRepo.findByUrlCode(code);

    // If url is found, increase redirectCount and redirect to longUrl
    if (url) {
      url.clicks++;
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json({ error: 'Url not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
