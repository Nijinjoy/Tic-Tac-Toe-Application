import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { HEIGHT, WIDTH } from '../constants/Dimension'

const HeaderComponent = () => {
    return (
        <View style={{ height: HEIGHT * 0.1, backgroundColor: "#4636d9", flexDirection: "row" }}>
            <View style={{ flex: 0.4 }}>
                <Text></Text>
            </View>
            <View style={{ marginTop: HEIGHT * 0.05, flex: 0.6 }}>
                <Text style={{ color: "#FFFFFF", textAlign: "center", fontSize: 18, fontWeight: 'bold' }}>Tic Tac Toe</Text>
            </View>
            <Pressable style={{ marginTop: HEIGHT * 0.05, marginHorizontal: WIDTH * 0.05 }}>
                <Text style={{ color: "#FFFFFF", fontWeight: '600' }}>New Game</Text>
            </Pressable>
        </View>
    )
}

export default HeaderComponent