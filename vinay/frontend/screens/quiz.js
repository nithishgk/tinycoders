import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import 'react-native-gesture-handler';
import {useState} from 'react';
import {useEffect} from 'react';
import {fetch as fetchPolyfill} from 'whatwg-fetch'


const  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const Quiz = ({navigation,route}) => {
    var limit = 0;
    const {category} = route.params;
    const {level} = route.params;
    const[questions, setQuestions] = useState();
    const[ques, setQues] = useState(0);
    const[options, setOptions] = useState([])
    const[score, setScore] = useState(0)
    const[data, setData] = useState([])
    const[isLoading, setIsLoading] = useState(false)

    const getQuiz = async () => {
        setIsLoading(true)
        var url = 'http://192.168.21.68:2001/questions/' + category + '/' + level ;
        const res = await fetch(url);
        const data = await res.json();
        //console.log(level);
        setData(data);
        var lst = [];
        data.map((x) => lst.push(x.description));
        setQuestions(lst);
        setOptions(generateOptionsAndShuffle(data[0]));
        setIsLoading(false)
    };

    useEffect(() => {
        getQuiz();
    },[level]);

    const handleNextPress = () => {
        setQues(ques+1)
        setOptions(generateOptionsAndShuffle(data[ques+1]))
    }

    const generateOptionsAndShuffle = (question) => {
        //console.log(question);
        const options = question.incorrect_answers
        options.push(question.correct_answer)
        shuffleArray(options)
        return options
    }

    const handleSelectedOption = (option) => {
        if(option==data[ques].correct_answer){
            setScore(score+1)
        }
        let x = ques;
        //x = x%10
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

    const handleShowResult = () => {
        setQues(0);
        setScore(0);
        navigation.navigate('Result', {
            score:score,
            category:category,
            level:level
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? <View style={styles.loadingTextContainer}>
                <Text style={styles.loadingText}>LOADING...</Text>
            </View> : questions && (
                <View style={styles.parent}>
                    <View style={styles.questionContainer}>
                        <Text style={styles.question}>Q{ques+1}.{decodeURIComponent(questions[ques])}</Text>
                    </View>
                    <View style={styles.optionsContainer}>
                        <TouchableOpacity style={styles.optionButton} onPress={() => handleSelectedOption(options[0])}>
                            <Text style={styles.options}>{decodeURIComponent(options[0])}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton} onPress={() => handleSelectedOption(options[1])}>
                            <Text style={styles.options}>{decodeURIComponent(options[1])}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton} onPress={() => handleSelectedOption(options[2])}>
                            <Text style={styles.options}>{decodeURIComponent(options[2])}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton} onPress={() => handleSelectedOption(options[3])}>
                            <Text style={styles.options}>{decodeURIComponent(options[3])}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottomButtons}>
                        {ques!==9 && <TouchableOpacity style={styles.button} onPress={handleNextPress}>
                            <Text style={styles.buttonText}>SKIP</Text>
                        </TouchableOpacity>}
                        {ques===9 && <TouchableOpacity style={styles.button} onPress={handleShowResult}>
                            <Text style={styles.buttonText}>SHOW RESULTS</Text>
                        </TouchableOpacity>}
                        {ques!==9 && <TouchableOpacity style={styles.button} onPress={handleShowResult}>
                            <Text style={styles.buttonText}>SUBMIT</Text>
                        </TouchableOpacity>}
                    </View>
                </View>
            )} 
        </SafeAreaView>
    )
}

export default Quiz;

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        paddingHorizontal: 20,
        height: '100%',
    },
    questionContainer: {
        marginVertical: 16,
    },
    optionsContainer: {
        marginVertical: 16,
        flex: 1,
    },
    bottomButtons: {
        marginBottom: 12,
        paddingVertical: 16,
        justifyContent:'space-between',
        flexDirection:'row',
    },
    button: {
        backgroundColor: '#1A759F',
        padding: 12,
        paddingHorizontal: 16,
        borderRadius: 16,
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
    },
    options: {
        fontSize: 18,
        fontWeight: '500',
        color: 'white',
    },
    optionButton: {
        paddingVertical: 12,
        marginVertical: 6,
        backgroundColor: '#34A0A4',
        paddingHorizontal: 12,
        borderRadius: 12,
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
})