import React, { useState } from 'react'
import { View, StyleSheet, Button, TouchableOpacity } from 'react-native'
import { RadioButton, Text } from 'react-native-paper';
import assessment from '../assets/assessment.json'
import Question from '../components/Question'
import { useBackHandler } from '@react-native-community/hooks'
var RNFS = require('react-native-fs');

const Quiz = ({ navigation }) => {

     const [questionNo, setQuestionNo] = useState(1);
     const [value, setValue] = useState('');
     const [markedAnswers, setMarkedAnswers] = useState([]);
     const [score, setScore] = useState(0);
     const [nextButtonText, setNextButtonText] = useState('Next');
     const [totalQuestions, setTotalQuestions] = useState(Object.keys(assessment[0]).length);
     const nextQuestionText = "Next";
     const endQuizText = "End";

     const backAction = () => {


          if (questionNo > 1) {
               setQuestionNo(questionNo - 1);
               return true;
          }
          else navigation.goBack();
     }

     useBackHandler(() => backAction())


     const nextQuestion = () => {

          let attemptedAnswers = [...markedAnswers];
          attemptedAnswers[questionNo - 1] = value;
          setMarkedAnswers(attemptedAnswers);

          if (questionNo < totalQuestions) {
               if (questionNo == totalQuestions - 1)
                    setNextButtonText(endQuizText);
               else setNextButtonText(nextQuestionText);
               setQuestionNo(questionNo + 1);

          }
          else {
               let correctAns = 0;

               attemptedAnswers.map((answer, index) => {
                    if (assessment[2][(index + 1).toString()] === answer)
                         correctAns++;

               });



               setScore(correctAns);


               var path = RNFS.DocumentDirectoryPath + '/score.txt';

               RNFS.writeFile(path, correctAns, 'utf8').then((success) => {

                    navigation.goBack("SignUp");
               })
                    .catch(err => {
                         alert(err.message);
                    });




          }


     }

     return (
          <View style={styles.container}>
               <View >

                    <Question question={assessment[0][questionNo.toString()]} />
               </View>
               <View style={styles.options}>
                    <RadioButton.Group onValueChange={value => setValue(value)} value={value}>

                         <View style={styles.option}>

                              <RadioButton value={assessment[1][questionNo.toString()]['a']} />
                              <Text>{assessment[1][questionNo.toString()]['a']}</Text>
                         </View>
                         <View style={styles.option}>

                              <RadioButton value={assessment[1][questionNo.toString()]['b']} />
                              <Text>{assessment[1][questionNo.toString()]['b']}</Text>
                         </View>
                         <View style={styles.option}>

                              <RadioButton value={assessment[1][questionNo.toString()]['c']} />
                              <Text>{assessment[1][questionNo.toString()]['c']}</Text>
                         </View >
                         <View style={styles.option}>

                              <RadioButton style={styles.circle} value={assessment[1][questionNo.toString()]['d']} />
                              <Text>{assessment[1][questionNo.toString()]['d']}</Text>
                         </View>

                    </RadioButton.Group>

               </View>
               {(value === assessment[1][questionNo.toString()]['a'] || value === assessment[1][questionNo.toString()]['b'] || value === assessment[1][questionNo.toString()]['c'] || value === assessment[1][questionNo.toString()]['d']) ?
                    (<TouchableOpacity onPress={() => nextQuestion()} style={styles.submitButton}><Text style={styles.text}>{nextButtonText}</Text></TouchableOpacity>) : <></>}

          </View>
     );




}
const styles = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'stretch',
          justifyContent: 'space-between',
          fontSize: 10,
          padding: 10,
          margin: 15,
          height: 40,
     },
     options: {
          flex: 1,
          alignItems: 'baseline',
          justifyContent: 'space-between'

     },
     option: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: "center"


     },
     submitButton: {
          backgroundColor: '#7a42f4',
          padding: 10,
          margin: 15,
          height: 40,
          textAlign: "center"
     },
     text: {
          color: "#000",
          fontSize: 18,
          textAlign: "center",
          fontWeight: "bold"
     }

})

export default Quiz;