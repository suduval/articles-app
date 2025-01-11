import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ArticlesListScreen from './ArticlesListScreen';
import NewsSearch from './NewsSearch';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Articles" component={ArticlesListScreen} />
            <Tab.Screen
                name="News"
                component={NewsSearch}
                options={{ title: 'News Search' }}
            />
        </Tab.Navigator>
    );
};

export default Tabs;
