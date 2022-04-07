import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import Title from '../components/title';


const Result = ({navigation, route}) => {
    const {score} = route.params;
    const {category} = route.params;
    const {level} = route.params;
    const resultImage = score >= 5 ? "https://www.wcupa.edu/healthSciences/images/_celebrate2020/congratulations.jpg" : "https://i0.wp.com/sourcingandsupplychain.com/wp-content/uploads/2020/06/better-luck-next-time.png?fit=860%2C906&ssl=1"
    if(level==="1"){
        return (
            <View style={styles.container}>
                <Title titleText='RESULTS'/>
                <Text style={styles.resultText}>Your score is: {score}</Text>
                {score >= 5 && <Text style={styles.resultText}>Click on "GO TO LEVEL2" to proceed further</Text>}
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{uri: resultImage}}
                    resizeMode="contain"/>
                </View>
                <View>
                    {score >= 5 && <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("Quiz",{category:category,level:"2"})}>
                            <Text style={styles.buttonText}> GO TO LEVEL2 </Text>
                        </TouchableOpacity>}
                    {score < 5 && <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("Home")}>
                            <Text style={styles.buttonText}>GO TO HOME</Text>
                        </TouchableOpacity>}
                </View>
                
            </View>
        );
    }
    else{
        return (
            <View style={styles.container}>
                <Title titleText='RESULTS'/>
                <Text style={styles.resultText}>Your score is: {score}</Text>
                {score >= 5 && <Text style={styles.resultText}>Congratulations you have passed the {category} test</Text>}
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{uri: resultImage}}
                    resizeMode="contain"/>
                </View>
                <View>
                <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("Home")}>
                            <Text style={styles.buttonText}>Go To Home</Text>
                        </TouchableOpacity>
                </View>
            </View>
        );
    }
    
};

export default Result;

const styles = StyleSheet.create({
    image: {
        height: 300,
        width: 300,
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
    resultText: {
        fontSize: 30,
        fontWeight: '200',
        alignSelf:'center',
        padding: 16,
    },
})