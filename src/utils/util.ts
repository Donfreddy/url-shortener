import shortid from 'shortid';
import validUrl from 'valid-url';

export const validateUrl = (url: string) => validUrl.isUri(url);

export const generateUrlKey = () => shortid.generate();
