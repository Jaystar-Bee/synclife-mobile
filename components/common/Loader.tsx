import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

const LoadingSpinner = ({children}) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 2. Define the animation loop
    const rotation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 4,
        duration: 1000, // 1 second per rotation
        easing: Easing.linear, // Keeps the speed constant
        useNativeDriver: true, // Crucial for performance
      })
    );

    rotation.start();

    // Cleanup on unmount
    return () => rotation.stop();
  }, [rotateAnim]);

  // 3. Map the 0-1 value to degrees (0deg to 360deg)
  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    //@ts-ignore
    <Animated.View style={{ transform: [{ rotate: spin }] }}>
      {children}
    </Animated.View>
  );
};

export default LoadingSpinner;
