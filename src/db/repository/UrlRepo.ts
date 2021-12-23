import Url, { UrlModel } from '../model/url';
import { generateUrlKey } from '../../utils/util';

export default class UrlRepo {
  public static async findByUrlCode(urlCode: string): Promise<Url | null> {
    return UrlModel.findOne({ urlCode }).lean<Url>().exec();
  }

  public static async findByLongUrl(longUrl: string): Promise<Url | null> {
    return UrlModel.findOne({ longUrl }).lean<Url>().exec();
  }

  public static async create(baseUrl: string, longUrl: string): Promise<Url> {
    const urlCode = generateUrlKey();
    const shortUrl = `${baseUrl}/${urlCode}`;

    const url = await UrlModel.create({
      urlCode: urlCode,
      longUrl: longUrl,
      shortUrl: shortUrl,
    });

    return url;
  }

  public static async update(url: Url): Promise<any> {
    return UrlModel.updateOne({ _id: url._id }, { $set: { ...url } })
      .lean()
      .exec();
  }
}
