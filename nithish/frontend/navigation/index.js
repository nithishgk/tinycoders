import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Home from '../screens/home';
import Category from '../screens/category';
import Quiz from '../screens/quiz';
import Result from '../screens/result';
import Forgotpass from '../screens/forgotpass';
import Signup from '../screens/signup';
import Successsignup from '../screens/successsignup';
import Login from '../screens/login';


const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
      <Stack.Screen name="Forgotpass" component={Forgotpass} options={{headerShown:false}}/>
      <Stack.Screen name="Signup" component={Signup} options={{headerShown:false}}/>
      <Stack.Screen name="Successsignup" component={Successsignup} options={{headerShown:false}}/>
      <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
      <Stack.Screen name="Category" component={Category} options={{headerShown:false}}/>
      <Stack.Screen name="Quiz" component={Quiz} options={{headerShown:false}}/>
      <Stack.Screen name="Result" component={Result} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
}

export default MyStack;