import React from 'react';
import {View, StyleSheet} from 'react-native';

const SkeletonPost = () => {
  return (
    <View style={styles.card}>
      <View style={styles.lineLong} />
      <View style={[styles.lineLong, {width: '70%', marginTop: 8}]} />
      <View style={styles.lineShort} />
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
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  lineLong: {
    height: 20,
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
  },
  lineShort: {
    height: 16,
    width: '40%',
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    marginTop: 12,
  },
});

export default SkeletonPost;
