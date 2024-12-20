import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

interface Article {
    id: number;
    title: string;
    text: string;
    image_url: string;
    author: {
        name: string;
        image_url: string;
        credentials?: string;
    };
}

interface ArticleDetailProps {
    route: RouteProp<{ params: { article: Article } }, 'params'>;
}

const ArticleDetailScreen = () => {
    const route = useRoute<ArticleDetailProps>();
    const navigation = useNavigation();
    const { article } = route.params;

    // State for favorite toggle
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Custom Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backContainer}>
                    <Text style={styles.backArrow}>←</Text>
                    <Text style={styles.backButton}>Back</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Post</Text>
            </View>

            {/* Article Image */}
            <Image
                source={{ uri: article?.image_url }}
                style={styles.articleImage}
            />

            {/* Favorite Toggle */}
            <TouchableOpacity
                style={styles.favoriteButton}
                onPress={() => setIsFavorite(!isFavorite)}
            >
                <Text style={styles.favoriteText}>
                    {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                </Text>
                <Text style={styles.favoriteIcon}>
                    {isFavorite ? '❤️' : '🤍'}
                </Text>
            </TouchableOpacity>

            {/* Article Title */}
            <Text style={styles.articleTitle}>{article?.title}</Text>

            {/* Author Details */}
            <View style={styles.authorContainer}>
                <Image
                    source={{ uri: article?.author.image_url }}
                    style={styles.authorImage}
                />
                <View>
                    <Text style={styles.authorName}>
                        By {article?.author.name}
                    </Text>
                    <Text style={styles.authorCredentials}>
                        {article?.author.credentials}
                    </Text>
                </View>
            </View>

            {/* Article Content */}
            <Text style={styles.articleContent}>{article?.text}</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    backContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backArrow: {
        color: '#007BFF',
        fontSize: 18,
        marginRight: 4,
    },
    backButton: {
        color: '#007BFF',
        fontSize: 16,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    articleImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 16,
        resizeMode: 'cover',
    },
    favoriteButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        padding: 8,
        backgroundColor: '#fff',
        borderRadius: 20,
        alignSelf: 'flex-end',
    },
    favoriteText: {
        color: '#FF6F61',
        fontSize: 16,
        marginRight: 8,
    },
    favoriteIcon: {
        color: '#fff',
        fontSize: 18,
    },
    articleTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
    },
    authorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    authorImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    authorName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    authorCredentials: {
        fontSize: 14,
        color: '#777',
    },
    articleContent: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
        marginTop: 16,
    },
});

export default ArticleDetailScreen;
