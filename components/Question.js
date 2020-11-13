import React from 'react';
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

const Question = (props) => {
    return (
        <View style={styles.container}>
            <Text >{props.question}</Text>
        </View>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        margin: 15,
        height: 40,
    },
    question: {
        fontWeight: "bold"
    }
})
export default Question;

