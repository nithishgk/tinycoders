import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';

const Title = ({titleText}) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{titleText}</Text>
        </SafeAreaView>
    )
}

export default Title;

const styles = StyleSheet.create({
    title: {
        fontSize: 36,
        fontWeight: '600',
    },
    container: {
        paddingVertical: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
})