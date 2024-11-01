// components/AsteroidInfo.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

const AsteroidInfo: React.FC = () => {
  const { asteroidInfo, error } = useSelector((state: RootState) => state.asteroid);

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  if (!asteroidInfo) {
    return null;
  }

  const handleOpenURL = () => {
    if (asteroidInfo.nasa_jpl_url) {
      Linking.openURL(asteroidInfo.nasa_jpl_url);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>Name: {asteroidInfo.name}</Text>
      
      <Text>URL:</Text>
      <TouchableOpacity onPress={handleOpenURL}>
        <Text style={[styles.infoText, styles.linkText]}>
           {asteroidInfo.nasa_jpl_url}
        </Text>
      </TouchableOpacity>

      <Text style={styles.infoText}>
        Potentially Hazardous: {asteroidInfo.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default AsteroidInfo;
