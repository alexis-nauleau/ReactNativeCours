import { Link, router } from "expo-router";
import { Button, Text, View, StyleSheet, Pressable } from "react-native";
import Counter from "../components/Counter";
import { SafeAreaView } from "react-native-safe-area-context";



export default function index() {


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navBar}>
                <Pressable style={styles.Navbtn}
                    onPress={() => router.push('/todo')} >
                    <Text style={styles.text} >Todo List</Text>
                </Pressable>

                <Pressable style={styles.Navbtn}
                    onPress={() => router.push('/gesture')} >
                    <Text style={styles.text} >Gesture</Text>
                </Pressable>

                <Pressable style={styles.Navbtn}
                    onPress={() => router.push('/data-dog')} >
                    <Text style={styles.text} >Dog</Text>
                </Pressable>

                <Pressable style={styles.Navbtn}
                    onPress={() => router.push('/game')} >
                    <Text style={styles.text} >Jeux</Text>
                </Pressable>
            </View>

            <View style={{ width: '50%', marginTop: 50, marginStart: 100 }}>
                {/* Ici, on définit donc les fonctions qui seront déclenchés pour ce
                Counter spécifique, selon l'event */}
                <Counter
                    onBigNumberReached={() => console.log('wow this is doing numbers')}
                    onValueChange={(value) => console.log('counter value changed', value)} />
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: { 
        backgroundColor:'rgba(231, 233, 217, 0.71)',
    },
    navBar: {
        backgroundColor: 'red',
        display: 'flex',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        paddingStart: 20,
        paddingEnd: 30,
    },
    Navbtn: {
        borderColor: 'rgba(245, 241, 241, 0.71)',
        borderStyle:'solid',
        borderWidth:1,
        height: 40,
        display: "flex",
        justifyContent:'center',
        paddingStart:5,
        paddingEnd:5,
    },
    text: { color: 'white' },
})
