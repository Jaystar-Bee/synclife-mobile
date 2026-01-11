import { Platform, View } from 'react-native';
import WelcomeSection from '../../components/welcome/WelcomeSection';
import { SafeAreaView } from 'react-native-safe-area-context';

const WelcomeScreen = () => {
  return (
    <SafeAreaView className="flex-1" style={{ paddingTop: Platform.OS === 'android' ? 40 : 20 }}>
      <View className="flex-1">
        <WelcomeSection step={1} />
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
