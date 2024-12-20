import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Image,
    ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {useFetchArticles} from "@/hooks/useFetchArticles";

type Article = {
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
};

type RootStackParamList = {
    ArticlesList: undefined;
    ArticleDetail: { article: Article };
};

type ArticlesListScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'ArticlesList'
>;

const categories = ['All Articles', 'Fitness', 'Glucose management'];

const ArticlesListScreen = () => {
    const { articles, loading } = useFetchArticles();
    const [selectedCategory, setSelectedCategory] = useState('All Articles');
    const navigation = useNavigation<ArticlesListScreenNavigationProp>();

    // Filter articles by category
    const filteredArticles =
        selectedCategory === 'All Articles'
            ? articles
            : articles.filter((article) =>
                article.categories.includes(selectedCategory)
            );

    const renderArticleCard = ({ item }: { item: Article }) => (
        <TouchableOpacity
            style={styles.articleCard}
            onPress={() => navigation.navigate('ArticleDetail', { article: item })}
        >
            <Image source={{ uri: item.image_url }} style={styles.articleImage} />
            <View style={styles.cardContent}>
                <Text style={styles.articleTitle}>{item.title}</Text>
                <Text numberOfLines={3} style={styles.articleSummary}>
                    {item.summary}
                </Text>
                <View style={styles.authorContainer}>
                    <Image
                        source={{ uri: item.author.image_url }}
                        style={styles.authorImage}
                    />
                    <Text style={styles.authorName}>{item.author.name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FF6F61" />
                <Text style={styles.loadingText}>Loading articles...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Articles</Text>
            <View style={styles.categoryContainer}>
                {categories.map((category) => (
                    <TouchableOpacity
                        key={category}
                        style={[
                            styles.categoryButton,
                            selectedCategory === category && styles.activeCategoryButton,
                        ]}
                        onPress={() => setSelectedCategory(category)}
                    >
                        <Text
                            style={[
                                styles.categoryText,
                                selectedCategory === category && styles.activeCategoryText,
                            ]}
                        >
                            {category}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <FlatList
                data={filteredArticles}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderArticleCard}
                ListEmptyComponent={
                    <Text style={styles.noArticles}>No articles found.</Text>
                }
                contentContainerStyle={{ paddingBottom: 16 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 16 },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    loadingText: { marginTop: 8, fontSize: 16, color: '#555' },
    categoryContainer: { flexDirection: 'row', marginBottom: 16 },
    categoryButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginRight: 8,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
    },
    activeCategoryButton: { backgroundColor: '#FF6F61' },
    categoryText: { color: '#333', fontSize: 14 },
    activeCategoryText: { color: '#fff', fontWeight: 'bold' },
    articleCard: {
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        overflow: 'hidden',
        marginBottom: 16,
        backgroundColor: '#fff',
    },
    articleImage: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
    },
    cardContent: { padding: 16 },
    articleTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
    articleSummary: { fontSize: 14, color: '#555', marginBottom: 16 },
    authorContainer: { flexDirection: 'row', alignItems: 'center' },
    authorImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 8,
    },
    authorName: { fontSize: 14, fontWeight: 'bold', color: '#333' },
    noArticles: { textAlign: 'center', marginTop: 20, fontSize: 16, color: '#999' },
});

export default ArticlesListScreen;
