import { useState } from "react"
import { Button, Text, View } from "react-native";

/**
 * Les components React peuvent avoir des props 'event', en fait une props classique mais
 * qui au lieu de contenir une variable, contiendra une fonction qui sera passée par le
 * parent. Par convention on les fait commencer par on...
 * On pourra ensuite déclencher la fonction contenue dans ces props où on le souhaite dans
 * le code du component, ce qui permettra de "notifier" le parent que quelque chose s'est
 * produit. La tâche de dire que faire sur tel ou tel événement revient donc au parent.
 */
export default function Counter({onValueChange, onBigNumberReached}) {
    const [count,setCount] = useState(0);

    function changeValue(toAdd) {
        setCount(count+toAdd);
        onValueChange(count+toAdd);
        if(count+toAdd > 20) {
            onBigNumberReached();
        }
    }

    return (
        <View>
            <Button title="-" onPress={() => changeValue(-1)}></Button>
            <Text>{count}</Text>
            <Button title="+" onPress={() => changeValue(1)}></Button>

        </View>
    )
}