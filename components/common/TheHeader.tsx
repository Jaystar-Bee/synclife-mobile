import {
  Modal,
  Pressable,
  StyleProp,
  Text,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getDefaultHeaderHeight } from '@react-navigation/elements';
import moment from 'moment';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { ParamListBase } from '@react-navigation/native';
import Button from './Button';
import Foundation from '@expo/vector-icons/Foundation';
import { useEffect, useRef, useState } from 'react';
import { COLORS } from '../../constants/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import TaskForm from '../dashboard/form/TaskForm';
import HabitForm from '../dashboard/form/HabitForm';

interface TheHeaderProps {
  title: string;
  navigation: BottomTabNavigationProp<ParamListBase>;
  style?: any;
}

const TheHeader = ({ title, navigation, style }: TheHeaderProps) => {
  const insets = useSafeAreaInsets();
  const layout = useWindowDimensions();

  const today = moment().format('dddd, MMMM Do');
  const headerHeight = getDefaultHeaderHeight(layout, false, insets.top);

  const [showMore, setShowMore] = useState(false);

  // SHOW FORM

  const [showHabitForm, setShowHabitForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);

  useEffect(() => {
    if (showHabitForm || showTaskForm) {
      setShowFormModal(true);
    } else {
      setShowFormModal(false);
    }
  }, [showHabitForm, showTaskForm]);
  useEffect(() => {
    if (!showFormModal) {
      setShowHabitForm(false);
      setShowTaskForm(false);
    } else if (showMore) {
      setShowMore(false);
    }
  }, [showFormModal, showMore]);
  return (
    <View
      // @ts-ignore
      style={[
        {
          minHeight: headerHeight,
          paddingTop: insets.top,
          backgroundColor: style?.backgroundColor || 'black',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 15,
          paddingBottom: 10,
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderBottomColor: '#484848',
          elevation: 4,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 1.5,
        },
        style,
      ]}>
      <View>
        <Text className="text-2xl font-bold text-white">{title}</Text>
        <Text className="pt-2 text-[#c1c1c1]">{today}</Text>
      </View>
      <View className="flex-row items-center gap-4">
        <View className="flex-row items-center gap-3 rounded-full border border-gray-500 px-4 py-2.5">
          <View className={`h-3 w-3 rounded-full ${'bg-green-500'}`}></View>
          <Text className="text-sm text-white">Synced</Text>
        </View>

        <Button className="px-[15px] py-3" onPress={() => setShowMore(true)}>
          <Foundation name="plus" size={14} color="white" />{' '}
        </Button>
        <Modal transparent visible={showMore} animationType="fade">
          <Pressable className="flex-1 bg-black/10" onPress={() => setShowMore(false)} />

          <View
            className="absolute right-4 top-28 rounded-xl border border-gray-700 py-4 shadow-sm shadow-gray-500/50"
            style={{ backgroundColor: COLORS.BACKGROUND }}>
            <Pressable onPress={() => setShowTaskForm(true)}>
              <View className="w-40 flex-row items-center gap-2 px-4 pb-3 ">
                <Ionicons name="checkmark-circle" size={20} color={COLORS.PRIMARY} />
                <Text className="font-semibold text-white">Add Task</Text>
              </View>
            </Pressable>

            <View className="h-[1px] bg-gray-700" />

            <Pressable onPress={() => setShowHabitForm(true)}>
              <View className="w-40 flex-row items-center gap-2 px-4 pt-3 ">
                <FontAwesome5 name="fire-alt" size={20} color={COLORS.TERTIARY} />
                <Text className="font-semibold text-white">Add Habit</Text>
              </View>
            </Pressable>
          </View>
        </Modal>

        <Modal visible={showFormModal} animationType="fade" presentationStyle="formSheet" onRequestClose={()=> setShowFormModal(false)}>
          <View className="flex-1 bg-slate-800">
            {showHabitForm && <HabitForm closeModal={() => setShowHabitForm(false)} />}
            {showTaskForm && <TaskForm closeModal={() => setShowTaskForm(false)} />}
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default TheHeader;
