import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from "expo-status-bar";

const App = () => {
    return (
      <View
        style={styles.container}
      >
        <StatusBar style="light" />
        <LinearGradient
          colors={['#0f0c29', '#302b63', '#24243e']}
          style={{
            flex: 1
          }}
        />
        
      </View>
    );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
