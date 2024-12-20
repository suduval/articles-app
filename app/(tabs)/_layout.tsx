import { Stack } from 'expo-router';

export type RootStackParamList = {
    ArticlesList: undefined;
    ArticleDetail: { article: { id: number; title: string; summary: string; text: string; image_url: string; author: { id: number; name: string; image_url: string }; categories: string[] } };
};

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false, title: 'Articles' }} />
            <Stack.Screen name="ArticleDetail" options={{ headerShown: false }} />
        </Stack>
    );
}
