import { View, Text, Pressable, TextInput, Image, Alert, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import { HEIGHT, WIDTH } from '../constants/Dimension'
import { CountryPicker } from 'react-native-country-codes-picker'
import Realm from 'realm'
import TextInputComponent from '../components/TextInputComponent'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { profile } from '../assets/images'
import AsyncStorage from '@react-native-async-storage/async-storage'


const ContactScreen = () => {
    const [profileData, setProfileData] = useState({ username: '', email: '', address: '', profileImage: [], gender: 'Male', phone: "", countryCode: "+22" })
    const [validationErrors, setValidationErrors] = useState({});
    const [show, setShow] = useState(false);
    const navigation = useNavigation()

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('AnimationScreen')
        }, 2000);
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const savedProfileData = await AsyncStorage.getItem('profileData');
                if (savedProfileData) {
                    setProfileData(JSON.parse(savedProfileData));
                }
            } catch (error) {
                console.error('Error fetching data from AsyncStorage:', error);
            }
        };
        fetchData();
    }, []);

    const genderSelect = () => {
        const newGender = profileData.gender === 'Male' ? 'Female' : 'Male';
        setProfileData({ ...profileData, gender: newGender });
    };

    const profileSelect = (useCamera) => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 200,
            maxWidth: 1000,
        };
        const imagePicker = useCamera ? launchCamera : launchImageLibrary
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('Image picker error: ', response.error);
            } else {
                let imageUri = response.uri || response.assets?.[0]?.uri;
                setProfileData({ ...profileData, profileImage: imageUri });
            }
        });
    };


    const validateInputs = () => {
        const errors = {};
        if (!profileData.username) {
            errors.username = 'Username is required';
        } else if (profileData.username.length < 5) {
            errors.username = 'Username must be atleast 5 characters';
        }
        if (!profileData.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
            errors.email = 'Email is invalid.';
        }
        if (!profileData.phone) {
            errors.phone = 'Phone number is required';
        } else if (profileData.phone.length !== 10) {
            errors.phone = 'Phone number must have 10 digits'
        }
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };


    const onSubmit = useCallback(async () => {
        if (validateInputs()) {
            try {
                await AsyncStorage.setItem('profileData', JSON.stringify(profileData));
                Alert.alert('Success', 'Profile data submitted successfull');
            } catch (error) {
                console.error('Error submitting profile data to AsyncStorage:', error);
                Alert.alert('Error', 'Failed to submit profile data. Please try again. ' + error.message);
            }
        }
    }, [profileData]);

    const renderTextInput = (key, value) => {
        switch (key) {
            case 'profileImage':
            case 'gender':
                return null;
            case 'email':
            case 'username':
            case 'address':
                return (
                    <View key={key}>
                        <TextInputComponent
                            key={key}
                            value={value}
                            placeholder={`Enter ${key.replace()}`}
                            onChangeText={(text) => {
                                setProfileData({ ...profileData, [key]: text });
                                setValidationErrors((prevErrors) => {
                                    const newErrors = { ...prevErrors };
                                    delete newErrors[key];
                                    return newErrors;
                                });
                            }}
                            style={{ borderWidth: 0.5, padding: WIDTH * 0.034, width: WIDTH * 0.85, marginTop: HEIGHT * 0.02, borderRadius: WIDTH * 0.02 }}
                        />
                        {validationErrors[key] && (
                            <Text style={{ color: 'red', marginLeft: WIDTH * 0.04, fontSize: 14 }}>{validationErrors[key]}</Text>
                        )}
                    </View>
                );
            case 'phone':
                return (
                    <View>
                        <View key={key} style={{ flexDirection: "row", borderWidth: 0.5, padding: WIDTH * 0.03, width: WIDTH * 0.8, alignSelf: "center", borderRadius: WIDTH * 0.02 }}>
                            <TouchableOpacity onPress={() => setShow(true)}>
                                <View>
                                    <Text style={{ fontSize: 15 }}>{profileData?.countryCode}</Text>
                                </View>
                            </TouchableOpacity>
                            <CountryPicker
                                style={{ modal: { height: HEIGHT * 0.62 } }}
                                onBackdropPress={() => setShow(false)}
                                show={show}
                                pickerButtonOnPress={(item) => {
                                    setProfileData({ ...profileData, countryCode: item?.dial_code });
                                    setShow(false);
                                }}
                            />
                            <TextInput
                                value={profileData.phone}
                                onChangeText={(text) => {
                                    setProfileData({ ...profileData, phone: text });
                                    setValidationErrors((prevErrors) => {
                                        const newErrors = { ...prevErrors };
                                        delete newErrors['phone'];
                                        return newErrors;
                                    });
                                }}
                                keyboardType="numeric"
                                placeholder='Enter Phone Number'
                                style={{ fontSize: 15, marginHorizontal: WIDTH * 0.03 }}
                            />
                        </View>
                        {validationErrors.phone && (
                            <Text style={{ color: 'red', fontSize: 14, marginLeft: WIDTH * 0.04 }}>{validationErrors.phone}</Text>
                        )}
                    </View>
                );
        }
    };

    return (
        <View style={{ flex: 1, }}>
            <HeaderComponent title="Contact Us" />
            <View style={{ justifyContent: "center", alignItems: "center", margin: HEIGHT * 0.02 }}>

                <View style={{ borderWidth: 1, padding: HEIGHT * 0.005, borderRadius: HEIGHT, justifyContent: "center", alignItems: "center" }}>
                    <Image source={profileData.profileImage ? { uri: profileData.profileImage } : profile} style={{ width: WIDTH * 0.23, height: HEIGHT * 0.13, borderRadius: WIDTH }} />
                </View>

                < Pressable style={{ justifyContent: 'center', alignItems: 'center', marginTop: HEIGHT * 0.01 }} onPress={profileSelect}>
                    <Text style={{ fontSize: 16, color: '#2f779c' }}>Add profile picture</Text>
                </Pressable >

                <View style={{ marginTop: HEIGHT * 0.04 }}>
                    {Object.entries(profileData).map(([key, value]) => renderTextInput(key, value))}
                </View>
                {/* Gender Toggle Switch */}
                <Text style={{ fontSize: 18, margin: HEIGHT * 0.01 }}>Gender</Text>
                <Pressable style={{ width: WIDTH * 0.8, flexDirection: 'row', margin: HEIGHT * 0.02 }} onPress={genderSelect}>
                    <View style={{ flex: 0.5, borderWidth: 0.5, justifyContent: "center", alignItems: "center", padding: HEIGHT * 0.01, backgroundColor: profileData.gender === 'Male' ? "#8492e3" : '#FFFFFF' }} >
                        <Text style={{ color: profileData.gender === 'Male' ? '#FFFFFF' : '#000000' }}>Male</Text>
                    </View>
                    <View style={{ flex: 0.5, borderWidth: 0.5, justifyContent: "center", alignItems: "center", padding: HEIGHT * 0.01, backgroundColor: profileData.gender === 'Female' ? "#8492e3" : '#FFFFFF' }}>
                        <Text style={{ color: profileData.gender === 'Female' ? '#FFFFFF' : '#000000' }}>Female</Text>
                    </View>
                </Pressable>
                {/* Gender Toggle Switch */}

            </View>
            <Pressable style={{ padding: WIDTH * 0.03, width: WIDTH, borderRadius: WIDTH * 0, backgroundColor: "#4669b8", position: 'absolute', bottom: HEIGHT * 0, alignSelf: 'center' }} onPress={onSubmit}>
                <Text style={{ textAlign: 'center', color: '#FFFFFF' }}>Submit</Text>
            </Pressable>
        </View >
    )
}


export default ContactScreen

