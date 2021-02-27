export interface News {
  uuid: string;
  title: string;
  publisher: string;
  link: string;
  providerPublishTime: number;
  type: string;
}

export interface CountryNews {
  source: {
    id: any;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}
