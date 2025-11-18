import React from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  SafeAreaView,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useSearchStore } from '../store/useSearchStore';
import { useDebounce } from '../hooks/useDebounce';
import { getPosts, getUsers } from '../services/api';
import SkeletonPost from '../components/SkeletonPost';
import PostCard from '../components/PostCard';

type Props = NativeStackScreenProps<RootStackParamList, 'Posts'>;

const PostsScreen = ({ navigation }: Props) => {
  const { query, setQuery } = useSearchStore();
  const debouncedQuery = useDebounce(query, 300);

  const { data: posts = [], isLoading: postsLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts().then(res => res.data),
  });

  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers().then(res => res.data),
  });

  const enrichedPosts = React.useMemo(() => {
    if (!posts.length || !users.length) return [];

    const userMap = Object.fromEntries(users.map(u => [u.id, u.username]));
    return posts.map(post => ({
      ...post,
      username: userMap[post.userId] || 'Unknown',
    }));
  }, [posts, users]);

  const filteredPosts = React.useMemo(() => {
    if (!debouncedQuery) return enrichedPosts;
    const q = debouncedQuery.toLowerCase();
    return enrichedPosts.filter(
      p => p.title.toLowerCase().includes(q) || p.username.toLowerCase().includes(q)
    );
  }, [enrichedPosts, debouncedQuery]);

  const isLoading = postsLoading || usersLoading;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f3f4f6' }}>
      <View style={{ padding: 16, backgroundColor: '#fff' }}>
        <TextInput
          placeholder="Search by title or username..."
          value={query}
          onChangeText={setQuery}
          style={{
            padding: 12,
            backgroundColor: '#f1f5f9',
            borderRadius: 12,
            fontSize: 16,
          }}
        />
      </View>

      {isLoading ? (
        <FlatList
          data={[1, 2, 3, 4, 5]}
          keyExtractor={(_, i) => i.toString()}
          renderItem={() => <SkeletonPost />}
        />
      ) : (
        <FlatList
          data={filteredPosts}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <PostCard
              post={item}
              onPressPost={() =>
                navigation.navigate('PostDetail', {
                  postId: item.id,
                  userId: item.userId,
                })
              }
              onPressUser={() => navigation.navigate('User', { userId: item.userId })}
            />
          )}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', marginTop: 50, color: '#6b7280' }}>
              No posts found
            </Text>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default PostsScreen;