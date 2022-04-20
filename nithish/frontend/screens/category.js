import React from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity,ImageBackground, View } from 'react-native';
import 'react-native-gesture-handler';
import Title from '../components/title';
//const image = { uri: "https://docs.expo.dev/static/images/tutorial/splash.png" };
const img=require('../assets/image.jpg');
const Category = ({navigation,route}) => {
    return(
        <SafeAreaView style={styles.container}>
        <ImageBackground source={img} style={styles.imgbg}>
            {/* <Text style={styles.greetText}>Welcome {route.params.key} </Text> */}
            <Text style={styles.cattext}>    SELECT CATEGORY </Text>
            <View style={styles.optionsContainer}>
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
        </ImageBackground>
        </SafeAreaView>
    )
}

export default Category;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'black',
        //padding: 50,
        justifyContent:'space-between',
        flexDirection: 'column',
        elevation:3,
        //paddingTop:40,
        //margin:40,
        //paddingHorizontal:40,
        paddingTop:20,
        paddingHorizontal:10,
    },
    categoryButtons: {
        backgroundColor: '#1e90ff',
        //padding: 12,
        paddingHorizontal: 16,
        borderRadius: 30,
        marginTop:30,
        alignItems: 'center',
        marginBottom: 50,
        overflow:'hidden',
        //elevation:3,
    },
    categoryText: {
        fontSize: 30,
        fontWeight: '300',
        color:'white',
        fontWeight:'bold',
    },
    cattext: {
        fontSize: 30,
        color: 'white',
        alignItems:'center',
        padding:30,
        paddingHorizontal:30,
        fontWeight:'bold',
        justifyContent:'center',
        //alignself:'center  
        
    },
    imgbg: {
        flex:1,
    },
    optionsContainer: {
        marginVertical: 16,
        flex: 1,
        elevation:3,
        paddingTop:30,
        paddingHorizontal:30,
        padding:10,
    },
    // greetText: {
    //     fontSize: 26,
    //     fontWeight: '300',
    //     alignSelf: 'flex-end',
    //     color: 'white',
    // },

})