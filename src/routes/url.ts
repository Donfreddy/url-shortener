import express, { Request, Response } from 'express';
import shortid from 'shortid';
import { baseUrl } from '../config';
import validUrl from 'valid-url';
import { UrlModel } from '../db/model/url';
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

  // Check if baseUrl is valid using balidUrl.isUri method
  if (!validUrl.isUri(baseUrl)) {
    return res.status(400).json({
      error: 'Invalid base Url',
    });
  }

  // if validUrl.isUri(baseUrl) is true
  const urlCode = shortid.generate();

  // Check if longUrl is valid using validUrl.isUri method
  if (!validUrl.isUri(longUrl)) {
    return res.status(400).json({
      error: 'Invalid long Url',
    });
  }

  // if validUrl.isUri(longUrl) is true
  try {
    let url = await UrlRepo.findByLongUrl(longUrl);

    // Url already exists
    if (url) {
      return res.json(url);
    } else {
      const shortUrl = `${baseUrl}/${urlCode}`;

      // Create a new Url
      url = new UrlModel({
        urlCode,
        longUrl,
        shortUrl,
        date: new Date(),
      });

      // Save url to database
      await url.save();

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
