import AsyncStorage from '@react-native-async-storage/async-storage';

// // Function to retrieve data with a given key
// const getData = async (key) => {
//     try {
//         const value = await AsyncStorage.getItem('@' + key);
//         if (value !== null) {
//             console.log(key + ': ', value);
//             return JSON.parse(value);
//         }
//         else {
//             console.log(key + ':', value);
//             return 'null';
//         }
//     } catch (error) {
//         console.error('Error retrieving data:', error);
//     }
// };

// Function to store new data with a given key
const storeData = async (email, mode, userId) => {
    try {
        await AsyncStorage.setItem('@email', JSON.stringify(email));
        await AsyncStorage.setItem('@mode', JSON.stringify(mode));
        await AsyncStorage.setItem('@userId', JSON.stringify(userId));
        global.email = email;
        global.mode = mode;
        global.userId = userId;
    } catch (error) {
        console.error('Error storing data:', error);
    }
};

// Function to delete data with a given key
const deleteData = async (key) => {
    try {
        await AsyncStorage.removeItem('@' + key);
        console.log('Data deleted successfully');
    } catch (error) {
        console.error('Error deleting data:', error);
    }
};

export { storeData, deleteData };