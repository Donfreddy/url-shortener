import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import * as url from '../handlers/url';

// creating express route handler
const router = express.Router();

/**
 * @api {post} /api/url/shorten
 * @apiName ShortenUrl
 * @apiDescription Create short URL
 */
router.post('/shorten', asyncHandler(url.create));

export default router;
