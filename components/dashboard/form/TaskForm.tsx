import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from 'react';

interface TaskFormProps {
  closeModal: () => void;
}
const TaskForm = ({ closeModal }: TaskFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'PERSONAL',
    priority: 'LOW',
    date: '2025-01-20T10:00:00.000Z',
    labels: [],
    subTasks: [],
  });

  const [errors, setErrors] = useState({
    title: '',
    description: '',
    category: '',
    priority: '',
    date: '',
  });
  return (
    <View>
      <View className="flex-row items-center justify-between px-6 py-4">
        <Text className="text-xl font-bold text-[#c1c1c1]">Create Task</Text>
        <Pressable onPress={closeModal}>
          <MaterialCommunityIcons name="close-thick" size={24} color="#c1c1c1" />
        </Pressable>
      </View>
      <ScrollView className="flex-1">
        <View>
          <TextInput
            value={formData.title}
            placeholder="What needs to be done?"
            className="mt-2 rounded-xl border border-slate-600 bg-background-500 px-4 py-4 text-white placeholder:text-gray-500"
            keyboardType="email-address"
            autoCapitalize="sentences"
            autoCorrect={false}
            onChangeText={(event) => setFormData({ ...formData, title: event })}
          />
          {errors.title && <Text className="mt-1 text-xs text-red-600">{errors.title}</Text>}
        </View>
      </ScrollView>
    </View>
  );
};

export default TaskForm;
