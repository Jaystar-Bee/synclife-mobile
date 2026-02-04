import { Modal, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import Button from '../../common/Button';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import MessageModal from '../../common/MessageModal';
import { ResponseE } from '../../../types/common.interface';
import { HabitFrequency } from '../../../types/habit.interface';
import { capitalizeFirstLetter } from '../../../utils/helpers';

interface HabitFormProps {
  closeModal: () => void;
}

const frequencyList = Object.values(HabitFrequency).map((freq) => ({
  title: capitalizeFirstLetter(freq),
  value: freq,
}));
const daysMap = [
  { label: 'S', value: 0 },
  { label: 'M', value: 1 },
  { label: 'T', value: 2 },
  { label: 'W', value: 3 },
  { label: 'T', value: 4 },
  { label: 'F', value: 5 },
  { label: 'S', value: 6 },
];
const icons = [
  'heart-outline',
  'water-outline',
  'cafe-outline',
  'book-outline',
  'fitness-outline',
  'moon-outline',
];

// HABIT COMPONENT
const HabitForm = ({ closeModal }: HabitFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    frequency: HabitFrequency.WEEKLY,
    custom: [],
    icon: icons[0],
    reminderTime: new Date(),
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateMode, setDateMode] = useState<'date' | 'time'>('date');

  function onChangeDate(_, selectedDate) {
    // On Android, the picker closes itself after selection
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setFormData((prev) => ({ ...prev, date: selectedDate }));
    }
  }
  const [errors, setErrors] = useState({
    title: '',
    frequency: '',
    icon: '',
    custom: '',
  });

  const toggleDay = (dayValue: number) => {
    if (formData.custom.includes(dayValue)) {
      setFormData((prev) => ({ ...prev, custom: prev.custom.filter((day) => day !== dayValue) }));
    } else {
      setFormData((prev) => ({ ...prev, custom: [...prev.custom, dayValue] }));
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState({
    type: ResponseE.SUCCESS as ResponseE,
    message: 'I know what you are',
    isVisible: false,
  });
  async function handleSaveHabit() {
    if (!formData.title) {
      setErrors((prev) => ({ ...prev, title: 'Title is required' }));
      return;
    }
    if (!formData.frequency) {
      setErrors((prev) => ({ ...prev, frequency: 'Frequency is required' }));
      return;
    }
    if (!formData.icon) {
      setErrors((prev) => ({ ...prev, icon: 'Icon is required' }));
      return;
    }
    if (formData.frequency === HabitFrequency.CUSTOM && formData.custom.length == 0) {
      setErrors((prev) => ({ ...prev, custom: 'Select at least one day' }));
      return;
    }

    const payload = {
      title: formData.title,
      description: formData.description || null,
      frequency: formData.frequency,
      custom: formData.frequency === HabitFrequency.CUSTOM ? formData.custom?.sort() : null,
      reminderTime: formData.reminderTime ? moment(formData.reminderTime).format('HH:mm') : null,
    };
    console.log(payload);

    setIsLoading(true);
  }

  return (
    <View className="relative flex-1">
      <View className="flex-row items-center justify-between px-5 py-4">
        <Text className="text-xl font-bold text-[#c1c1c1]">Create Habit</Text>
        <Pressable onPress={closeModal}>
          <MaterialCommunityIcons name="close-thick" size={24} color="#c1c1c1" />
        </Pressable>
      </View>
      <View className="flex-1 px-5">
        <ScrollView className="flex-1">
          <View>
            <View>
              <TextInput
                value={formData.title}
                placeholder="What needs to be done?"
                className="mt-2 rounded-xl border border-slate-600 bg-background-500 px-4 py-4 text-white placeholder:text-gray-500"
                autoCapitalize="sentences"
                autoCorrect={false}
                onChangeText={(event) => {
                  setFormData((prev) => ({ ...prev, title: event }));
                  setErrors((prev) => ({ ...prev, title: '' }));
                }}
              />
              {errors.title && <Text className="mt-1 text-xs text-red-600">{errors.title}</Text>}
            </View>
            <View className="mt-5">
              <TextInput
                value={formData.description}
                placeholder="Description (optional)"
                className="mt-2 min-h-20 rounded-xl border border-slate-600 bg-background-500 px-4 py-4 leading-5 text-white placeholder:text-gray-500"
                autoCapitalize="sentences"
                multiline
                numberOfLines={4}
                autoCorrect={false}
                onChange={() => setErrors((prev) => ({ ...prev, description: '' }))}
                onChangeText={(event) => {
                  setFormData((prev) => ({ ...prev, description: event }));
                  setErrors((prev) => ({ ...prev, description: '' }));
                }}
              />
            </View>
            <View className="mt-5">
              <Text className="mb-2 text-gray-400 ">Icon</Text>
              <View className='flex-row rounded-xl border border-slate-600 bg-[#101725] p-1.5'>

              {icons.map((icon) => (
                <Pressable
                key={icon}
                  onPress={() => setFormData((prev) => ({ ...prev, icon: icon }))}
                  className={`flex-1 items-center justify-center rounded-lg py-2.5 ${
                    formData.icon === icon ? 'bg-slate-600' : 'bg-transparent'
                  }`}>
                  <Ionicons name={icon} size={17} color={formData.icon === icon ? '#fff' : '#c1c1c1'} />
                </Pressable>
              ))}
              </View>
              {errors.icon && <Text className="mt-1 text-xs text-red-600">{errors.icon}</Text>}
            </View>

            <View className="mt-5">
              <Text className="mb-2 text-gray-400">Frequency</Text>
              <View className="flex-row rounded-xl border border-slate-600 bg-[#101725] p-1.5">
                {frequencyList.map((level) => (
                  <Pressable
                    key={level?.title}
                    onPress={() => setFormData((prev) => ({ ...prev, frequency: level?.value }))}
                    className={`flex-1 items-center justify-center rounded-lg py-2.5 ${
                      formData.frequency === level?.value ? 'bg-slate-600' : 'bg-transparent'
                    }`}>
                    <Text
                      className={`font-medium ${
                        formData.frequency === level?.value ? 'text-white' : 'text-slate-500'
                      }`}>
                      {level?.title}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
            {formData.frequency === HabitFrequency.CUSTOM && (
              <>
                <View className="mt-5">
                  <Text className="mb-2 text-gray-400">Select Days</Text>
                  <View className="flex-row justify-between">
                    {daysMap.map((day) => (
                      <Pressable
                        key={day.value}
                        onPress={() => {
                          toggleDay(day.value);
                          setErrors((prev) => ({ ...prev, custom: '' }));
                        }}
                        className={`h-12 w-11 items-center justify-center rounded-xl border ${
                          formData.custom.includes(day.value)
                            ? 'border-[#5B67F0] bg-[#5B67F0]'
                            : 'border-[#2D3748] bg-[#101725]'
                        }`}>
                        <Text
                          className={`text-lg font-bold ${
                            formData.custom.includes(day.value) ? 'text-white' : 'text-[#718096]'
                          }`}>
                          {day.label}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </View>
                {errors.custom && (
                  <Text className="mt-1 text-xs text-red-600">{errors.custom}</Text>
                )}
              </>
            )}
            <View className="mb-10 mt-5">
              <Text className="mb-2 text-gray-400">Time</Text>
              <Pressable
                className="flex-row items-center justify-between rounded-2xl border border-slate-600 bg-background-500 px-4 py-4"
                onPress={() => {
                  setDateMode('time');
                  setShowDatePicker(true);
                }}>
                <Text className={`${formData.reminderTime ? 'text-white' : 'text-gray-500'}`}>
                  {formData.reminderTime
                    ? moment(formData.reminderTime).format('hh:mm A')
                    : '--:-- --'}
                </Text>
                <FontAwesome5 name="clock" size={16} color="#718096" />
              </Pressable>
            </View>
          </View>
        </ScrollView>
        <View className="mb-14">
          <Button label="Create" onPress={handleSaveHabit} />
        </View>
      </View>

      <Modal transparent visible={showDatePicker} animationType="fade">
        <Pressable className="flex-1 bg-black/10" onPress={() => setShowDatePicker(false)} />
        <View className="absolute bottom-0 left-0 z-10 w-full bg-background-500 px-4 pb-6 pt-4">
          <View className="mx-auto w-fit">
            <DateTimePicker
              value={formData.reminderTime}
              themeVariant="light"
              textColor="white"
              mode={dateMode}
              is24Hour={true}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onChangeDate}
            />
          </View>
          <View className="flex-row justify-end">
            <Button
              label="Ok"
              variant="link"
              isLoading={isLoading}
              onPress={() => setShowDatePicker(false)}
            />
          </View>
        </View>
      </Modal>
      <MessageModal
        isVisible={response.isVisible}
        message={response.message}
        type={response?.type}
      />
    </View>
  );
};

export default HabitForm;
