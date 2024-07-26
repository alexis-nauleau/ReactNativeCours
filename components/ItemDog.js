import { StyleSheet, Text, View } from "react-native";


/**
 * Component représentant un chien dans une liste de chien
 * @param {Dog} dog Le chien à afficher
 */
export default function ItemDog({dog, isSelected}) {
    return (
        <View style={{...styles.container, backgroundColor:isSelected?'skyblue':'white'}}>
            <Text style={styles.title}>{dog.name}</Text>
            <Text style={styles.subTitle}>{dog.breed}</Text>
            <Text style={styles.detail}>{new Date(dog.birthdate).toLocaleDateString()}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        padding: 20,
        margin: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'lightgray'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    subTitle: {
        fontSize: 15
    },
    detail: {
        textAlign:'right',
        color: 'darkgray'
    }
})