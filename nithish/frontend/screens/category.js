import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import Title from '../components/title';

const Category = ({navigation, route}) => {
    return(
        <View style={styles.container}>
            <Text style={styles.greetText}>Welcome {route.params.key} </Text>
            <Title titleText='SELECT CATEGORY:'/>
            <TouchableOpacity style={styles.categoryButtons} onPress={()=>{navigation.navigate('Quiz',{category:"java",level:"1"})}}>
                <Text style={styles.categoryText}>JAVA</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButtons} onPress={()=>{navigation.navigate('Quiz',{category:"c",level:"1"})}}>
                <Text style={styles.categoryText}>C</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButtons} onPress={()=>{navigation.navigate('Quiz',{category:"python",level:"1"})}}>
                <Text style={styles.categoryText}>PYTHON</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButtons} onPress={()=>{navigation.navigate('Quiz',{category:"c++",level:"1"})}}>
                <Text style={styles.categoryText}>C++</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Category;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#718355',
        padding: 50,
        justifyContent:'space-between',
        flexDirection: 'column',
    },
    categoryButtons: {
        backgroundColor: '#1A759F',
        padding: 12,
        paddingHorizontal: 16,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 30,
    },
    categoryText: {
        fontSize: 30,
        fontWeight: '300',
    },
    greetText: {
        fontSize: 26,
        fontWeight: '300',
        alignSelf: 'flex-end',
        color: 'white',
    },
})