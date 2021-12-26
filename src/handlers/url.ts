import { Handler } from 'express';
import UrlRepo from '../../src/db/repository/UrlRepo';
import { baseUrl } from '../../src/config';
import { generateUrlKey, validateUrl } from '../../src/utils/util';

export const create: Handler = async (req, res) => {
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
};
