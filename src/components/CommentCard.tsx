import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Comment } from '../types';

type Props = {
  comment: Comment;
};

const CommentCard = ({ comment }: Props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{comment.name}</Text>
      <Text style={styles.email}>{comment.email}</Text>
      <Text style={styles.body}>{comment.body}</Text>
    </View>
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
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#6366f1',
    marginBottom: 8,
  },
  body: {
    fontSize: 15,
    color: '#4b5563',
    lineHeight: 22,
  },
});

export default CommentCard;