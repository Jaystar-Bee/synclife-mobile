import { Pressable, ScrollView, Text, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface HabitFormProps {
    closeModal: () => void;
}
const HabitForm = ({closeModal}: HabitFormProps) => {
  return (
    <View>
      <View className='flex-row justify-between items-center px-6 py-4'>
        <Text className="text-[#c1c1c1] font-bold text-xl">Create Habit</Text>
        <Pressable onPress={closeModal}>
        <MaterialCommunityIcons name="close-thick" size={24} color="#c1c1c1" />
        </Pressable>
      </View>
      <ScrollView className="flex-1"></ScrollView>
    </View>
  );
};

export default HabitForm;
