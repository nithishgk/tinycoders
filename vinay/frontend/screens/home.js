import React from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import 'react-native-gesture-handler';
import Title from '../components/title';
import { useState } from 'react';

const Home = ({navigation}) => {
    const [name, setName] = useState('');
    return (
        <SafeAreaView style={styles.container}>
            <Title titleText='QUIZZLLER'/>
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>Enter your name:</Text>
                <TextInput 
                    style={styles.inputTextBox} 
                    placeholder='e.g. John Smith'
                    value={name}
                    onChangeText = {(name) => setName(name)}/>
            </View>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri:"https://image.shutterstock.com/image-vector/quiz-comic-pop-art-style-260nw-1506580442.jpg"}}
                resizeMode="contain"/>
            </View>
            <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate("Category", {key: name})}}>
                <Text style={styles.buttonText}>START</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Home;

const styles = StyleSheet.create({
    image: {
        height: 400,
        width: 400,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    container: {
        paddingTop: 40,
        paddingHorizontal: 20,
        height: '100%',
        backgroundColor: '#B7B7A4',
    },
    button: {
        width: '100%',
        backgroundColor: '#1A759F',
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 30,
    },
    buttonText: {
        fontSize: 24,
        fontWeight: '600',
        color: 'white',
    },
    inputContainer: {
        alignSelf: 'center',
    },
    inputText: {
        fontSize: 25,
    },
    inputTextBox: {
        borderWidth: 1,
        borderColor: '#777',
        padding: 8,
        margin: 10,
        width: 200,
    },
})