import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import 'react-native-gesture-handler';

const Successsignup = ({navigation}) => {
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.infoText}>You have successfully created an account!!</Text>
            <TouchableOpacity onPress={() => {navigation.navigate("Login")}}>
                <Text style={styles.linkText}>Click here to go to login page</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Successsignup;

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        padding: 20,
        margin: 30,
    },
    infoText: {
        fontSize: 26,
        fontWeight: '300'
    },
    linkText: {
        fontSize:20,
        textDecorationLine: 'underline',
        textAlign: 'center',
    },
})