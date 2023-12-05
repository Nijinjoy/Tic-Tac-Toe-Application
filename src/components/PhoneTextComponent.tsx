import { View, Text, TouchableOpacity, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import { WIDTH, HEIGHT } from '../constants/Dimension'
import { CountryPicker } from 'react-native-country-codes-picker'

const PhoneTextComponent = ({ profileData, setProfileData }) => {
    const [show, setShow] = useState(false);
    const value = profileData.countryCode || '';

    return (
        <View style={{ flexDirection: "row", borderWidth: 0.5, width: WIDTH * 0.8, padding: WIDTH * 0.02, borderRadius: WIDTH * 0.02, marginTop: HEIGHT * 0.02 }}>
            <TouchableOpacity onPress={() => setShow(true)}>
                <View >
                    <Text style={{ fontSize: 15 }}>{value}</Text>
                </View>
            </TouchableOpacity>
            <Pressable>
                {/* <CountryPicker
                    style={{ modal: { height: HEIGHT * 0.62, }, }}
                    onBackdropPress={() => setShow(false)}
                    show={show}
                    pickerButtonOnPress={(item) => {
                        setValue(item?.dial_code);
                        setShow(false);
                    }}
                /> */}
                <CountryPicker
                    style={{ modal: { height: HEIGHT * 0.62 } }}
                    onBackdropPress={() => setShow(false)}
                    show={show}
                    pickerButtonOnPress={(item) => {
                        setProfileData({
                            ...profileData,
                            countryCode: item?.dial_code,
                        });
                        setShow(false);
                    }}
                />
            </Pressable>
            <View>
                {/* <TextInput
                    value={profileData.phone}
                    onChangeText={(text) => setProfileData({ ...profileData, phone: text })}
                    keyboardType="numeric"
                    placeholder='Enter Phone Number'
                    style={{ fontSize: 15, marginHorizontal: WIDTH * 0.03 }}
                /> */}
                <TextInput
                    value={profileData.phone}
                    onChangeText={(text) => setProfileData({ ...profileData, phone: text })}
                    keyboardType="numeric"
                    placeholder='Enter Phone Number'
                    style={{ fontSize: 15, marginHorizontal: WIDTH * 0.03 }}
                />
            </View>
        </View>
    )
}

export default PhoneTextComponent
