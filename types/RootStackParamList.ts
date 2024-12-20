export interface Article {
    id: number;
    title: string;
    summary: string;
    text: string;
    image_url: string;
    author: {
        id: number;
        name: string;
        image_url: string;
    };
    categories: string[];
}

export type RootStackParamList = {
    ArticlesList: undefined; // No params for list screen
    ArticleDetail: { article: Article }; // Article object as param
};
