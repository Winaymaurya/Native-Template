import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Card, Button, Text, Snackbar } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import he from 'he';

const QuizPage = () => {
  const router = useRouter();
  const [quizzes, setQuizzes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('17'); // Default subject: Science
  const [loading, setLoading] = useState(true); // Loading state for fetching data
  const [subjects] = useState([
    { label: 'Science', value: '17' },
    { label: 'History', value: '23' },
    { label: 'Geography', value: '22' },
    { label: 'Mathematics', value: '19' },
    { label: 'General Knowledge', value: '9' },
  ]);

  const fetchQuizzes = async () => {
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=10&category=${selectedSubject}&type=multiple`
      );
      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        throw new Error('No quiz data available.');
      }

      const processedQuizzes = data.results.map((question) => ({
        question: he.decode(question.question),
        options: question.incorrect_answers
          .concat(question.correct_answer)
          .map((option) => he.decode(option))
          .sort(() => Math.random() - 0.5),
        correctAnswer: he.decode(question.correct_answer),
      }));

      setQuizzes(processedQuizzes);
    } catch (error) {
      // console.error('Error fetching quizzes:', error.message || error);
      // Alert.alert('Error', 'Failed to fetch quizzes. Please try again later.');
    } finally {
      setLoading(false); // Stop loading once fetching is complete
    }
  };

  useEffect(() => {
    fetchQuizzes(); // Fetch quizzes on initial render
  }, [selectedSubject]);

  const handleOptionSelect = (option) => {
    if (selectedOption) return;

    setSelectedOption(option);
    const isCorrect = option === quizzes[currentIndex].correctAnswer;

    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
      setSnackbarMessage('🎉 Correct Answer!');
    } else {
      setWrongAnswers((prev) => prev + 1);
      setSnackbarMessage('❌ Incorrect. Correct Answer: ' + quizzes[currentIndex].correctAnswer);
      setShowCorrectAnswer(true);
    }

    setSnackbarVisible(true);
  };

  const handleSnackbarDismiss = () => setSnackbarVisible(false);

  const handleNextQuiz = () => {
    if (currentIndex < quizzes.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowCorrectAnswer(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setShowCorrectAnswer(false);
    setQuizCompleted(false);
    setLoading(true);
    fetchQuizzes(); // Restart the quiz
  };

  const handleSubjectChange = (value) => {
    setSelectedSubject(value);
    setLoading(true);
    setCurrentIndex(0);
    setSelectedOption(null);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setShowCorrectAnswer(false);
    fetchQuizzes(); // Fetch quizzes for the new subject
  };

  return (
    <>
      <View className="bg-[#3243da] justify-start p-3 flex-row items-center">
        <TouchableOpacity onPress={() => router.push('/Home')}>
          <Ionicons name="arrow-back" size={32} color="white" />
        </TouchableOpacity>
        <Text className="text-xl tracking-wider text-white ml-4 font-mediumM">Quiz</Text>
      </View>

      {/* Subject Selector */}
      <View style={styles.subjectSelector} className="flex-row items-center">
        <Text style={styles.selectorLabel} className="font-mediumM w-40">
          Select a Subject:
        </Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedSubject}
            onValueChange={(value) => handleSubjectChange(value)}
            style={styles.picker}
            mode="dropdown"
          >
            {subjects.map((subject, index) => (
              <Picker.Item
                key={index}
                label={subject.label}
                value={subject.value}
                className="font-mediumM"
              />
            ))}
          </Picker>
        </View>
      </View>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#3243da" />
          <Text style={styles.loadingText}>Fetching Quiz Data...</Text>
        </View>
      ) : !quizCompleted ? (
        quizzes.length > 0 && currentIndex < quizzes.length ? (
          <View style={styles.container}>
            <Card style={styles.card}>
              <Card.Content>
                <Text style={styles.question} className="font-mediumM">
                  Q{currentIndex + 1}. {quizzes[currentIndex].question}
                </Text>
              </Card.Content>
            </Card>

            <View style={styles.optionsContainer}>
              {quizzes[currentIndex].options.map((option, index) => (
                <Button
                  key={index}
                  mode="outlined"
                  onPress={() => handleOptionSelect(option)}
                  className="font-mediumM"
                  style={[
                    styles.optionButton,
                    selectedOption === option
                      ? option === quizzes[currentIndex].correctAnswer
                        ? styles.correctButton
                        : styles.incorrectButton
                      : null,
                  ]}
                  labelStyle={styles.optionText}
                >
                  <Text className="font-mediumM">{option}</Text>
                </Button>
              ))}
            </View>

            {showCorrectAnswer && (
              <Text style={styles.correctAnswerText}>
                Correct Answer: {quizzes[currentIndex].correctAnswer}
              </Text>
            )}

            <Button
              mode="contained"
              onPress={handleNextQuiz}
              disabled={!selectedOption}
              style={styles.nextButton}
              labelStyle={styles.nextButtonText}
            >
              <Text className="font-mediumM text-white text-lg">Next Quiz</Text>
            </Button>

            <Snackbar
              visible={snackbarVisible}
              onDismiss={handleSnackbarDismiss}
              duration={3000}
              style={styles.snackbar}
            >
              {snackbarMessage}
            </Snackbar>
          </View>
        ) : (
          <View style={styles.center}>
            <Text>No quizzes available.</Text>
          </View>
        )
      ) : (
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Quiz Completed!</Text>
            <Text style={styles.modalScore}>
              🎉 Correct Answers: {correctAnswers}
            </Text>
            <Text style={styles.modalScore}>❌ Wrong Answers: {wrongAnswers}</Text>
            <Button
              mode="contained"
              onPress={handleRestart}
              style={styles.restartButton}
            >
              Restart Quiz
            </Button>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  subjectSelector: {
    marginTop: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  selectorLabel: {
    fontSize: 16,
    marginRight: 8,
  },
  pickerContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  picker: {
    width: '100%',
    height: 60,
    fontSize: 16,
    margin: -10
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#3243da',
    fontWeight: 'bold',
  },
  card: {
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    color: '#333',
  },
  optionsContainer: {
    marginTop: 24,
  },
  optionButton: {
    marginVertical: 12,
    paddingVertical: 4,
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
  correctAnswerText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3243da',
    textAlign: 'center',
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: '#3243da',
    paddingVertical: 6,
    borderRadius: 8,
  },
  snackbar: {
    backgroundColor: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalScore: {
    fontSize: 16,
    marginVertical: 8,
  },
  restartButton: {
    marginTop: 16,
    backgroundColor: '#3243da',
  },
});

export default QuizPage;
