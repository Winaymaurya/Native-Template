import { View, Text, Alert, TextInput, RefreshControl, ScrollView } from 'react-native'
import React, { useState ,useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome';
const Badminton = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setCount1(0)
      setCount2(0)
      setSets(0)
      setWins([])
      setScore1(0)
      setScore2(0)
      setRefreshing(false);
    }, 1000);
  };

  const [sets, setSets] = useState('3'); 
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [count1, setCount1] = useState(0); // Player 1's set wins
  const [count2, setCount2] = useState(0); // Player 2's set wins
  const [wins, setWins] = useState([]);    // Track set winners

  // Handle score increment for Player 1 and Player 2
  const incrementScore = (player) => {
    if (player === '1') {
      const newScore1 = score1 + 1;
      if (newScore1 >= 21) {
        Alert.alert(`Player 1 Wins Set ${wins.length + 1}`);
        updateSetWinner('1');
      } else {
        setScore1(newScore1);
      }
    } else if (player === '2') {
      const newScore2 = score2 + 1;
      if (newScore2 >= 21) {
        Alert.alert(`Player 2 Wins Set ${wins.length + 1}`);
        updateSetWinner('2');
      } else {
        setScore2(newScore2);
      }
    }
  };

  // Handle set winner, reset scores, and update count of set wins
  const updateSetWinner = (winner) => {
    if (winner === '1') {
      setCount1(count1 + 1);
    } else {
      setCount2(count2 + 1);
    }
    setWins((prevWins) => [...prevWins, winner]);
    setScore1(0);
    setScore2(0);
  };

  // useEffect to check if match is over
  useEffect(() => {
    if (wins.length === parseInt(sets)) {
      determineMatchWinner();
    }
  }, [wins]);


  const determineMatchWinner = () => {
    if (count1 > count2) {
      Alert.alert('Player 1 Wins the Match');
    } else if (count2 > count1) {
      Alert.alert('Player 2 Wins the Match');
    } else {
     return Alert.alert("It's a Tie!"); 
    }
    onRefresh()
  };

  return (  
  <ScrollView
    contentContainerStyle={{ flexGrow: 1 }}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
  >
    <View className='h-[100vh] bg-blue-100'>
      <View>
        <Text className="text-3xl text-center border-b-2 p-2">Badmintion</Text>
      </View>

      {/* Input number of sets */}
      <View className='w-[100%] flex flex-row justify-center mt-2'>
        <Text className='text-lg'>Enter Number Of Sets:</Text>
        <TextInput
          keyboardType='numeric'
          className='text-2xl w-[40%] border-b-2 border-gray-800 p-0 px-4 rounded-xl'
          value={sets}
          onChangeText={(text) => setSets(text)}
        />
      </View>

      {/* Players' scores and controls */}
      <View className='flex flex-row justify-evenly m-2'>
        {/* Player 1 */}
        <View className='bg-blue-700 w-[45%] h-[20vh] flex justify-around m-1'>
          <Text className='text-2xl text-center text-white'>Player 1</Text>
          <TouchableOpacity onPress={() => incrementScore('1')}>
            <Text className='text-[60px] text-center text-white'>{score1}</Text>
          </TouchableOpacity>
          <View className='flex flex-row justify-between'>
            <TouchableOpacity onPress={() => setScore1(Math.max(score1 - 1, 0))}>
              <Text className='text-white ml-3'>
                <FontAwesome name="minus" size={24} color="white" />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => incrementScore('1')}>
              <Text className='text-white mr-3'>
                <FontAwesome name="plus" size={24} color="white" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Player 2 */}
        <View className='bg-red-600 w-[45%] h-[20vh] flex justify-around m-1'>
          <Text className='text-2xl text-center text-white'>Player 2</Text>
          <TouchableOpacity onPress={() => incrementScore('2')}>
            <Text className='text-[60px] text-center text-white'>{score2}</Text>
          </TouchableOpacity>
          <View className='flex flex-row justify-between'>
            <TouchableOpacity onPress={() => setScore2(Math.max(score2 - 1, 0))}>
              <Text className='text-white ml-3'>
                <FontAwesome name="minus" size={24} color="white" />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => incrementScore('2')}>
              <Text className='text-white mr-3'>
                <FontAwesome name="plus" size={24} color="white" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Displaying Set Wins */}
      <View className='flex flex-row justify-around flex-wrap min-h-[10vh]'>
        {wins?.map((win, index) => (
          <Text key={index} className='text-lg bg-blue-200 p-2 mb-2'>
            Player {win} Wins Set {index + 1}
          </Text>
        ))}
      </View>
    </View>
    </ScrollView>
  );
}

export default Badminton