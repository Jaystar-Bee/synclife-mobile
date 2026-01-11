import { useState, useRef } from 'react';
import { View, Text, useWindowDimensions, ScrollView, Platform } from 'react-native';
import { COLORS } from '../../constants/colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../common/Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../constants/routes';

enum COLORFLOW {
  GRADIENT = 'GRADIENT',
  PLAIN = 'PLAIN',
}

const steps = [
  {
    title: 'Work Offline',
    description:
      "Create and manage tasks even without internet. Everything sync automatically when you're back online.",
    colorFlow: COLORFLOW.GRADIENT,
    from: COLORS.PRIMARY,
    to: COLORS.SECONDARY,
    icon: <FontAwesome name="cloud-download" size={40} color="white" />,
  },
  {
    title: 'Build Habits',
    description:
      'Track daily habits and build streaks. Visual progress keep you motivated every single day.',
    step: 2,
    colorFlow: COLORFLOW.GRADIENT,
    from: '#ea4335',
    to: '#ff793a',
    icon: <FontAwesome5 name="fire-alt" size={40} color="white" />,
  },
  {
    title: 'Track Progress',
    description:
      'Get Insights into your productivity patterns and see your growth over time with detailed analytics.',
    colorFlow: COLORFLOW.PLAIN,
    color: '#178411',
    icon: <FontAwesome6 name="chart-line" size={40} color="white" />,
  },
];

const WelcomeSection = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [currentStep, setCurrentStep] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const { width } = useWindowDimensions();

  function scrollTo(index: number) {
    scrollRef.current?.scrollTo({
      x: width * index,
      animated: true,
    });
  }
  function handleSkip() {
    navigation.replace('login');
  }
  return (
    <View style={{ flexDirection: 'column', flex: 1, alignItems: 'end', justifyContent: 'center' }}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        className="flex-1"
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentStep(index);
        }}>
        {steps.map((step, index) => (
          <View key={index} style={{ width: width }}>
            <View className="mx-auto w-[85%]">
              <LinearGradient
                key={index}
                style={{
                  borderRadius: 200,
                  width: 100,
                  height: 100,
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                colors={
                  step.colorFlow === COLORFLOW.GRADIENT
                    ? [step.from, step.to]
                    : [step.color, step.color]
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}>
                {step.icon}
              </LinearGradient>
              <View className="mt-6">
                <Text className="text-center text-3xl font-black text-white">{step.title}</Text>
                <Text className="mt-3 text-center text-gray-300">{step.description}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      {/* ACTIONS */}
      <View className="mx-4 mt-10">
        <View className="mx-auto flex-row items-center justify-center gap-4 duration-500">
          {steps.map((_, index) => (
            <View
              key={index}
              className={`h-2 rounded-full ${
                currentStep === index ? 'w-6 bg-primary' : 'w-2 bg-gray-500'
              }`}
            />
          ))}
        </View>
        <View className={`mt-8 ${Platform.OS === 'android' ? 'mb-4' : ''}`}>
          {currentStep === steps.length - 1 ? (
            <Button label="Get Started" className="py-5" onPress={handleSkip} />
          ) : (
            <>
              <Button label="Next" onPress={() => scrollTo(currentStep + 1)} />
              <Button label="Skip" variant="link" onPress={handleSkip} />
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default WelcomeSection;
