import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import { CategoryE, PriorityE } from '../../../types/task.interface';
import { capitalizeFirstLetter, getRandomNumber } from '../../../utils/helpers';
import Dropdown from '../../common/Dropdown';
import { COLORS } from '../../../constants/colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Button from '../../common/Button';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import MessageModal from '../../common/MessageModal';
import { ResponseE } from '../../../types/common.interface';

interface TaskFormProps {
  closeModal: () => void;
}
const colors = [COLORS.PRIMARY, COLORS.SECONDARY, COLORS.TERTIARY];
const categoryList = Object.values(CategoryE).map((category) => ({
  title: capitalizeFirstLetter(category),
  icon:
    category === CategoryE.WORK
      ? 'table-network'
      : category === CategoryE.FAMILY
        ? 'family-tree'
        : category === CategoryE.EDUCATION
          ? 'book-open-variant'
          : category === CategoryE.HEALTH
            ? 'heart-pulse'
            : category === CategoryE.SHOPPING
              ? 'cart'
              : category === CategoryE.TRAVEL
                ? 'airplane'
                : category === CategoryE.ENTERTAINMENT
                  ? 'movie'
                  : category === CategoryE.FINANCE
                    ? 'bank'
                    : category === CategoryE.PERSONAL
                      ? 'account'
                      : 'adjust',
  value: category,
  color: colors[getRandomNumber(0, colors.length - 1)],
}));
const priorityList = Object.values(PriorityE).map((priority) => ({
  title: capitalizeFirstLetter(priority),
  value: priority,
}));

