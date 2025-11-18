import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Post} from '../types';

type Props = {
  post: Post & {username: string};
  onPressPost: () => void;
  onPressUser: () => void;
};

const PostCard = ({post, onPressPost, onPressUser}: Props) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPressPost}>
      <Text style={styles.title} numberOfLines={2}>
        {post.title}
      </Text>
      <TouchableOpacity onPress={onPressUser}>
        <Text style={styles.username}>by {post.username}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 6,
  },
  username: {
    fontSize: 14,
    color: '#6366f1',
    fontWeight: '600',
  },
});

export default PostCard;
