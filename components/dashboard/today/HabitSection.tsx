import { useState } from 'react';
import { FlatList, Modal, Text, View } from 'react-native';
import Button from '../../common/Button';
import HabitForm from '../form/HabitForm';
import HabitCard from './HabitCard';

const HabitSection = () => {
  const [showHabitForm, setShowHabitForm] = useState(false);
  return (
    <View className="mt-6">
      <View className="flex-row items-center justify-between gap-4">
        <Text className="text-xl font-bold text-white">Today&apos;s Habit</Text>
        <Button label="+ Add Habit" variant="link" onPress={() => setShowHabitForm(true)} />
      </View>
      <FlatList
        horizontal
        className="px-4 py-4"
        data={[1, 2, 3]}
        keyExtractor={(item) => item.toString()}
        renderItem={() => <HabitCard />}
        ItemSeparatorComponent={() => <View className="w-4" />}
        showsHorizontalScrollIndicator={false}
      />

      <Modal visible={showHabitForm} animationType="fade" presentationStyle="formSheet">
        <View className="flex-1 bg-slate-800">
          <HabitForm closeModal={() => setShowHabitForm(false)} />
        </View>
      </Modal>
    </View>
  );
};

export default HabitSection;
