import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {useQuery} from '@tanstack/react-query';

import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import {getUser} from '../services/api';

type Props = NativeStackScreenProps<RootStackParamList, 'User'>;

const UserScreen = ({route}: Props) => {
  const {userId} = route.params;

  const {data: user, isLoading} = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUser(userId).then(res => res.data),
  });

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>User not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f3f4f6'}}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.username}>@{user.username}</Text>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <Text style={styles.website}>Website: {user.website}</Text>
          <Text style={styles.company}>Company: {user.company.name}</Text>
          <Text style={styles.catchPhrase}>"{user.company.catchPhrase}"</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  card: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    alignItems: 'center',
  },
  username: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6366f1',
    marginBottom: 8,
  },
  name: {fontSize: 22, fontWeight: '600', marginBottom: 12},
  email: {fontSize: 18, color: '#4b5563', marginBottom: 8},
  website: {fontSize: 16, color: '#6366f1', marginBottom: 8},
  company: {fontSize: 18, fontWeight: '600', marginTop: 16},
  catchPhrase: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#6b7280',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default UserScreen;
