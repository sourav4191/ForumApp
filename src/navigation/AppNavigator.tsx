import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PostsScreen from '../screens/PostsScreen';
import PostDetailScreen from '../screens/PostDetailScreen';
import UserScreen from '../screens/UserScreen';

export type RootStackParamList = {
  Posts: undefined;
  PostDetail: {postId: number; userId: number};
  User: {userId: number};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: '#6366f1'},
          headerTintColor: '#fff',
          headerTitleStyle: {fontWeight: 'bold'},
        }}>
        <Stack.Screen
          name="Posts"
          component={PostsScreen}
          options={{title: 'Forum Posts'}}
        />
        <Stack.Screen
          name="PostDetail"
          component={PostDetailScreen}
          options={{title: 'Post Details'}}
        />
        <Stack.Screen
          name="User"
          component={UserScreen}
          options={{title: 'User Profile'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
