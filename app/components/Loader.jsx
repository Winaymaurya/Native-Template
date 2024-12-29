import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import Loader from './Loader'; // Adjust the path based on your project structure

const App = () => {
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false); // Simulate an API call
    }, 3000);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {loading ? (
        <Loader message="Please wait..." />
      ) : (
        <>
          <Text>Welcome to the App!</Text>
          <Button title="Load Data" onPress={fetchData} />
        </>
      )}
    </View>
  );
};

export default App;
