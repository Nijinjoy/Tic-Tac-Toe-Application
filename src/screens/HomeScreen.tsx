import { View, Text, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import { HEIGHT, WIDTH } from '../constants/Dimension'

const findWinner = (result) => {
    const possLines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ]
    for (let i = 0; i < possLines.length; i++) {
        const [a, b, c] = possLines[i]
        if (result[a] && result[a] === result[b] && result[b] === result[c]) {
            return result[a]
        }
    }
    return null;
}

const HomeScreen = () => {
    const [board, setBoard] = useState(Array(9).fill())
    const [currentPlayer, setCurrentPlayer] = useState("X")

    const handleSubmit = (index, value) => {
        if (!board[index]) {
            const newBoard = [...board]
            newBoard[index] = currentPlayer
            setBoard(newBoard)
            setCurrentPlayer(currentPlayer === "X" ? "O" : "X")
            const winner = findWinner(newBoard)
            if (winner) {
                Alert.alert(`Winner is ${winner}`)
            }
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <HeaderComponent />
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontWeight: "600", fontSize: 15, padding: HEIGHT * 0.02 }}>Welcome to Tic Tac Toe Game</Text>
                <View style={{ flexWrap: "wrap", flexDirection: 'row', justifyContent: "center", marginHorizontal: WIDTH * 0.2 }}>
                    {board.map((value, index) => (
                        <Pressable
                            key={index}
                            onPress={() => handleSubmit(index)}
                            style={{ width: WIDTH * 0.16, height: HEIGHT * 0.09, borderWidth: 0.5, justifyContent: "center", alignItems: 'center', backgroundColor: "#9acfdb" }}>
                            <Text style={{ fontSize: 25, fontWeight: "bold" }}>{value}</Text>
                        </Pressable>
                    ))
                    }
                </View>
                <Text style={{ fontSize: 18, margin: HEIGHT * 0.03 }}>The Winner is:{ }</Text>
            </View>
        </View>
    )
}

export default HomeScreen