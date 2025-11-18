/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {useQuery} from '@tanstack/react-query';

import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import {getComments, getPost, getUser} from '../services/api';
import CommentCard from '../components/CommentCard';

type Props = NativeStackScreenProps<RootStackParamList, 'PostDetail'>;

const PostDetailScreen = ({route, navigation}: Props) => {
  const {postId, userId} = route.params;

  const {data: post, isLoading: postLoading} = useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPost(postId).then(res => res.data),
  });

  const {data: comments = [], isLoading: commentsLoading} = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => getComments(postId).then(res => res.data),
  });

  const {data: user} = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUser(userId).then(res => res.data),
  });

  if (postLoading || commentsLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f3f4f6'}}>
      <ScrollView>
        <View style={{padding: 16, backgroundColor: '#fff'}}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: 12,
            }}>
            {post?.title}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('User', {userId})}>
            <Text style={{fontSize: 16, color: '#6366f1', fontWeight: '600'}}>
              by {user?.username || 'Loading...'}
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              marginTop: 16,
              fontSize: 16,
              color: '#4b5563',
              lineHeight: 24,
            }}>
            {post?.body}
          </Text>
        </View>

        <View style={{marginTop: 24, paddingHorizontal: 16}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 12}}>
            Comments ({comments.length})
          </Text>
          {comments.map(comment => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PostDetailScreen;
