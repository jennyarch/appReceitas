import { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Logo from "../../components/logo";
import api from "../../services/api";
import { FoodList } from "../../components/foodList";

export default function Home(){
    const [inputValue, setInputValue] = useState("");
    const [foods, setFoods] = useState([]);

    function handleSearch(){
        console.log(inputValue)
    }

    // async function fetchApi(){
    //     console.log('entrou aqui')
    //     const response = await api.get("/foods")
    //     setFoods(response.data)

    //     console.log(foods)
    // }

    async function fetchApi(){
        await api.get("/foods")
        .then((response) => {
            setFoods(response.data)
        })
        .catch((error) => {
            console.log(error)
        })

    }

    useEffect(() => {
        
        fetchApi()


    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Logo/>

            <Text style={styles.title}>Encontre a receita</Text>
            <Text style={styles.title}>que combina com você</Text>

            <View style={styles.form}>
                <TextInput
                    placeholder="Digite o nome da comida..."
                    style={styles.input}
                    value={inputValue}
                    onChangeText={(text) => setInputValue(text)}
                />
                <TouchableOpacity onPress={handleSearch}>
                    <Ionicons name="search" size={28} color="#4CBE6C"/>
                </TouchableOpacity>
            </View>
            
            <FlatList
                data={foods}
                keyExtractor={(item) => String(item.id)}
                renderItem={({item}) => 
                    <FoodList data={item}/>
                }
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F9FF',
        paddingTop: 36,
        paddingStart: 14,
        paddingEnd: 14,

    },
    title:{
        fontSize: 26,
        fontWeight: "bold",
        color: "#0e0e0e"
    },
    form:{
        backgroundColor: '#fff',
        width: '100%',
        borderRadius: 8,
        marginTop: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ececec',
        paddingLeft: 8,
        paddingRight: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    input:{
        width: '90%',
        maxWidth: '90%',
        height: 54,

    }
})
