import React, { useState } from "react";
import {Text, View, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Alert } from "react-native";
import 'react-native-gesture-handler';
import Title from "../components/title";

const Signup = ({navigation}) => {
    const [fullName, setFullName] = useState('');
    const [mailId, setMailId] = useState('');
    const [password, setPassword] = useState('');
    const [isValid, setIsValid] = useState(false);
    const submitData = () => {
        fetch('http://10.9.3.24:2001/signup',{
            method : "post",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                mailId,
                password,
                fullName
            })
        })
        .then(res => res.json())
        .then(data => setIsValid(data))
        if(isValid == true){
            navigation.navigate('Login');
        }
        else{
            alert("Email Already Exist")
        }
    }
    return(
        <SafeAreaView style={styles.parentContainer}>
            <View style={styles.container}>
                <Title titleText='SIGNUP'/>
                <View style={styles.loginContainer}>
                    <Text style={styles.inputText}>Enter Name:</Text>
                    <TextInput style={styles.inputTextBox}
                        placeholder="e.g. Krishna"
                        value={fullName}
                        onChangeText = {(fullName) => setFullName(fullName)}
                    />
                    <Text style={styles.inputText}>Enter Email Id:</Text>
                    <TextInput style={styles.inputTextBox}
                        placeholder="abc@gmail.com"
                        value={mailId}
                        onChangeText = {(mailId) => setMailId(mailId)}
                    />
                    <Text style={styles.inputText}>Set Password:</Text>
                    <TextInput style={styles.inputTextBox}
                        secureTextEntry= { true }
                        value={password}
                        onChangeText = {(password) => setPassword(password)}
                    />
                </View>
                <View>
                    <TouchableOpacity style={styles.button} onPress={() => submitData() }>
                        <Text style={styles.buttonText}>SUBMIT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>    
    )
}

export default Signup;

const styles = StyleSheet.create({
    parentContainer: {
        backgroundColor: '#1b4332',
        height: '100%',
    },
    container: {
        height: '100%',
        alignSelf: 'center',
    },
    loginContainer: {
        paddingTop: 20,
    },
    inputTextBox: {
        borderWidth: 1,
        borderColor: '#777',
        padding: 8,
        margin: 10,
        width: 250,
        color: 'white',
        fontSize: 20,
    },
    inputText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '200',
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
        fontSize: 15,
        fontWeight: '600',
        color: 'white',
    },

})