import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { WIDTH } from '../constants/Dimension'

const TextInputComponent = (props) => {
    const { value, onChangeText, placeholder, keyboardType } = props
    return (
        <View style={{ borderWidth: 0.5, padding: WIDTH * 0.025, borderRadius: WIDTH * 0.02, margin: 10, width: WIDTH * 0.8 }}>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                keyboardType={keyboardType}
            />
        </View>
    )
}

export default TextInputComponent
