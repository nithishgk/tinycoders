import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,ImageBackground,Alert } from 'react-native';
import 'react-native-gesture-handler';
import {useState} from 'react';
import {useEffect} from 'react';

const errorHandler = (e, isFatal) => {
    if (isFatal) {
      Alert.alert(
          'Unexpected error occurred',
          `
          Error: ${e.message}
  
          Try after some time.
          `,
        [{
          text: 'Try Again',
          onPress: () => {
            console.warn("connect server");
            //navigation.navigate('Home');
          }
        }]
      );
    };
  };


const  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const Quiz = ({navigation,route}) => {
    const[exp1,setExp1]=useState(false)
    const[exp2,setExp2]=useState(false)
    const {category} = route.params;
    const {level} = route.params;
    const[questions, setQuestions] = useState();
    const[ques, setQues] = useState(0);
    const[options, setOptions] = useState([])
    const[score, setScore] = useState(0)
    const[data, setData] = useState([])
    const[isLoading, setIsLoading] = useState(false)
    const[ids, setIds] = useState()
    const[dict, setDict] = useState({})
    const[pass, setPass] = useState()
    const getQuiz = async () => {
        setIsLoading(true)
       //console.log("Nithish");
       var url = 'http://10.9.3.24:2001/questions/' + category + '/' + level ;
       
        try{
            const res = await fetch(url);
            const data = await res.json();
            setData(data);
            //console.log("data ",data);
            var lst = [];
            var lst2 = [];
            data.map((x) => lst.push(x.description));
            data.map((y) => lst2.push(y.qid));
            setIds(lst2);
            setQuestions(lst);
            setOptions(generateOptionsAndShuffle(data[0]));
            setIsLoading(false);  
        }
        catch(error){
            errorHandler(error,'True');
            //console.error(error);
        }
    };

    useEffect(() => {
        getQuiz();
    },[level]);

    const handleNextPress = () => {
        setQues(ques+1)
        setOptions(generateOptionsAndShuffle(data[ques+1]))
    }

    const handlePrevPress = () => {
        let x = ques
        x = x-1;
        setQues(x)
        setOptions(generateOptionsAndShuffle(data[x]))
    }

    const generateOptionsAndShuffle = (question) => {
        //console.log(question);
        const options = [...question.incorrect_answers]
  
        options.push(question.correct_answer)

        shuffleArray(options)

        return options
    }

    const handleSelectedOption = (option,id) => {
        dict[id]=option;
        setDict(dict);
        // if(option==data[ques].correct_answer){
        //     setScore(score+1)
        // }
        let x = ques;
        if(x == 9){
            handleShowResult()
        }
        else{
            x = x+1
            setQues(x)
            setOptions(generateOptionsAndShuffle(data[x]))
        }
        //console.log(ques,x); 
    }

    const submitData = () => {
        fetch('http://10.9.3.24:2001/score',{
            method : "post",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                dict,
                category,
                level
            })
        })
        .then(res=>res.json())
        .then(data => {
            setScore(data.score)
            //console.log(data)
            setPass(data.dynamic)
        })
        setDict({});
    }
    const handleShowResult = () => {
        setQues(0);
        setQuestions([]);
        setData([]);
        setOptions([]);
        submitData();
        setExp1(true)
        if(level=='2'){
            setExp2(true)
        }
    }
    const handleNavigation=()=>{
        navigation.navigate('Result', {
            score:score,
            category:category,
            level:level,
            pass: pass
        })
    }
    const img=require('../assets/image.jpg');
    return (
        <View style={styles.container}>
        <ImageBackground source={img} style={styles.imgbg}>
            {isLoading ? <View style={styles.loadingTextContainer}>
                <Text style={styles.loadingText}>LOADING...</Text>
            </View> : questions && (
                <View style={styles.parent}>
                    <View style={styles.numberOfQuestions}>
                        <Text style={styles.numOfQuesText}>Question {ques+1}/10</Text>
                    </View>
                    <View style={styles.questionContainer}>
                        <Text style={styles.question}>Q{ques+1}.{decodeURIComponent(questions[ques])}</Text>
                    </View>
                    <View style={styles.optionsContainer}>
                        <TouchableOpacity style={styles.optionButton} onPress={() => handleSelectedOption(options[0],ids[ques])}>
                            <Text style={styles.options}>{decodeURIComponent(options[0])}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton} onPress={() => handleSelectedOption(options[1],ids[ques])}>
                            <Text style={styles.options}>{decodeURIComponent(options[1])}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton} onPress={() => handleSelectedOption(options[2],ids[ques])}>
                            <Text style={styles.options}>{decodeURIComponent(options[2])}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton} onPress={() => handleSelectedOption(options[3],ids[ques])}>
                            <Text style={styles.options}>{decodeURIComponent(options[3])}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottomButtons}>
                        {ques!==0 && <TouchableOpacity style={styles.button} onPress={handlePrevPress}>
                            <Text style={styles.buttonText}>PREV</Text>
                        </TouchableOpacity>}
                        {ques===9 && <TouchableOpacity style={styles.button} onPress={handleShowResult}>
                            <Text style={styles.buttonText}>SHOW RESULTS</Text>
                        </TouchableOpacity>}
                        {exp1==true&&level=='1'&&handleNavigation()}
                        {exp2==true&&level=='2'&&handleNavigation()}
                        {ques!==9 && <TouchableOpacity style={styles.button} onPress={handleNextPress}>
                            <Text style={styles.buttonText}>SKIP</Text>
                        </TouchableOpacity>}
                    </View>
                </View>
            )} 
            </ImageBackground>
        </View>
    )
}

export default Quiz;

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingHorizontal: 10,
        height: '100%',
        backgroundColor:'black',
    },
    questionContainer: {
        marginVertical: 10,
        paddingTop:20,
        paddingHorizontal:30,
    },
    optionsContainer: {
        marginVertical: 16,
        flex: 1,
        elevation:3,
        paddingTop:20,
        paddingHorizontal:30,
        padding:10,
    },
    bottomButtons: {
        marginBottom: 12,
        paddingVertical: 16,
        justifyContent:'space-between',
        flexDirection:'row',
        elevation:3,
        paddingTop:30,
        marginVertical:20,
        paddingHorizontal:30,
    },
    button: {
        backgroundColor: '#1e90ff',
        padding: 12,
        paddingHorizontal: 16,
        borderRadius: 60,
        alignItems: 'center',
        marginBottom: 30,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
    },
    question: {
        fontSize: 28,
        fontWeight:'bold',
        color:'white',
    },
    options: {
        fontSize: 18,
        fontWeight: '500',
        color: 'white',
        paddingHorizontal:30,
        //paddingVertical:2,
        //padding:12,
        //paddingTop:20,
        //margin:30,
        //marginBottom:20,
        

    },
    optionButton: {
        paddingVertical: 12,
        marginVertical: 6,
        backgroundColor: '#1e90ff',
        paddingHorizontal: 12,
        borderRadius: 90,
        borderBottomEndRadius:30,
        borderBottomLeftRadius:30,
        borderBottomRightRadius:20,
        borderTopEndRadius:30,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        borderTopStartRadius:30,
        //borderLeft
        borderColor:'#FF3D00',
        //elevation:3,
    },
    parent: {
        height: '100%',
    },
    loadingTextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 250,
    },
    loadingText: {
        fontSize: 32,
        fontWeight: '700',
    },
    imgbg: {
        flex:1,
    },
    numberOfQuestions: {
        alignSelf: 'center',
        paddingTop: 40,
    },
    numOfQuesText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    }

})