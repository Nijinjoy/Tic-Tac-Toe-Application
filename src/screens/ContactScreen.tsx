import { View, Text, Pressable, TextInput, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import { HEIGHT, WIDTH } from '../constants/Dimension'
import { CountryPicker } from 'react-native-country-codes-picker'
import Realm from 'realm'
import TextInputComponent from '../components/TextInputComponent'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

class Profile extends Realm.Object {
    static schema = {
        name: 'Profile',
        properties: {
            _id: 'objectId',
            profileimage: 'string',
            username: 'string',
            email: 'string',
            phone: 'int',
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
    const [gender, setGender] = useState('Male');

    const onSubmit = () => {

    }

    const genderSelect = () => {
        const newGender = gender === 'Male' ? 'Female' : 'Male';
        setGender(newGender);
    }

    const profileSelect = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                maxHeight: HEIGHT * 0.1,
                includeBase64: false,
                maxWidth: WIDTH * 0.1,
            },
            (response) => {
                if (response.didCancel) {
                    console.log('User cancelled selecting image');
                } else if (response.error) {
                    console.log('Picker Error: ', response.error);
                } else {
                    setProfileData({ ...profileData, profileImage: response.uri })
                }
            }
        )
    }


    return (
        <View style={{ flex: 1, }}>
            <HeaderComponent title="Contact Us" />
            <View style={{ justifyContent: "center", alignItems: "center", margin: HEIGHT * 0.02 }}>
                <View style={{ borderWidth: 1, padding: HEIGHT * 0.06, borderRadius: HEIGHT, justifyContent: "center", alignItems: "center" }}>
                    {profileData.profileImage && <Image source={{ uri: profileData.profileImage }} style={{ width: WIDTH * 0.2, height: HEIGHT * 0.04, borderRadius: HEIGHT * 0.1 }} />}
                </View>
                < Pressable style={{ justifyContent: 'center', alignItems: 'center', marginTop: HEIGHT * 0.01 }} onPress={profileSelect}>
                    <Text style={{ fontSize: 16, color: '#2f779c' }}>Add profile picture</Text>
                </Pressable >

                {
                    Object.entries(profileData).map(([key, value]) => {
                        if (key !== 'profileImage' && key !== 'gender') {
                            return (
                                <TextInputComponent
                                    key={key}
                                    value={value}
                                    placeholder={`Enter ${key.replace()}`}
                                    onChangeText={(text) => setProfileData({ ...profileData, [key]: text })}
                                    style={{ borderWidth: 0.5, padding: WIDTH * 0.034, width: WIDTH * 0.85, marginTop: HEIGHT * 0.02, borderRadius: WIDTH * 0.02 }}
                                />
                            )
                        }
                    })
                }

                {/* Gender Toggle Switch */}
                <Text style={{ fontSize: 18, margin: HEIGHT * 0.01 }}>Gender</Text>
                <Pressable style={{ width: WIDTH * 0.8, flexDirection: 'row', margin: HEIGHT * 0.02 }} onPress={genderSelect}>
                    <View style={{ flex: 0.5, borderWidth: 0.5, justifyContent: "center", alignItems: "center", padding: HEIGHT * 0.01, backgroundColor: gender === 'Male' ? "#8492e3" : '#FFFFFF' }} >
                        <Text style={{ color: gender === 'Male' ? '#FFFFFF' : '#000000' }}>Male</Text>
                    </View>
                    <View style={{ flex: 0.5, borderWidth: 0.5, justifyContent: "center", alignItems: "center", padding: HEIGHT * 0.01, backgroundColor: gender === 'Female' ? "#8492e3" : '#FFFFFF' }}>
                        <Text style={{ color: gender === 'Female' ? '#FFFFFF' : '#000000' }}>Female</Text>
                    </View>
                </Pressable>
                {/* Gender Toggle Switch */}

            </View>
            <Pressable style={{ padding: WIDTH * 0.03, width: WIDTH, borderRadius: WIDTH * 0, backgroundColor: "#4669b8", position: 'absolute', bottom: HEIGHT * 0, alignSelf: 'center' }} onPress={onSubmit}>
                <Text style={{ textAlign: 'center', color: '#FFFFFF' }}>Submit</Text>
            </Pressable>
        </View>
    )
}

export default ContactScreen


