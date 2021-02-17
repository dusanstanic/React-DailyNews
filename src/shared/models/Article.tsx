interface Article {
  author: string;
  content: string;
  description: string;
  publishedAt: "";
  source: { id: number; name: string };
  title: string;
  url: string;
  urlToImage: string;
}

export default Article;
