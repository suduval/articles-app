import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';

// Component for searching and displaying news articles
const NewsSearch = () => {
    // State to store the search query entered by the user
    const [searchQuery, setSearchQuery] = useState('');
    // State to store the list of articles fetched from the API
    const [articles, setArticles] = useState([]);
    // State to handle the loading state during the API call
    const [loading, setLoading] = useState(false);
    // State to store any error messages
    const [error, setError] = useState('');

    // Function to fetch news articles from the API
    const fetchArticles = async () => {
        if (!searchQuery) {
            // Display an error if the search query is empty
            setError('Please enter a search term.');
            return;
        }

        // Clear previous errors and set the loading state
        setLoading(true);
        setError('');
        try {
            // Call the News API with the user's search query
            const response = await fetch(
                `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=183daca270264bad86fc5b72972fb82a`
            );
            const data = await response.json();

            // Check if the API returned articles
            if (data.articles) {
                setArticles(data.articles); // Update the state with the articles
            } else {
                setError('No articles found.'); // Display an error if no articles are found
            }
        } catch (err) {
            // Handle errors that occur during the API call
            setError('Failed to fetch news. Please try again.');
        } finally {
            // Reset the loading state after the API call completes
            setLoading(false);
        }
    };

    // Function to render each article in the FlatList
    const renderArticle = ({ item }: { item: any }) => (
        <TouchableOpacity style={styles.articleCard}>
            {/* Display the article title */}
            <Text style={styles.articleTitle}>{item.title}</Text>
            {/* Display the article description (limited to 3 lines) */}
            <Text numberOfLines={3} style={styles.articleDescription}>
                {item.description}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Header for the News Search screen */}
            <Text style={styles.header}>News Search</Text>

            {/* Input field for the user to enter the search query */}
            <TextInput
                style={styles.input}
                placeholder="Search for news..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />

            {/* Button to trigger the fetchArticles function */}
            <TouchableOpacity style={styles.searchButton} onPress={fetchArticles}>
                <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>

            {/* Show a loading spinner while the API call is in progress */}
            {loading && <ActivityIndicator size="large" color="#FF6F61" />}

            {/* Display error messages if any */}
            {error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : (
                // Display a list of articles using FlatList
                <FlatList
                    data={articles}
                    keyExtractor={(item, index) => index.toString()} // Use the index as a key
                    renderItem={renderArticle} // Render each article
                    ListEmptyComponent={
                        <Text style={styles.noArticles}>No results found.</Text> // Message when no articles are found
                    }
                />
            )}
        </View>
    );
};

// Styles for the NewsSearch component
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 16 },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 8, borderRadius: 8 },
    searchButton: { backgroundColor: '#FF6F61', padding: 12, borderRadius: 8, alignItems: 'center' },
    searchButtonText: { color: '#fff', fontWeight: 'bold' },
    errorText: { color: 'red', marginVertical: 8 },
    articleCard: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 16,
        marginBottom: 8,
        backgroundColor: '#fff',
    },
    articleTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
    articleDescription: { fontSize: 14, color: '#555' },
    noArticles: { textAlign: 'center', marginTop: 16, fontSize: 16, color: '#999' },
});

export default NewsSearch;
