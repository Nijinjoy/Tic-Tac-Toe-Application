import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { HEIGHT, WIDTH } from '../constants/Dimension'

const HeaderComponent = (props) => {
    const { title, reset } = props
    return (
        <View style={{ height: HEIGHT * 0.08, backgroundColor: "#4636d9", flexDirection: "row" }}>
            <View style={{ flex: 0.25 }}>

            </View>
            <View style={{ marginTop: HEIGHT * 0.04, flex: 0.5 }}>
                <Text style={{ color: "#FFFFFF", textAlign: "center", fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
            </View>
            <Pressable style={{ marginTop: HEIGHT * 0.04, flex: 0.25, alignItems: "flex-end", marginRight: WIDTH * 0.05 }}>
                <Text style={{ color: "#FFFFFF", fontWeight: '600' }}>{reset}</Text>
            </Pressable>
        </View>
    )
}

export default HeaderComponent;