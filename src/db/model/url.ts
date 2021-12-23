import { Schema, model, Document } from 'mongoose';

export const DOCUMENT_NAME = 'Url';
export const COLLECTION_NAME = 'url';

export default interface Url extends Document {
  urlCode: string;
  longUrl: string;
  shortUrl: string;
  clicks: number;
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
    clicks: {
      type: Number,
      required: true,
      default: 0,
    },
    date: {
      type: String,
      default: Date.now,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  },
);

export const UrlModel = model<Url>(DOCUMENT_NAME, schema, COLLECTION_NAME);
