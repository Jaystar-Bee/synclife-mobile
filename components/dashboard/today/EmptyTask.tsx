import { Pressable, Text, View } from 'react-native';
import Feather from '@expo/vector-icons/Feather';


const EmptyTask = () => {
  return (
    <Pressable className="flex-1 items-center justify-center rounded-2xl border border-gray-500 px-5 py-6">
      <View>
        <Feather name="coffee" size={40} color="#ffedd5" className="text-center" />
        <Text className="text-xl font-bold text-white mt-2">You have no task</Text>
        <Text className="mt-1 font-medium text-gray-400">Today is a free day</Text>
      </View>
    </Pressable>
  );
};

export default EmptyTask;
