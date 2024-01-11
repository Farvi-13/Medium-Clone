import { ArticleEntity } from "../article.entity";

export interface ArticlesResponsInterface {
    articles: ArticleEntity[];
    articlesCount: number;
}