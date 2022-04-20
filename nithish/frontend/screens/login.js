import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput, TouchableOpacity, SafeAreaView } from "react-native";
import 'react-native-gesture-handler';
import Title from "../components/title";

const Login = ({navigation}) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isValid, setIsValid] = useState(false);
    const submitData = () => {
        fetch('http://10.9.3.24:2001/login',{
            method : "post",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                userName,
                password
            })
        })
        .then(res=>res.json())
        .then(data => setIsValid(data))
        if(isValid == true){
            navigation.navigate('Home');
        }
        else{
            alert("Invalid username/password");
        }
    }
    return(
        <SafeAreaView style={styles.parentContainer}>
            <View style={styles.container}>
                <Title titleText="LOGIN"/>
                <View style={styles.loginContainer}>    
                    <Text style={styles.inputText}>Enter username:</Text>
                    <TextInput style={styles.inputTextBox}
                        placeholder="abc@gmail.com"
                        value={userName}
                        onChangeText = {(userName) => setUserName(userName)}
                    />
                    <Text style={styles.inputText}>Enter Password:</Text>
                    <TextInput style={styles.inputTextBox}
                        secureTextEntry={ true }
                        value={password}
                        onChangeText = {(password) => setPassword(password)}
                    />
                    <TouchableOpacity style={styles.button} disabled={userName ? false : true} onPress={() => submitData() }>
                        <Text style={styles.buttonText}>LOGIN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Forgotpass")}>
                        <Text style={styles.forgotText}>Forgot password?</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
                    <View style={{flex: 1, height: 1, backgroundColor: 'white'}} />
                        <Text style={{width: 50, textAlign: 'center', color: 'white'}}>OR</Text>
                    <View style={{flex: 1, height: 1, backgroundColor: 'white'}} />
                </View>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                        <Text style={styles.needAnAccount}>Need an account? SIGNUP</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Login;

const styles = StyleSheet.create({
    parentContainer: {
        padding: 20,
        backgroundColor: '#1b4332',
        height: '100%',
    },
    container: {
        height: '100%',
        alignSelf: 'center',
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
        padding: 10,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 30,
    },
    buttonText: {
        fontSize: 15,
        fontWeight: '600',
        color: 'white',
    },
    forgotText: {
        color: 'white',
        alignSelf: "flex-end",
    },
    needAnAccount: {
        color: 'white',
        fontSize: 16,
        fontWeight: '400',
        alignSelf: 'center',
        padding: 20,
        textDecorationLine: "underline",
    },
    loginContainer: {
        paddingTop: 20,
    },
    
})