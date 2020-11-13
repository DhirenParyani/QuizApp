import React, { useState, useEffect } from 'react'
import { Snackbar } from 'react-native-paper';
import assessment from '../assets/assessment.json'
import { Text, View, SafeAreaView, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { useIsFocused } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';


var RNFS = require('react-native-fs');

const SignUp = ({ navigation }) => {
   const [firstName, setFirstName] = useState('');
   const [firstNameError, setFirstNameError] = useState('');
   const [lastName, setLastName] = useState('');
   const [lastNameError, setLastNameError] = useState('');
   const [nickName, setNickName] = useState('');
   const [nickNameError, setNickNameError] = useState('');
   const [age, setAge] = useState('');
   const [ageError, setAgeError] = useState('');
   const [showScore, setShowScore] = useState('');
   const isFocused = useIsFocused();
   const [isUserInformationAvailable, setUserInformationAvailable] = useState(false);
   const editingAvailable = "Done Editing";
   const editingNotAvailable = "Edit Information";

   const [editInformationButtonText, setEditInformationButtonText] = useState('Edit Information');

   const validate = () => {
      let validationMesages = {}
      if (firstName.length == 0)
         return false;
      if (lastName.length == 0)
         return false;
      if (nickName.length == 0)
         return false;
      if (age.length == 0)
         return false;


      return true;

   }


   const _storeData = async () => {

      try {

         if (firstName.length != 0 || lastName != 0 || nickName.length != 0 || age.length != 0) {
            const user = {
               firstName,
               lastName,
               nickName,
               age
            }



            await AsyncStorage.setItem(
               '@user', JSON.stringify(user));
            setUserInformationAvailable(true);
            setEditInformationButtonText(editingNotAvailable);

            return true;
         }
            setUserInformationAvailable(false);
            setEditInformationButtonText(editingAvailable);
         return false;
      }
      catch (error) {
         console.log(error)
      }

      return false;

   }


   const getUserDetailFromStorage = async () => {
      try {
         const userObject = await AsyncStorage.getItem('@user');
         if (userObject === null)
            return false;
         const user = JSON.parse(userObject);

         setFirstName(user.firstName);
         setLastName(user.lastName);
         setNickName(user.nickName);
         setAge(user.age);
         setUserInformationAvailable(true);
         setEditInformationButtonText(editingNotAvailable);
         return true;
      }
      catch (error) {


      }
      setUserInformationAvailable(false);
      setEditInformationButtonText(editingAvailable);
      return false;

   }
   const getScoreDetailsFomFile = async () => {

      var path = RNFS.DocumentDirectoryPath + '/score.txt';

      RNFS.readFile(path, 'utf8').then(

         (content) => {
            setShowScore(content+"/"+Object.keys(assessment[0]).length);
            return true;
         }

      ).catch((error) => console.log(error.message));


      return false;

   }

   const retrieveData = async () => {

      if (await getUserDetailFromStorage()) {
         await getScoreDetailsFomFile();
      }
      else {
         setUserInformationAvailable(false);
         setEditInformationButtonText(editingAvailable);

      }

   }

   useEffect(() => {
      retrieveData();
   }, [isFocused]);
   return (
      <View style={styles.container}>
         <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='handled'>
            <SafeAreaView>
               <TextInput style={styles.input}
                  underlineColorAndroid="transparent"
                  placeholder="FirstName"
                  value={firstName}
                  placeholderTextColor="#9a73ef"
                  autoCapitalize="none"
                  editable={!isUserInformationAvailable}
                  onChangeText={(text) => setFirstName(text)}
                  onBlur={() => {
                     if (firstName.length == 0)
                        setFirstNameError("Enter FirstName")
                     else setFirstNameError("")
                  }}

               />
               <Text style={styles.errors}>{firstNameError}</Text>
               <TextInput style={styles.input}
                  underlineColorAndroid="transparent"
                  placeholder="LastName"
                  value={lastName}
                  placeholderTextColor="#9a73ef"
                  autoCapitalize="none"
                  editable={!isUserInformationAvailable}
                  onChangeText={(text) => setLastName(text)}
                  onBlur={() => {
                     if (lastName.length == 0)
                        setLastNameError("Enter LastName")
                     else setLastNameError("");
                  }}
               />
               <Text style={styles.errors}>{lastNameError}</Text>
               <TextInput style={styles.input}
                  underlineColorAndroid="transparent"
                  placeholder="Nickname"
                  value={nickName}
                  placeholderTextColor="#9a73ef"
                  autoCapitalize="none"
                  editable={!isUserInformationAvailable}
                  onChangeText={(text) => setNickName(text)}
                  onBlur={() => {
                     if (nickName.length == 0)
                        setNickNameError("Enter NickName")
                     else setNickNameError("");
                  }}
               />
               <Text style={styles.errors}>{nickNameError}</Text>
               <TextInput style={styles.input}
                  underlineColorAndroid="transparent"
                  placeholder="Age"
                  value={age}
                  placeholderTextColor="#9a73ef"
                  keyboardType="numeric"
                  editable={!isUserInformationAvailable}
                  onChangeText={(text) => setAge(text)}
                  onBlur={() => {
                     if (age.length == 0)
                        setAgeError("Enter Age")
                     else if (parseInt(age) == 0 || parseInt(age) >= 255)
                        setAgeError("Age should be greater than 0 and less than 255")
                     else setAgeError("");
                  }}
               />
               <Text style={styles.errors}>{ageError}</Text>
               <Text style={styles.text}>Last Attempt Score: {showScore}</Text>
               <TouchableOpacity
                  style={styles.submitButton}

                  onPress={
                     (isUserInformationAvailable) ? () => {
                     setUserInformationAvailable(false);
                     setEditInformationButtonText(editingAvailable);
                  } :(validate())?()=>_storeData():null


                  }

               >
                  <Text style={styles.submitButtonText}>{editInformationButtonText}</Text>
               </TouchableOpacity>

               <TouchableOpacity
                  style={(isUserInformationAvailable) ? styles.submitButton : styles.disabledSubmitButton}
                  onPress={(isUserInformationAvailable) ? () => navigation.navigate('Quiz') : null}
               >
                  <Text style={styles.submitButtonText}> Start Quiz </Text>
               </TouchableOpacity>

            </SafeAreaView>
         </ScrollView>

      </View>)
}



const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'stretch',
      justifyContent: 'flex-start'

   },
   input: {
      margin: 15,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1,
      fontWeight: "bold",
      color: "black",
      borderRadius: 10
   },
   submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 15,
      height: 40,
   },
   disabledSubmitButton: {
      backgroundColor: 'grey',
      padding: 10,
      margin: 15,
      height: 40,
   },
   submitButtonText: {
      color: 'white'
   },
   text: {
      color: "#000",
      fontSize: 20,
      textAlign: "center",
      fontWeight: "bold"
   },
   errors: {
      color: "#FF0000",
      fontSize: 12,
      textAlign: "left",
      marginLeft: 30

   },

});


export default SignUp;