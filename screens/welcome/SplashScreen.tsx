import { useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('welcome');
    }, 3000);
  })
  return (
    <SafeAreaProvider>
      <View className="flex-1 items-center justify-center">
        <View>
          <Image
            source={require('../../assets/logos/logo-1024.png')}
            className="mx-auto h-28 w-28 rounded-2xl"
          />
          <Text className="mt-6 text-3xl font-black text-white text-center">SyncLife</Text>
          <Text className="mt-2 text-gray-400 text-center">Offline-First Productivity</Text>
          <Image source={require('../../assets/gifs/loading-white-dots.gif')} className="mx-auto mt-4" />
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default SplashScreen;
