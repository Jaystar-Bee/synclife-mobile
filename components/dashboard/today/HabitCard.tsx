import { Modal, Text, TouchableOpacity, View } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { useState } from 'react';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import HabitForm from '../form/HabitForm';
import ConfirmModal from '../../common/ConfirmModal';
import { ResponseE } from '../../../types/common.interface';

const HabitCard = () => {
  const [showEditHabit, setShowEditHabit] = useState(false);
  const [confirmDetails, setConfirmDetails] = useState({
    isActive: false,
    type: ResponseE.DEFAULT,
    value: '',
    description: '',
  });

  const options = [
    {
      label: 'Edit',
      action: () => {
        setShowEditHabit(true);
      },
    },
    {
      label: 'Delete',
      value: 'delete',
      action: () => {
        setConfirmDetails({
          isActive: true,
          type: ResponseE.ERROR,
          value: 'delete',
          description: 'Are you sure you want to delete this habit?',
        });
      },
    },
    {
      label: 'Mark Completed',
      action: () => {
        setConfirmDetails({
          isActive: true,
          type: ResponseE.SUCCESS,
          value: 'confirm',
          description: 'Are you sure you want to mark this habit as completed?',
        });
      },
    },
  ];

  const [isLoading, setIsLoading] = useState(false);
  async function handleConfirmation() {
    setIsLoading(true);
    try {
      setConfirmDetails({
        isActive: false,
        type: ResponseE.DEFAULT,
        description: '',
        value: '',
      });
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View className="h-60 w-44 rounded-2xl border border-gray-500 bg-slate-800">
      <View className="relative flex-row justify-end">
        <Menu style={{ backgroundColor: '#1e293b', borderRadius: 100 }}>
          <MenuTrigger>
            <View className="m-2 rounded-full bg-background-500 p-1.5">
              <Feather name="more-vertical" size={18} color="white" />
            </View>
          </MenuTrigger>
          <MenuOptions style={{ backgroundColor: '#1e293b' }}>
            {options.map((option, index) => (
              <MenuOption key={index} onSelect={option.action}>
                <View className="w-40 px-4 py-2 ">
                  <Text
                    className={`font-semibold text-white ${option?.value == 'delete' ? 'text-red-500' : ''}`}>
                    {option.label}
                  </Text>
                </View>
              </MenuOption>
            ))}
          </MenuOptions>
        </Menu>
      </View>

      <View className="flex-1 items-center justify-center">
        <View>
          <View className="items-center justify-center">
            <View className="h-16 w-16 items-center justify-center rounded-full border-[3px] border-gray-400 p-1"></View>

            {/* Stats */}

            <Text className="mt-4 truncate font-bold text-white">Hydration</Text>
            <Text className="mt-[2px] text-xs font-medium text-gray-400">Not Completed</Text>
          </View>

          {/* Bottom Progress/Info */}
          <View className="mt-5 flex-row items-center justify-center gap-1">
            <Feather name="clock" size={14} color="#fb923f" />
              <Text className="text-sm uppercase tracking-wider font-semibold text-center text-tertiary-500">12:30</Text>
          </View>
        </View>
      </View>
      <Modal visible={showEditHabit} animationType="fade" presentationStyle="formSheet">
        <View className="flex-1 bg-slate-800">
          <HabitForm closeModal={() => setShowEditHabit(false)} />
        </View>
      </Modal>
      <ConfirmModal
        isVisible={confirmDetails.isActive}
        message={confirmDetails.description}
        type={confirmDetails.type}
        loading={isLoading}
        onClose={() => setConfirmDetails((prev) => ({ ...prev, isActive: false }))}
        onConfirm={handleConfirmation}
      />
    </View>
  );
};

export default HabitCard;
