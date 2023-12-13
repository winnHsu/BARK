import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './app/screens/mainScreens/HomeScreen';
import MapScreen from './app/screens/mainScreens/MapScreen';
import PostingScreen from './app/screens/mainScreens/PostingScreen';
import MessageScreen from './app/screens/mainScreens/MessageScreen';
import MeScreen from './app/screens/mainScreens/MeScreen';
import ChatRoomScreen from './app/screens/mainScreens/ChatRoomScreen';
import nums from './app/constants/nums';
import TabButton from './app/components/buttons/TabButton';
import color from './app/constants/colors';
import IconHomeLight from './assets/icons/home_light.svg';
import IconMapLight from './assets/icons/map_light.svg';
import IconMessageLight from './assets/icons/message_light.svg';
import IconMeLight from './assets/icons/dog_light.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getData, storeData, deleteData } from './app/components/dataManagement';
import IconPlus from './assets/icons/plus.svg'
import OnboardScreen from './app/screens/mainScreens/OnboardScreen';
import LoginScreen from './app/screens/mainScreens/LoginScreen';
import { Ionicons } from "@expo/vector-icons";


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const PostButton = ({ children, onPress }) => (
  <TouchableOpacity style={{ alignContent: 'center', justifyContent: 'center' }} onPress={onPress} >
    <View style={styles.postButtonView}>
      {children}
    </View>
  </TouchableOpacity>
)

function BottomTabs() {
  const [isLogged, setIsLogged] = useState(false);

  React.useEffect(() => {
    const checkLoginStatus = async () => {
      //Test only, for reloading onboarding
      deleteData('email')
      deleteData('userId')
      const email = await AsyncStorage.getItem('@email');
      try {
        if (email) {
          global.email = email;
          global.mode = await AsyncStorage.getItem('@mode');
          const id = await AsyncStorage.getItem('@userId');
          global.userId = id.replace('\"', '').replace('\"', '')
          global.profile = 'profiles/' + userId + '/profilepic.png';
          console.log(email + ', ' + global.mode + ', ' + global.userId)
          setIsLogged(true);
        }
        else {
          setIsLogged(false)
        }
      } catch (error) {
        // Handle error
      }
    };
    checkLoginStatus();
  }, []);

  return (
    <>
      {isLogged ? (
        <Tab.Navigator
          screenOptions={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarStyle: { height: '11.1%', }
          }}>
          <Tab.Screen name="HomeScreen" component={HomeScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <TabButton IconSVG={IconHomeLight} text={'Home'} focused={focused} margin={9} />
              ),
            }} />
          <Tab.Screen name="MapScreen" component={MapScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <TabButton IconSVG={IconMapLight} text={'Map'} focused={focused} margin={-23} />
              ),
            }} />
          <Tab.Screen name="PostingScreen" component={PostingScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <IconPlus width={30} height={30} />
              ),
              tabBarButton: (props) => (
                <PostButton {...props} />
              )
            }} />
          <Tab.Screen name="MessageScreen" component={MessageScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <TabButton IconSVG={IconMessageLight} text={'Messages'} focused={focused} margin={23} />
              ),
            }} />
          <Tab.Screen name="MeScreen" component={MeScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <TabButton IconSVG={IconMeLight} text={'Me'} focused={focused} margin={-9} />
              ),
            }} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerLeft: null,
            // gestureEnabled: false,
            headerShown: false
          }}>
          <Stack.Screen name="OnboardScreen" component={OnboardScreen} />
          <Stack.Screen name="LoginScreen">
            {(props) => <LoginScreen {...props} setIslogin={setIsLogged} />}
          </Stack.Screen>
        </Stack.Navigator>)}
    </>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="BottomTabs" component={BottomTabs} options={{ headerShown: false }} />
        <Stack.Screen
          name="ChatRoomScreen"
          component={ChatRoomScreen}
          options={({ navigation }) => ({
            // drawerItemStyle: { display: 'none' },
            // headerStyle: { backgroundColor: colors.white, },
            // headerTintColor: 'black',
            // headerTitleAlign: 'center',
            // headerTitle: () => (
            //   <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
            //     <Image source={images.icon_logo} style={styles.logo} />
            //     <Text style={styles.headerTitleStyle}>CarPass</Text>
            //   </View>
            // ),
            headerTitle: 'Chat Room',
            headerLeft: () => (
              <TouchableOpacity style={{ marginLeft: 12 }} onPress={() => { navigation.navigate('BottomTabs') }}>
                <Ionicons name="arrow-back-outline" size={28} />
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  postButtonView: {
    marginTop: 9,
    borderRadius: 56,
    backgroundColor: color.yellow,
    width: 56,
    height: 56,
  }
})
