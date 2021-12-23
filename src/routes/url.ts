import express, { Request, Response } from 'express';
import { validateUrl, generateUrlKey } from '../utils/util';
import { baseUrl } from '../config';
import UrlRepo from '../db/repository/UrlRepo';

// creating express route handler
const router = express.Router();

/**
 * @api {post} /api/url/shorten
 * @apiName ShortenUrl
 * @apiDescription Create short URL
 */
router.post('/shorten', async (req: Request, res: Response) => {
  const { longUrl } = req.body;

  // Check if baseUrl is valid
  if (!validateUrl(baseUrl)) {
    return res.status(400).json({
      error: 'Internal error. Please come back later.',
    });
  }

  // if validUrl.isUri(baseUrl) is true
  const urlCode = generateUrlKey();

  // Check if longUrl is valid
  if (!validateUrl(longUrl)) {
    return res.status(400).json({
      error: 'Invalid URL. Please enter a valid url for shortening',
    });
  }

  // if validUrl.isUri(longUrl) is true
  try {
    let url = await UrlRepo.findByLongUrl(longUrl);

    // Url already exists
    if (url) {
      return res.json(url);
    } else {
      url = await UrlRepo.create(baseUrl, longUrl);

      // Return shortUrl
      return res.json(url);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: 'Server error',
    });
  }
});

export default router;
