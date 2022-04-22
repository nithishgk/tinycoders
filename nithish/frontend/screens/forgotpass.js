import React, { useState } from "react";
import { SafeAreaView, Text, View, StyleSheet, TextInput, TouchableOpacity,ImageBackground } from "react-native";
import 'react-native-gesture-handler';
const img=require('../assets/imgg.jpg');
const Forgotpass = ({navigation}) => {
    const [mail, setMail] = useState('');
    return(
        <SafeAreaView style={styles.parentContainer}>
            <View style={styles.container}>
            <ImageBackground source={img} style={styles.imgbg} >
                <Text style={styles.mailText}>Enter your mail id: </Text>
                <TextInput style={styles.inputTextBox}
                    placeholder="abc@gmail.com"
                    value={mail}
                    onChangeText = {(mail) => setMail(mail)}
                />
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.otp}>Send OTP</Text>
                </TouchableOpacity>
                </ImageBackground>
            </View>
        </SafeAreaView>
    )
}

export default Forgotpass;

const styles = StyleSheet.create({
    parentContainer: {
        backgroundColor: '#1b4332',
        height: '100%',
       //padding: 30,
       width:"100%",
    },
    container: {
       // padding: 20,
        alignSelf: 'center',
        //margin: 30,
    },
    imgbg: {
        flex:1,
        //width:"100%",
        padding:100,
    },
    mailText: {
        fontSize: 26,
        fontWeight: '400',
        color:'white',
        fontWeight:'bold',
    },
    inputTextBox: {
        borderWidth: 1,
        borderColor: '#777',
        padding: 8,
        margin: 10,
        width: 250,
        color:'white',
        borderRadius:30,
        
    },
    button: {
        width: '100%',
        backgroundColor: '#1A759F',
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 30,
        //color:'white',
    },
    otp:{
        color:'white',
    }
})