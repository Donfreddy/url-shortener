import { Schema, model, Document } from 'mongoose';

export const DOCUMENT_NAME = 'Url';
export const COLLECTION_NAME = 'url';

export default interface Url extends Document {
  urlCode: string;
  longUrl: string;
  shortUrl: string;
  redirectCount: number;
  date: string;
}

const schema = new Schema(
  {
    urlCode: {
      type: String,
      required: true,
      unique: true,
    },
    longUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
    },
    redirectCount: {
      type: Number,
      default: 0,
    },
    date: {
      type: String,
      default: new Date(),
    },
  },
  {
    versionKey: false,
    timestamps: false,
  },
);

export const UrlModel = model<Url>(DOCUMENT_NAME, schema, COLLECTION_NAME);
