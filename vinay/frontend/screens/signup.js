import React, { useState } from "react";
import {Text, View, StyleSheet, TextInput, TouchableOpacity, SafeAreaView } from "react-native";
import 'react-native-gesture-handler';
import Title from "../components/title";

const Signup = ({navigation}) => {
    const [fullName, setFullName] = useState('');
    const [mailId, setMailId] = useState('');
    const [pass, setPass] = useState();
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
                        value={pass}
                        onChangeText = {(pass) => setPass(pass)}
                    />
                </View>
                <View>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Successsignup")}>
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