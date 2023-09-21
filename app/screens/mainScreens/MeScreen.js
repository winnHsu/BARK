import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import nums from '../../constants/nums';
import colors from '../../constants/colors';
import ProfileCard from '../../components/cards/ProfileCard'
import StoryScreen from '../stackScreens/StoryScreen';
import IconButton from '../../components/buttons/IconButton';
import PostScreen from '../stackScreens/PostScreen';
import SavedScreen from '../stackScreens/SavedScreen';
import ReviewScreen from '../stackScreens/ReviewScreen';
import EditScreen from '../stackScreens/EditScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { doc, getDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig'
import { FIRESTORE_STORAGE } from '../../firebaseConfig'
import { ref, getDownloadURL } from 'firebase/storage';
import IconSmallSearch from '../../../assets/icons/small_search.svg'

const TopTab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function PersonalPostTabs() {
  return (
    <NavigationContainer independent={true}>
      <TopTab.Navigator
        initialRouteName="PostScreen"
        screenOptions={{
          tabBarIndicatorStyle: { width: 36, marginBottom: 9, backgroundColor: colors.ironGray, marginLeft: nums.wW / 2 - 98 },
          tabBarShowLabel: false,
          tabBarItemStyle: { width: 80 },
          tabBarStyle: { paddingLeft: nums.wW / 2 - 120, }
        }}>
        <TopTab.Screen name="PostScreen" component={PostScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Text style={[styles.topTabTitle, { color: focused ? 'black' : colors.ironGray, }]}>Post</Text>
            ),
          }} />
        <TopTab.Screen name="SavedScreen" component={SavedScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Text style={[styles.topTabTitle, { color: focused ? 'black' : colors.ironGray, }]}>Saved</Text>
            ),
          }} />
        <TopTab.Screen name="ReviewScreen" component={ReviewScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Text style={[styles.topTabTitle, { color: focused ? 'black' : colors.ironGray, }]}>Review</Text>
            ),
          }} />
      </TopTab.Navigator>
    </NavigationContainer >
  );
}

function InfoScreen({ navigation }) {
  const [profileUrl, setProfileUrl] = useState();
  const [profileData, setProfileData] = useState('');

  useEffect(() => {
    fetchData();
    fetchImage(global.profile);
  }, []);

  const fetchData = async () => {
    const docRef = doc(FIRESTORE_DB, 'users', global.userId);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProfileData(docSnap.data());
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };

  const fetchImage = async (imagePath) => {
    // Check if imagePath is not empty or undefined
    const imageRef = ref(FIRESTORE_STORAGE, imagePath);
    // Ensure the imageRef points to an actual file and not just the root
    const url = await getDownloadURL(imageRef);
    setProfileUrl(url);
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', }}>
      <IconButton
        IconSVG={IconSmallSearch}
        index={0}
        onPress={() => { navigation.navigate('CustomDrawer') }} />
      <IconButton
        IconSVG={IconSmallSearch}
        index={1}
        onPress={() => { navigation.navigate('StoryScreen') }} />
      <View style={styles.profileContainer}>
        <ProfileCard onPress={() => { navigation.navigate('EditScreen') }} profileData={profileData} profileUrl={profileUrl} />
      </View>
      <PersonalPostTabs />
    </View>
  )
}

function MeScreen({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="InfoScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CustomDrawer" component={StoryScreen} />
      <Stack.Screen name="InfoScreen" component={InfoScreen} />
      <Stack.Screen name="EditScreen" component={EditScreen} />
      <Stack.Screen name="StoryScreen" component={StoryScreen} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  profileContainer: {
    height: '43%',
    alignContent: 'center',
    justifyContent: 'center',
  },
  topTabTitle: {
    width: 80,
    fontSize: 18,
    alignSelf: 'center',
    textAlign: 'center'
  },
})

export default MeScreen;
