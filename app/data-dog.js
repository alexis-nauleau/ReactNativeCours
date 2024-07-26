import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Alert, Button, FlatList, Pressable, StyleSheet, Text, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ItemDog from "../components/ItemDog";
import { router } from 'expo-router';

export default function dataDog() {
    const [dogList, setDogList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState(94)
  

    const [showFloating, setShowFloating] = useState(false)
    const [selectedDogs, setSelectedDogs] = useState([])
    const list = useRef()
    /**
  * Le useEffect contient une fonction qui se lance au chargement du component puis
  * à chaque fois que la ou les variables du tableau en deuxième arguments changent,
  * si le tableau ne contient aucune variable, comme ici, alors le useEffect ne
  * se lancera qu'une fois et on s'en sert pour initialiser des choses, comme par exemple
  * un appel serveur
  */

    useEffect(() => {
        {/*on peut mettre que des usestate dedans*/ }
        fetchData();
    }, [page]);// se relance des que la variable page change. 

    async function fetchData() {
        try {
            setIsLoading(true);
            const response = await axios.get('https://bunny-relaxing-quickly.ngrok-free.app/api/dog', {
                headers: {
                    'ngrok-skip-browser-warning': 'true' //Nécessaire uniquement pasqu'on utilise ngrok pour "héberger" le serveur, dans 99.99% des cas, on a pas besoin de ça
                },
                params: { page }
            });
            setDogList([
                ...dogList,
                ...response.data
            ]);
            setIsLoading(false);
        } catch (error) {
            alert(error);
        }
    }

    function refreshHandle() {
        setPage(1);
        setDogList([]);
        fetchData();
    }

    function select(dog) {
        if (selectedDogs.includes(dog)) {
            setSelectedDogs(selectedDogs.filter(item => dog != item));
        } else {
            setSelectedDogs([
                ...selectedDogs,
                dog
            ]);
        }
    }

    async function deleteSelected() {
        try {
            for (let dog of selectedDogs) {
                await axios.delete(`https://bunny-relaxing-quickly.ngrok-free.app/api/dog/${dog.id}`);
            }
            setDogList(dogList.filter(dog => !selectedDogs.includes(dog)));
            setSelectedDogs([]);
            Alert.alert('supprimé')
        } catch (error) {
            alert(error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text>The Dog List, current page = {page}</Text>
          
            <Button title='back' onPress={() => router.back()} />
            {/* <Button onPress={() => setPage(page + 1)} title="Next Page" /> */}
            {/**si showFloating:true alors on affiche */}
            {showFloating &&
                <Pressable onPress={() => list.current.scrollToIndex({ index: 0 })}
                    style={styles.floatingButton}>
                    <Text style={{ color: 'white' }}>⤊</Text>
                </Pressable>
            }

            {selectedDogs.length > 0 &&
                <Pressable onPress={deleteSelected}
                    style={styles.deleteButton}>
                    <Text style={{ color: 'white' }}>X</Text>
                </Pressable>
            }

            <FlatList
                ref={list}
                style={{ width: '100%' }}
                refreshing={isLoading}
                onRefresh={refreshHandle}
                onScrollEndDrag={(event) => event.nativeEvent.contentOffset.y > 50 && setShowFloating(true)}
                onStartReached={() => setShowFloating(false)}
                onEndReached={() => setPage(page + 1)}
                data={dogList}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Pressable
                        onLongPress={() => select(item)}
                        onPress={() => selectedDogs.length > 0 && select(item)}
                    >
                        <ItemDog dog={item} isSelected={selectedDogs.includes(item)} />
                    </Pressable>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    floatingButton: {
        padding: 20,
        borderRadius: 100,
        backgroundColor: 'skyblue',
        fontSize: 20,
        fontWeight: 'bold',
        position: 'absolute',
        bottom: 10,
        right: 10,
        zIndex: 10
    },
    deleteButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        height: 50, width: 50,
        backgroundColor: 'red',
        position: 'absolute',
        bottom: 100,
        right: 30,
        zIndex: 10
    },

});