const TaskForm = ({ closeModal }: TaskFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: CategoryE.PERSONAL,
    priority: PriorityE.MEDIUM,
    date: new Date(),
    labels: '',
    subTasks: [],
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateMode, setDateMode] = useState<'date' | 'time'>('date');
  function handleAddSubTask() {
    if (formData.subTasks.length >= 5) return;
    const lastSubtask = formData.subTasks[formData.subTasks.length - 1];
    if (lastSubtask) {
      if (!lastSubtask.name) {
        lastSubtask.error = 'Subtask name is required';
        setFormData((prev) => ({
          ...prev,
          subTasks: [...prev.subTasks],
        }));
        return;
      }
    }
    setFormData((prev) => ({
      ...prev,
      subTasks: [...prev.subTasks, { name: '', isCompleted: false, id: Date.now(), error: '' }],
    }));
  }
  function clearSubTaskErrors() {
    setFormData((prev) => ({
      ...prev,
      subTasks: prev.subTasks.map((subTask) => ({ ...subTask, error: '' })),
    }));
  }
  function handleDeleteSubTask(id: string) {
    setFormData((prev) => ({
      ...prev,
      subTasks: prev.subTasks.filter((subTask) => subTask.id !== id),
    }));
  }
  function onChangeDate(event, selectedDate) {
    // On Android, the picker closes itself after selection
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setFormData((prev) => ({ ...prev, date: selectedDate }));
    }
  }
  const [errors, setErrors] = useState({
    title: '',
    category: '',
    priority: '',
    date: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState({
    type: ResponseE.SUCCESS as ResponseE,
    message: 'I know what you are',
    isVisible: false,
  });
  async function handleSaveTask() {
    if (!formData.title) {
      setErrors((prev) => ({ ...prev, title: 'Title is required' }));
      return;
    }
    if (!formData.category) {
      setErrors((prev) => ({ ...prev, category: 'Category is required' }));
      return;
    }
    if (!formData.priority) {
      setErrors((prev) => ({ ...prev, priority: 'Priority is required' }));
      return;
    }
    // make a post request
    const cleanSubtasks = formData.subTasks.filter((subTask) => subTask.name);
    const uniqueSubtasks = [...new Map(cleanSubtasks.map((item) => [item.name, item])).values()];
    const payload = {
      title: formData.title,
      description: formData.description || null,
      category: formData.category,
      priority: formData.priority,
      date: formData.date,
      labels: formData.labels
        ? formData.labels.split(',')?.map((label) => ({ name: label }))
        : null,
      subTasks: uniqueSubtasks?.length ? uniqueSubtasks : null,
    };
    console.log(payload);
  }

  return (
    <View className="relative flex-1">
      <View className="flex-row items-center justify-between px-5 py-4">
        <Text className="text-xl font-bold text-[#c1c1c1]">Create Task</Text>
        <Pressable onPress={closeModal}>
          <MaterialCommunityIcons name="close-thick" size={24} color="#c1c1c1" />
        </Pressable>
      </View>
      <ScrollView className="flex-1 px-5">
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
          <Text className="mb-2 text-gray-400">Category</Text>
          <Dropdown
            items={categoryList}
            value={formData.category}
            onChange={(value: CategoryE) => {
              setFormData((prev) => ({ ...prev, category: value }));
              setErrors((prev) => ({ ...prev, category: '' }));
            }}
          />
          {errors.category && <Text className="mt-1 text-xs text-red-600">{errors.category}</Text>}
        </View>
        <View className="mt-5">
          <Text className="mb-2 text-gray-400">Priority</Text>
          <View className="flex-row rounded-xl border border-slate-600 bg-[#101725] p-1.5">
            {priorityList.map((level) => (
              <Pressable
                key={level?.title}
                onPress={() => setFormData((prev) => ({ ...prev, priority: level?.value }))}
                className={`flex-1 items-center justify-center rounded-lg py-2.5 ${
                  formData.priority === level?.value ? 'bg-slate-600' : 'bg-transparent'
                }`}>
                <Text
                  className={`font-medium ${
                    formData.priority === level?.value ? 'text-white' : 'text-slate-500'
                  }`}>
                  {level?.title}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
        <View className="mt-5">
          <Text className="mb-2 text-gray-400">Due Date & Time</Text>
          <View className="flex-row gap-4">
            {/* Date Input Mock */}
            <Pressable
              className="flex-1 flex-row items-center justify-between rounded-2xl border border-slate-600 bg-background-500 px-4 py-4"
              onPress={() => {
                setDateMode('date');
                setShowDatePicker(true);
              }}>
              <Text className={`${formData.date ? 'text-white' : 'text-gray-500'}`}>
                {formData.date ? moment(formData.date).format('MM/DD/YYYY') : 'mm/dd/yyyy'}
              </Text>
              <FontAwesome name="calendar" size={16} color="#718096" />
            </Pressable>

            {/* Time Input Mock */}
            <Pressable
              className="flex-1 flex-row items-center justify-between rounded-2xl border border-slate-600 bg-background-500 px-4 py-4"
              onPress={() => {
                setDateMode('time');
                setShowDatePicker(true);
              }}>
              <Text className={`${formData.date ? 'text-white' : 'text-gray-500'}`}>
                {formData.date ? moment(formData.date).format('hh:mm A') : '--:-- --'}
              </Text>
              <FontAwesome5 name="clock" size={16} color="#718096" />
            </Pressable>
          </View>
        </View>
        <View className="mt-5">
          <Text className="mb-2 text-gray-400">Tags (comma separated)</Text>
          <TextInput
            placeholder="work, urgent, meeting"
            placeholderTextColor="#4A5568"
            value={formData.labels}
            className="rounded-xl border border-slate-600 bg-background-500 px-4 py-4 text-white placeholder:text-gray-500"
            multiline
            numberOfLines={4}
            autoCorrect={false}
            onChangeText={(text: string) => setFormData((prev) => ({ ...prev, labels: text }))}
          />
        </View>
        <View className="mb-10 mt-5">
          <Text className="mb-2 text-gray-400">Subtasks</Text>
          {formData.subTasks.length > 0 && (
            <View>
              {formData.subTasks.map((subTask, index) => (
                <View key={index} className="mb-5">
                  <View className="flex-row items-center gap-2">
                    <TextInput
                      placeholder="Write subtask title"
                      value={subTask?.name}
                      placeholderTextColor="#4A5568"
                      className="mt-2 flex-1 rounded-xl border border-slate-600 bg-background-500 px-4 py-4 text-white placeholder:text-gray-500"
                      multiline
                      numberOfLines={3}
                      autoCorrect={false}
                      onChangeText={(text: string) => {
                        const updatedSubTasks = [...formData.subTasks];
                        updatedSubTasks[index] = { ...updatedSubTasks[index], name: text };
                        setFormData((prev) => ({ ...prev, subTasks: updatedSubTasks }));
                        clearSubTaskErrors();
                      }}
                    />
                    <TouchableOpacity>
                      <Pressable onPress={() => handleDeleteSubTask(subTask.id)}>
                        <MaterialIcons name="delete" size={24} color="red" />
                      </Pressable>
                    </TouchableOpacity>
                  </View>
                  {subTask.error && (
                    <Text className="mt-1 text-xs text-red-600">{subTask.error}</Text>
                  )}
                </View>
              ))}
            </View>
          )}
          <Pressable
            className="flex-row items-center justify-center rounded-xl border border-dashed border-slate-600 bg-background-500/50 py-4"
            onPress={handleAddSubTask}>
            <Text className="font-medium text-[#718096]">+ Add Subtask</Text>
          </Pressable>
        </View>

        <View className="mb-14">
          <Button label="Create" onPress={handleSaveTask} />
        </View>
      </ScrollView>

      <Modal transparent visible={showDatePicker} animationType="fade">
        <Pressable className="flex-1 bg-black/10" onPress={() => setShowDatePicker(false)} />
        <View className="absolute bottom-0 left-0 z-10 w-full bg-background-500 px-4 pb-6 pt-4">
          <View className="mx-auto w-fit">
            <DateTimePicker
              value={formData.date}
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

export default TaskForm;
