import { View, Text, Pressable, Alert, Image } from 'react-native';
import React, { useState } from 'react';
import HeaderComponent from '../components/HeaderComponent';
import { HEIGHT, WIDTH } from '../constants/Dimension';
import { launchImageLibrary } from 'react-native-image-picker';
import TextInputComponent from '../components/TextInputComponent';

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
            gender: 'string',
        },
        primaryKey: '_id',
    };
}

const realmConfig = {
    schema: [Profile],
};

const ContactScreen = () => {
    const [profileData, setProfileData] = useState({
        username: '',
        email: '',
        phone: '',
        address: '',
        gender: 'Male',
        profileimage: null,
    });

    const onSubmit = () => {
        // Handle form submission, including profileData
    };

    const genderSelect = () => {
        const newGender = profileData.gender === 'Male' ? 'Female' : 'Male';
        setProfileData({ ...profileData, gender: newGender });
    };

    const profileSelect = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 200,
                maxWidth: 200,
            },
            (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else {
                    setProfileData({ ...profileData, profileimage: response.uri });
                }
            }
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <HeaderComponent title="Contact Us" />
            <View style={{ justifyContent: 'center', alignItems: 'center', margin: HEIGHT * 0.02 }}>
                <View style={{ borderWidth: 1, padding: HEIGHT * 0.06, borderRadius: HEIGHT, justifyContent: 'center', alignItems: 'center' }}>
                    {profileData.profileimage && <Image source={{ uri: profileData.profileimage }} style={{ width: 100, height: 100, borderRadius: 50 }} />}
                </View>
                <Pressable style={{ justifyContent: 'center', alignItems: 'center', marginTop: HEIGHT * 0.01 }} onPress={profileSelect}>
                    <Text style={{ fontSize: 16, color: '#2f779c' }}>Add profile picture</Text>
                </Pressable>

                {Object.entries(profileData).map(([key, value]) => (
                    <TextInputComponent
                        key={key}
                        value={value.toString()}
                        placeholder={`Enter ${key}`}
                        onChangeText={(text) => setProfileData({ ...profileData, [key]: text })}
                        style={{ borderWidth: 1, padding: WIDTH * 0.034, width: WIDTH * 0.85, marginTop: HEIGHT * 0.02, borderRadius: WIDTH * 0.02 }}
                    />
                ))}

                {/* Gender Toggle Switch */}
                <Text style={{ fontSize: 18, margin: HEIGHT * 0.01 }}>Gender</Text>
                <Pressable style={{ width: WIDTH * 0.8, flexDirection: 'row', borderRadius: WIDTH * 0.015, margin: HEIGHT * 0.02 }} onPress={genderSelect}>
                    <View style={{ flex: 0.5, borderWidth: 0.5, justifyContent: 'center', alignItems: 'center', padding: HEIGHT * 0.01, backgroundColor: profileData.gender === 'Male' ? '#8492e3' : '#FFFFFF' }}>
                        <Text style={{ color: profileData.gender === 'Male' ? '#FFFFFF' : '#000000' }}>Male</Text>
                    </View>
                    <View style={{ flex: 0.5, borderWidth: 0.5, justifyContent: 'center', alignItems: 'center', padding: HEIGHT * 0.01, backgroundColor: profileData.gender === 'Female' ? '#8492e3' : '#FFFFFF' }}>
                        <Text style={{ color: profileData.gender === 'Female' ? '#FFFFFF' : '#000000' }}>Female</Text>
                    </View>
                </Pressable>
                {/* Gender Toggle Switch */}
            </View>
            <Pressable style={{ padding: WIDTH * 0.03, width: WIDTH, borderRadius: WIDTH * 0, backgroundColor: '#4669b8', position: 'absolute', bottom: HEIGHT * 0, alignSelf: 'center' }} onPress={onSubmit}>
                <Text style={{ textAlign: 'center', color: '#FFFFFF' }}>Submit</Text>
            </Pressable>
        </View>
    );
};

export default ContactScreen;
