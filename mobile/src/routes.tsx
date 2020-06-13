import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';
import Places from './pages/Places';
import Detail from './pages/Detail';

const AppStack = createStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <AppStack.Navigator 
                headerMode="none" 
                screenOptions={{
                    cardStyle: {
                        backgroundColor: "#f5e8df"
                    }
                }} 
            >
                <AppStack.Screen name="Home" component={Home} />
                <AppStack.Screen name="Places" component={Places} />
                <AppStack.Screen name="Detail" component={Detail} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;