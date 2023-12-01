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

class Profile extends Realm.Object {
    static schema = {
        name: 'Profile',
        properties: {
            _id: 'objectId',
            profileImage: { type: 'string', default: '' },
            username: 'string',
            email: 'string',
            phone: 'string',
            address: 'string',
            gender: 'string'
        },
        primaryKey: '_id',
    }
}

const realmConfig = {
    schema: [Profile],
};

const ContactScreen = () => {
    const [profileData, setProfileData] = useState({ username: '', email: '', phone: '', address: '', profileImage: [], gender: 'Male' })
    const [validationErrors, setValidationErrors] = useState({});
    const [show, setShow] = useState(false);
    const [value, setValue] = useState('+974');

    console.log('profileDataas==>', profileData);

    useEffect(() => {
        Realm.open(realmConfig)
            .then((realm) => {
                const profile = realm.objects('Profile')[0];
                if (profile) {
                    setProfileData({
                        username: profile.username,
                        email: profile.email,
                        phone: profile.phone.toString(),
                        address: profile.address,
                        profileImage: profile.profileImage,
                        gender: profile.gender,
                    });
                    setGender(profile.gender);
                }
            })
            .catch((error) => {
                console.error('Error opening Realm:', error);
            });
    }, []);




    const genderSelect = () => {
        const newGender = profileData.gender === 'Male' ? 'Female' : 'Male';
        setProfileData({ ...profileData, gender: newGender });
    };

    const profileSelect = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 200,
            maxWidth: 1000,
        };

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
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };


    const onSubmit = useCallback(() => {
        if (validateInputs()) {
            console.log('profileData====>', profileData);
            Realm.open(realmConfig)
                .then((realm) => {
                    realm.write(() => {
                        const newProfileData = {
                            _id: new Realm.BSON.ObjectId(),
                            profileImage: profileData.profileImage || '',
                            username: profileData.username,
                            email: profileData.email,
                            phone: profileData.phone.toString(),
                            address: profileData.address,
                            gender: profileData.gender || 'Male',
                        };
                        realm.create('Profile', newProfileData, true);
                    });
                    Alert.alert('Success', 'Profile data submitted successfully');
                })
                .catch((error) => {
                    console.error('Error submitting profile data to Realm:', error);
                    Alert.alert('Error', 'Failed to submit profile data. Please try again. ' + error.message);
                });
        }
    }, [profileData]);


    return (
        <View style={{ flex: 1, }}>
            <HeaderComponent title="Contact Us" reset="Reset" />
            <View style={{ justifyContent: "center", alignItems: "center", margin: HEIGHT * 0.02 }}>

                <View style={{ borderWidth: 1, padding: HEIGHT * 0.005, borderRadius: HEIGHT, justifyContent: "center", alignItems: "center" }}>
                    <Image source={profileData.profileImage ? { uri: profileData.profileImage } : profile} style={{ width: WIDTH * 0.23, height: HEIGHT * 0.13, borderRadius: WIDTH }} />
                </View>

                < Pressable style={{ justifyContent: 'center', alignItems: 'center', marginTop: HEIGHT * 0.01 }} onPress={profileSelect}>
                    <Text style={{ fontSize: 16, color: '#2f779c' }}>Add profile picture</Text>
                </Pressable >

                <View style={{ marginTop: HEIGHT * 0.04 }}>
                    {
                        Object.entries(profileData).map(([key, value]) => {
                            if (key !== 'profileImage' && key !== 'gender' && key !== 'phone') {
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
                                )
                            }
                        })
                    }
                </View>

                <View style={{ flexDirection: 'row', borderWidth: 0.5, width: WIDTH * 0.8, padding: WIDTH * 0.02, borderRadius: WIDTH * 0.02, marginTop: HEIGHT * 0.02 }}>
                    <TouchableOpacity onPress={() => setShow(true)} >
                        <View >
                            <Text style={{ fontSize: 15 }}>{value}</Text>
                        </View>
                    </TouchableOpacity>
                    <Pressable>
                        <CountryPicker
                            style={{ modal: { height: HEIGHT * 0.62, }, }}
                            onBackdropPress={() => setShow(false)}
                            show={show}
                            pickerButtonOnPress={(item) => {
                                setValue(item?.dial_code);
                                setShow(false);
                            }}
                        />
                    </Pressable>
                    <View>
                        <TextInput
                            value={profileData.phone}
                            onChangeText={(text) => setProfileData({ ...profileData, phone: text })}
                            keyboardType="numeric"
                            placeholder='Enter Phone Number'
                            style={{ fontSize: 15, marginHorizontal: WIDTH * 0.03 }}
                        />
                    </View>
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