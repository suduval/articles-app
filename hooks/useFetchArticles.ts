import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

interface Author {
    id: number;
    name: string;
    image_url: string;
}

interface Article {
    id: number;
    title: string;
    summary: string;
    text: string;
    image_url: string;
    author: Author;
    categories: string[];
}

const API_URL: string = 'http://articles-api.test/api/articles';

export const useFetchArticles = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchArticles = async (): Promise<void> => {
            try {
                const response: AxiosResponse<any> = await axios.get(API_URL);
                console.log('API Response:', response.data); // Debugging: Log full response
                const paginatedData = response.data.data; // Extract 'data' key
                setArticles(paginatedData.data); // Set articles from nested 'data'
            } catch (error) {
                console.error('Error fetching articles:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    return { articles, loading };
};
