import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Article {
    id: number;
    title: string;
    content: string;
}

const ArticleCard = ({ article }: { article: Article }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('ArticleDetail', { articleId: article.id })}
        >
            <Text style={styles.title}>{article.title}</Text>
            <Text numberOfLines={2} style={styles.content}>
                {article.content}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
    },
    title: { fontSize: 18, fontWeight: 'bold' },
    content: { fontSize: 14, color: '#555' },
});

export default ArticleCard;
