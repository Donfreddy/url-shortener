import Url, { UrlModel } from '../model/url';

export default class UrlRepo {
  public static async findByUrlCode(urlCode: string): Promise<Url | null> {
    return UrlModel.findOne({ urlCode }).lean<Url>().exec();
  }

  public static async findByLongUrl(longUrl: string): Promise<Url | null> {
    return UrlModel.findOne({ longUrl }).lean<Url>().exec();
  }
}
