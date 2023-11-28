import { View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import HeaderComponent from '../components/HeaderComponent';
import { HEIGHT, WIDTH } from '../constants/Dimension';

const HomeScreen = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState("X");

    const handlePress = (index) => {
        if (!board[index]) {
            const newBoard = [...board];
            newBoard[index] = currentPlayer;
            setBoard(newBoard);
            setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <HeaderComponent />
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontWeight: "600", fontSize: 15, padding: HEIGHT * 0.02 }}>Welcome to Tic Tac Toe Game</Text>
                <View style={{ flexWrap: "wrap", flexDirection: 'row', justifyContent: "center", marginHorizontal: WIDTH * 0.2 }}>
                    {board.map((value, index) => (
                        <Pressable
                            key={index}
                            style={{ width: WIDTH * 0.16, height: HEIGHT * 0.09, borderWidth: 0.5, justifyContent: "center", alignItems: 'center', /* backgroundColor: "#9acfdb" */ }}
                            onPress={() => handlePress(index)}
                        >
                            <Text style={{ fontSize: 25, fontWeight: "bold" }}>{value}</Text>
                        </Pressable>
                    ))}
                </View>
                <Text style={{ fontSize: 18, margin: HEIGHT * 0.03 }}>Winner: {currentPlayer}</Text>
            </View>
        </View>
    );
};

export default HomeScreen;


import { View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import HeaderComponent from '../components/HeaderComponent';
import { HEIGHT, WIDTH } from '../constants/Dimension';

const HomeScreen = () => {
    const [board, setBoard] = useState(Array(9).fill(null));

    const [currentPlayer, setCurrentPlayer] = useState("X");

    const handlePress = (index) => {
        if (!board[index]) {
            const newBoard = [...board];
            newBoard[index] = currentPlayer;
            setBoard(newBoard);
            setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <HeaderComponent />
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontWeight: "600", fontSize: 15, padding: HEIGHT * 0.02 }}>Welcome to Tic Tac Toe Game</Text>
                <View style={{ flexWrap: "wrap", flexDirection: 'row', justifyContent: "center", marginHorizontal: WIDTH * 0.2 }}>
                    {board.map((value, index) => (
                        <Pressable
                            key={index}
                            style={{ width: WIDTH * 0.16, height: HEIGHT * 0.09, borderWidth: 0.5, justifyContent: "center", alignItems: 'center', backgroundColor: "#9acfdb" }}
                            onPress={() => handlePress(index)}
                        >
                            <Text style={{ fontSize: 25, fontWeight: "bold" }}>{value}</Text>
                        </Pressable>
                    ))}
                </View>
                <Text style={{ fontSize: 18, margin: HEIGHT * 0.03 }}>Winner: {currentPlayer}</Text>
                <Pressable style={{ borderWidth: 0, padding: WIDTH * 0.04, borderRadius: WIDTH * 0.02, backgroundColor: "#4dbf7c" }}>
                    <Text style={{ color: '#FFFFFF' }}>Start Game</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default HomeScreen;

