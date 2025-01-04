import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Button, Text, ActivityIndicator, Snackbar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import he from 'he';
const QuizPage = () => {
  const router = useRouter();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const fetchQuiz = async () => {
    try {
      setLoading(true);
      setSelectedOption(null);
  
      const response = await fetch(
        'https://opentdb.com/api.php?amount=1&category=17&type=multiple'
      );
      const data = await response.json();
  
      if (!data.results || data.results.length === 0) {
        throw new Error('No quiz data available.');
      }
  
      const question = data.results[0];
      setQuiz({
        question: he.decode(question.question),
        options: question.incorrect_answers
          .concat(question.correct_answer)
          .map((option) => he.decode(option))
          .sort(() => Math.random() - 0.5),
        correctAnswer: he.decode(question.correct_answer),
      });
    } catch (error) {
      console.error('Error fetching quiz:', error.message || error);
      Alert.alert('Error', 'Failed to fetch quiz. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  

  useEffect(() => {
    fetchQuiz(); // Fetch quiz question on component mount
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    if (option === quiz.correctAnswer) {
      setSnackbarMessage('🎉 Correct Answer! Great Job!');
      setSnackbarVisible(true);
    } else {
      setSnackbarMessage('❌ Incorrect. Try Again!');
      setSnackbarVisible(true);
    }
  };

  const handleSnackbarDismiss = () => setSnackbarVisible(false);

  const handleNextQuiz = () => {
    fetchQuiz(); // Fetch the next quiz question
  };

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator animating={true} color="blue" size="large" />
//       </View>
//     );
//   }

  return (
    <>
      <View className="bg-[#3243da] justify-start p-3 flex-row items-center">
        <TouchableOpacity onPress={() => router.push('/Home')}>
          <Ionicons name="arrow-back" size={32} color="white" />
        </TouchableOpacity>
        <Text className="text-xl tracking-wider text-white ml-4 font-mediumM">Quiz</Text>
      </View>
   {!loading ?     <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.question} className='font-mediumM'>{quiz.question}</Text>
          </Card.Content>
        </Card>

        <View style={styles.optionsContainer}>
          {quiz.options.map((option, index) => (
            <Button
              key={index}
              mode="outlined"
              onPress={() => handleOptionSelect(option)}
              style={[
                styles.optionButton,
                selectedOption === option
                  ? option === quiz.correctAnswer
                    ? styles.correctButton
                    : styles.incorrectButton
                  : null,
              ]}
              labelStyle={styles.optionText}
            >
              {option}
            </Button>
          ))}
        </View>

        <Button
          mode="contained"
          onPress={handleNextQuiz}
          style={styles.nextButton}
          labelStyle={styles.nextButtonText}
        >
          Next Quiz
        </Button>

        <Snackbar
          visible={snackbarVisible}
          onDismiss={handleSnackbarDismiss}
          duration={3000}
          style={styles.snackbar}
        >
          {snackbarMessage}
        </Snackbar>
      </View>:  <View style={styles.center}>
        <ActivityIndicator animating={true} color="blue" size="large" />
      </View>}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
 
  },
  card: {
    marginBottom: 16,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  optionsContainer: {
    marginTop: 24,
  },
  optionButton: {
    marginVertical: 8,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  correctButton: {
    borderColor: '#4caf50',
    backgroundColor: '#dcedc8',
  },
  incorrectButton: {
    borderColor: '#f44336',
    backgroundColor: '#ffcdd2',
  },
  optionText: {
    fontSize: 16,
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: '#3243da',
    paddingVertical: 10,
    borderRadius: 8,
  },
  nextButtonText: {
    fontSize: 16,
    color: 'white',
  },
  snackbar: {
    backgroundColor: '#333',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QuizPage;
