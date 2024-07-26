import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

import { Link, router } from 'expo-router';
import TodoList from '../components/TodoList';

export default function todo() {
  return (
      <View style={styles.container}>
        {/* Soit un link qui va sur un écran donné */}
        <Button title='back' onPress={() => router.back()} />
        
        <TodoList></TodoList>

        <StatusBar style="auto" />
        
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn:{position:'absolute',
    top:150,
    left:30,
  }
});
