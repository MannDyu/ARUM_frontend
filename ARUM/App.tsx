import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { MissionProvider } from './src/context/MissionContext';
import { createStackNavigator } from '@react-navigation/stack';
import { TabNavigator } from './src/navigation/TabNavigator';
import Home from './src/screens/Home/Home';
import FindCenter from './src/screens/SelfTest/FindCenter';
import TestReport from './src/screens/SelfTest/TestReport';
import RecordDiary from './src/screens/Diary/RecordDiary';
import DiaryThumbnail from './src/screens/Diary/DiaryThumbnail';
import DiaryDetail from './src/screens/Diary/DiaryDetail';
import { RootStackParamList } from './src/navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './src/screens/Home/Login';
import Signup from './src/screens/Home/Signup';
import Auth from './src/screens/Home/Auth';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState<string | null>(null);
  
  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        setUserToken(token);
      } catch (e) {
        console.error('Failed to get token from AsyncStorage:', e);
      }
      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);


  if (isLoading) {
    // 여기에 스플래시 스크린 렌더링
    return null; 
  }



  
  return (
    <>
      <StatusBar style="inverted" />
      <MissionProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {userToken == null ? (
              <>
                <Stack.Screen name="Auth" component={Auth} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />
              </>
            ) : (
              <Stack.Screen name="Main" component={TabNavigator} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </MissionProvider>
    </>
    // <>
    //   <StatusBar style="inverted" />
    //   <MissionProvider>
    //   <NavigationContainer>
    //   <Stack.Navigator screenOptions={{ headerShown: false }}>
    //     <Stack.Screen name="Main" component={TabNavigator} />
    //   </Stack.Navigator>
    //   </NavigationContainer>
    //   </MissionProvider>
    // </>
  );
}
