import { useEffect, useRef } from "react";
import { Alert, Text, View } from "react-native";
import Animated, { cancelAnimation, Easing, measure, runOnJS, runOnUI, SensorType, useAnimatedRef, useAnimatedSensor, useAnimatedStyle, useFrameCallback, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";


export default function game() {
    const top = useSharedValue(0);
    const rotation = useSharedValue(0);
    const left = useSharedValue(0);
    const losePosition = useSharedValue(-200);

    const rotationSensor = useAnimatedSensor(SensorType.ROTATION);

    const asteroidStyle = useAnimatedStyle(() => ({
        top: top.value + '%',
        left: left.value + '%',
        transform: [
            { rotate: rotation.value + 'deg' }
        ]
    }));

    const shipStyle = useAnimatedStyle(() => {
        let translateX = rotationSensor.sensor.value.roll * 150;
        if (translateX > 150) {
            translateX = 150;
        }
        if (translateX < -150) {
            translateX = -150;
        }
        return {
            transform: [{
                translateX
            }]
        }
    })

    useEffect(() => {
        top.value = withRepeat(withTiming(100, { duration: 3000, easing: Easing.linear }, () => {
            left.value = Math.floor(Math.random() * 85);
        }), -1);
        rotation.value = withRepeat(
            withTiming(45, {
                duration: 500,
                easing: Easing.linear
            }),
            withTiming(0, {
                duration: 500,
                easing: Easing.linear
            }),
            withTiming(-45, {
                duration: 500,
                easing: Easing.linear
            }),
            -1
        );

      
    }, []);

    const asteroidRef = useAnimatedRef();
    const shipRef = useAnimatedRef();


     useFrameCallback(() => {
        const asteroidMeasures = measure(asteroidRef);
        const shipMeasures = measure(shipRef);
        if(!asteroidMeasures || !shipMeasures) return;
        
        if (
            asteroidMeasures.pageX < shipMeasures.pageX + shipMeasures.width &&
            asteroidMeasures.pageX + asteroidMeasures.width > shipMeasures.pageX &&
            asteroidMeasures.pageY < shipMeasures.pageY + shipMeasures.height &&
            asteroidMeasures.pageY + asteroidMeasures.height > shipMeasures.pageY
          ) {
            cancelAnimation(top);
            cancelAnimation(left);
            cancelAnimation(rotation);
            // rotationSensor.unregister();
            losePosition.value = 10;
          }
    });


    return (
        <View style={{ height: '100%' }}>
            <Animated.Text style={{left:losePosition, top: 100, fontSize: 30}}>You Lose</Animated.Text>
            <Animated.Image ref={asteroidRef}
                style={[asteroidStyle, {backgroundColor: 'red',width:100,height:100}]}
                source={require('../assets/asteroid1.png')}
            />

            <Animated.Image ref={shipRef}
                style={[shipStyle, {
                    width: 100, height: 100,
                    top: '70%',
                    left: '40%',
                    backgroundColor: 'blue'
                }]}
                source={require('../assets/vaisseau-spatial.png')}
            />
        </View>
    )
}