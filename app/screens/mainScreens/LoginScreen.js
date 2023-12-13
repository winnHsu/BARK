import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, TextInput, Text, View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import images from '../../constants/images';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { storeData } from '../../../app/components/dataManagement';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import IconHomeLight from '../../../assets/icons/home_light.svg';
import colors from '../../constants/colors';
import nums from '../../constants/nums';

const LoginScreen = ({ setIslogin }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = FIREBASE_AUTH;

    useEffect(() => {
        if (loggedIn) {
            const timer = setTimeout(async () => {
                try {
                    setIslogin(true);
                } catch (error) {
                    // Handle error
                }
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [loggedIn]);

    if (loggedIn) {
        return (
            <View style={styles.barkContainer}>
                <Text style={styles.title}>BARK</Text>
            </View>
        );
    }

    const logIn = async () => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            const userId = response.user.uid;
            storeData(email, 'light', userId);
            setLoggedIn(true);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
        //Test Only
        // setLoggedIn(true);
    }

    const signUp = async () => {
        try {
            // const response = await createUserWithEmailAndPassword(auth, email, password);
            const response = await signInWithEmailAndPassword(auth, 'jess.lin.0621@gmail.com', '88888888');
            const userId = response.user.uid;
            storeData('jess.lin.0621@gmail.com', 'light', userId);
            setLoggedIn(true);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
        //Test Only
        // setLoggedIn(true);
    };

    return (
        <ImageBackground style={styles.mainContainer} source={images.bg_login}>
            <Text style={[styles.title, { marginTop: '25%' }]}>BARK</Text>
            <KeyboardAvoidingView style={[styles.container, { height: '46%', marginTop: '-3.5%' }]}>
                <TouchableOpacity style={styles.webAppTab} onPress={null}  >
                    <Text style={[styles.labelText, { color: colors.white }]}>Visit Our Web App!</Text>
                </TouchableOpacity>
                <View style={{ height: 1.8, width: '100%', backgroundColor: colors.gray, marginTop: '11%' }} />
                <Text style={styles.orText}>OR</Text>
                <View style={[styles.inputContainer, { marginTop: '9%' }]}>
                    <IconHomeLight width={24} height={24} />
                    <TextInput
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        style={styles.textInput}
                        placeholderTextColor={colors.ironGray}
                        placeholder="Username or email"
                        autoCapitalize='none'
                    />
                </View>
                <View style={[styles.inputContainer, { marginTop: '4%' }]}>
                    <IconHomeLight width={24} height={24} />
                    <TextInput
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                        style={styles.textInput}
                        placeholderTextColor={colors.ironGray}
                        placeholder="Passowrd"
                        maxLength={18}
                    />
                </View>
                <TouchableOpacity onPress={logIn} style={styles.loginBtn}>
                    <Text style={styles.loginText}>Log in</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={null} style={{ marginTop: '14%' }}>
                    {/* <Text style={[styles.labelText, { color: colors.ironGray }]}>Forgot password?</Text> */}
                    <Text style={[styles.labelText, { color: colors.ironGray, textAlign: 'center', paddingHorizontal: 15, marginTop: -30, color: colors.red }]}>
                        BARK's official launch is set for early 2024. This is just a test version — thanks for your patience! Please enjoy the app as a guest!
                    </Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
            <KeyboardAvoidingView style={[styles.container, { height: '12%', marginTop: '7.5%', justifyContent: 'center' }]}>
                {/* <TouchableOpacity onPress={signUp} style={{ marginTop: 15, flexDirection: 'row' }}>
                    <Text style={[styles.labelText, { color: colors.ironGray }]}>Ruff! Woof-woof!</Text>
                    <Text style={styles.labelText}>  Sign Up Now!</Text>
                </TouchableOpacity> */}
                <TouchableOpacity onPress={signUp} style={{ flexDirection: 'row' }}>
                    <Text style={[styles.labelText, { color: colors.ironGray }]}>Ruff! Woof-woof!</Text>
                    <Text style={styles.labelText}>  Enjoy the Visit!</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
};


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        alignItems: 'center',
    },
    container: {
        width: '83%',
        backgroundColor: colors.white,
        borderRadius: 25,
        alignItems: 'center',
    },
    labelText: {
        fontSize: nums.smallText,
        fontWeight: '500'
    },
    textInput: {
        fontSize: nums.smallText,
        fontWeight: '500',
        width: 300,
        color: colors.black,
        marginLeft: '6%'
    },
    inputContainer: {
        flexDirection: 'row',
        backgroundColor: colors.grayWhite,
        width: '100%',
        height: '9%',
        paddingHorizontal: '5%',
        alignItems: 'center'
    },
    loginBtn: {
        height: '11%',
        width: '87%',
        backgroundColor: colors.yellow,
        marginTop: '18%',
        borderRadius: 20,
        justifyContent: 'center'
    },
    loginText: {
        color: colors.black,
        fontSize: nums.mediumText,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    signupText: {
        textAlign: 'center',
        color: 'gray',
        fontSize: 16,
    },
    barkContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FDF266',
    },
    title: {
        fontSize: 66,
        marginBottom: '20.5%',
        fontWeight: '800',
        textAlign: 'center',
    },
    webAppTab: {
        height: '11%',
        width: '100%',
        flexDirection: 'row',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: colors.black,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    orText: {
        color: colors.ironGray,
        backgroundColor: colors.white,
        fontSize: nums.mediumText,
        fontWeight: '600',
        marginTop: -17,
        padding: 5,
    }
});

export default LoginScreen;