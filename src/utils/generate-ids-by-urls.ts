const generateIdsByUrls = (urls: string[]): string[] =>
  urls.reduce((result: string[], url: string) => {
    const splittedUrl = url.split('/');
    const id = splittedUrl[splittedUrl.length - 1];
    return id ? [...result, id] : [...result];
  }, []);

export default generateIdsByUrls;
