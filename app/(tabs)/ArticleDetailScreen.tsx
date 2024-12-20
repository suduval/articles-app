import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

interface ArticleDetailProps {
    route: RouteProp<{ params: { article: any } }, 'params'>;
}

const ArticleDetailScreen = () => {
    const route = useRoute<ArticleDetailProps>();
    const { article } = route.params;

    // State for favorite toggle
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Back Button and Header */}
            <View style={styles.header}>
                <TouchableOpacity>
                    <Text style={styles.backButton}>Back</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Post</Text>
            </View>

            {/* Article Image */}
            <Image source={{ uri: article.image_url }} style={styles.articleImage} />

            {/* Favorite Toggle */}
            <TouchableOpacity
                style={styles.favoriteButton}
                onPress={() => setIsFavorite(!isFavorite)}
            >
                <Text style={styles.favoriteText}>
                    {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                </Text>
                <Text style={styles.favoriteIcon}>{isFavorite ? '❤️' : '🤍'}</Text>
            </TouchableOpacity>

            {/* Article Title */}
            <Text style={styles.articleTitle}>{article.title}</Text>

            {/* Author Details */}
            <View style={styles.authorContainer}>
                <Image
                    source={{ uri: article.author.image_url }}
                    style={styles.authorImage}
                />
                <Text style={styles.authorName}>
                    By {article.author.name} {article.author.credentials}
                </Text>
            </View>

            {/* Article Content */}
            <Text style={styles.articleContent}>{article.text}</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
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
    },
    favoriteButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
        padding: 8,
        backgroundColor: '#FF6F61',
        borderRadius: 8,
    },
    favoriteText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    favoriteIcon: {
        color: '#fff',
        fontSize: 16,
    },
    articleTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
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
        marginRight: 8,
    },
    authorName: {
        fontSize: 14,
        color: '#555',
    },
    articleContent: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
    },
});

export default ArticleDetailScreen;
