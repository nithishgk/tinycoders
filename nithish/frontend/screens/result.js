import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,ImageBackground } from 'react-native';
import 'react-native-gesture-handler';
import Title from '../components/title';


const Result = ({navigation, route}) => {
    const {score} = route.params;
    const {category} = route.params;                 
    const {level} = route.params;
    const {pass} = route.params;
    const img=require('../assets/image.jpg');
    //const resultImage = score > 6 ? "https://www.wcupa.edu/healthSciences/images/_celebrate2020/congratulations.jpg" : "https://i0.wp.com/sourcingandsupplychain.com/wp-content/uploads/2020/06/better-luck-next-time.png?fit=860%2C906&ssl=1"
    if(level==="1"){
        const resultImage = score <= pass ? "https://media0.giphy.com/media/8VEcV7zZZzbjU0P5XT/200w.gif?cid=82a1493b9qh9qzat4toiv6z19zi7vi4y03796mfpdzxrxwt0&rid=200w.gif&ct=s" : "https://c.tenor.com/4UzJnIHXfPkAAAAM/animated-greeting-card-great-job.gif"
        return (
            <View style={styles.container}>
            <ImageBackground source={img} style={styles.imgbg}>
                <Text style={styles.restext}>RESULTS</Text>
                <Text style={styles.resultText}>Your score is: {score*10}%</Text>
                {score >= pass && <Text style={styles.resultText}>Click on "GO TO LEVEL2" to proceed further</Text>}
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{uri: resultImage}}
                    resizeMode="contain"/>
                </View>
                <View style={styles.optionsContainer}>
                    {score >= pass && <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("Quiz",{category:category,level:"2"})}>
                            <Text style={styles.buttonText}> GO TO LEVEL2 </Text>
                        </TouchableOpacity>}
                    {score < pass && <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("Home")}>
                            <Text style={styles.buttonText}>GO TO HOME</Text>
                        </TouchableOpacity>}
                </View>
            </ImageBackground>
            </View>
        );
    }
    else{
        const resultImage = score > pass ? "https://c.tenor.com/HAGXdX-X-1cAAAAM/no1-happy.gif" : "https://cdn.dribbble.com/users/1675407/screenshots/14430321/oops_.gif"
        return (
            <View style={styles.container}>
            <ImageBackground source={img} style={styles.imgbg}>
                <Text style={styles.restext}>RESULTS</Text>
                <Text style={styles.resultText}>Your score is: {score*10}%</Text>
                {score >= pass && <Text style={styles.resultText}>Congratulations you have passed the {category} test</Text>}
                <View style={styles.imageContainer2}>
                    <Image style={styles.image} source={{uri: resultImage}}
                    resizeMode="contain"/>
                </View>
                <View style={styles.optionsContainer}>
                    <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("Home")}>
                            <Text style={styles.buttonText}>Go To Home</Text>
                    </TouchableOpacity>
                </View>
                </ImageBackground>
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
        height:150,
        width:370,
        resizeMode:'contain',
    },
    imageContainer2: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        height:150,
        width:220,
        top:50,
        bottom:20,
        left:70,
        right:30,
        //Object
        padding:10,
        paddingHorizontal:30,
         //paddingTop:30,
        // paddingVertical:30,
        resizeMode:'contain',
        
    },
    container: {
        paddingTop: 20,
        paddingHorizontal: 20,
        height: '100%',
        marginBottom:30,
        marginVertical:5,
        //marginHorizontal:5,
        padding:10,
        backgroundColor:'black',
    },
    button: {
        width: '100%',
        backgroundColor: '#1e90ff',
        padding: 16,
        borderRadius: 100,
        alignItems: 'center',
        marginBottom: 30,
        paddingHorizontal:30,
        margin:20,
         //marginBottom: 12,
         paddingVertical: 16,
        // paddingTop:30,
         marginVertical:20,
        // paddingHorizontal:20,
        paddingHorizontal: 12,
        borderRadius: 90,
        borderBottomEndRadius:30,
        borderBottomLeftRadius:30,
        borderBottomRightRadius:20,
        borderTopEndRadius:30,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        borderTopStartRadius:30,
    },
    buttonText: {
        fontSize: 24,
        fontWeight: '600',
        color: 'white',
        fontWeight:'bold',
    },
    resultText: {
        fontSize: 20,
        fontWeight: '200',
        alignSelf:'center',
        padding: 25,
        color:'white',
        paddingTop:5,
        marginBottom:20,
        paddingHorizontal:28,
    
    },
    imgbg: {
        flex:1,
    },
    restext :{
        color:'white',
        fontWeight:'bold',
        padding:40,
        justifyContent:'center',
        alignItems:'center',
        fontSize:35,
        alignSelf:'center',

    },
    optionsContainer: {
        //marginVertical: 75,
        flex: 1,
        //elevation:3,
        paddingTop:5,
        paddingHorizontal:40,
        padding:10,
        marginBottom:5,
        borderRadius:60,
        justifyContent:'center',
        alignItems:'center',
    },
    
})