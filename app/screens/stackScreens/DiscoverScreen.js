import React, { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import links from '../../constants/links';
import colors from '../../constants/colors';
import PostCard from '../../components/cards/PostCard';
import { collection, getDocs } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig'
import { FIRESTORE_STORAGE } from '../../firebaseConfig'
import { ref, getDownloadURL } from 'firebase/storage';

function DiscoverScreen({ navigation }) {
  const [imageUrl, setImageUrl] = useState([]);
  const [profileUrl, setProfileUrl] = useState([]);
  const [rawPostData, setRawPostData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const fetchedData = [];
    const imageSetPromises = [];
    const profileSetPromises = [];
    try {
      const querySnapshot = await getDocs(collection(FIRESTORE_DB, links.testing_path));
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        if (docData.profileLink !== global.profile) {
          fetchedData.push(docData);
          imageSetPromises.push(fetchImage(docData.imageLink));
          profileSetPromises.push(fetchImage(docData.profileLink));
        }
      });
      // Wait for all fetchImage promises to resolve
      const resolvedImageSet = await Promise.all(imageSetPromises);
      const resolvedProfileSet = await Promise.all(profileSetPromises);
      // Update state
      setRawPostData(fetchedData);
      setImageUrl(resolvedImageSet);
      setProfileUrl(resolvedProfileSet);
      console.log("Total post number:", fetchedData.length);
    } catch (error) {
      console.error("Error fetching documents or images:", error);
    }
  };

  const fetchImage = async (imagePath) => {
    // Check if imagePath is not empty or undefined
    const imageRef = ref(FIRESTORE_STORAGE, imagePath);
    // Ensure the imageRef points to an actual file and not just the root
    const url = await getDownloadURL(imageRef);
    return url;
  };

  return (
    <View style={{ backgroundColor: 'white', height: 500 }}>
      {rawPostData.length > 0 ?
        <PostCard postData={rawPostData} postImages={imageUrl} profilePic={profileUrl} isHome={true}/> :
        <ActivityIndicator size="large" color={colors.darkYellow} style={{ marginTop: '10%' }} />
      }
    </View>
  );
}

export default DiscoverScreen;
