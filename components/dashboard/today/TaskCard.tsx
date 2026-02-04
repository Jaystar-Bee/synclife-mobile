import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Feather, MaterialIcons, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { ResponseE } from '../../../types/common.interface';
import ConfirmModal from '../../common/ConfirmModal';
import TaskForm from '../form/TaskForm';

interface TaskData {
  id?: string;
  title: string;
  description: string;
  time: string;
  category: string;
  subtasks?: number;
  priority: 'High' | 'Medium' | 'Low';
  isOverdue?: boolean;
  isNotSynced?: boolean;
  isCompleted?: boolean;
}

interface TaskCardProps {
  data: TaskData;
}

const TaskCard: React.FC<TaskCardProps> = ({ data }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmDetails, setConfirmDetails] = useState({
    isActive: false,
    type: ResponseE.DEFAULT,
    value: '',
    description: '',
  });

  const menuOptions = [
    {
      label: 'Edit Task',
      action: () => {
        setShowEditModal(true);
      },
    },
    {
      label: 'Delete Task',
      value: 'delete',
      action: () => {
        setConfirmDetails({
          isActive: true,
          type: ResponseE.ERROR,
          value: 'delete',
          description: 'Are you sure you want to delete this task?',
        });
      },
    },
    {
      label: 'Mark Completed',
      value: 'complete',
      action: () => {
        setConfirmDetails({
          isActive: true,
          type: ResponseE.SUCCESS,
          value: 'complete',
          description: 'Are you sure you want to mark this task as completed?',
        });
      },
    },
  ];

  const getPriorityPaint = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'border-red-500 bg-red-500/10';
      case 'Medium':
        return 'border-tertiary-500 bg-tertiary-500/10';
      case 'Low':
        return ' border-green-500 bg-green-500/10';
      default:
        return 'border-gray-500 bg-gray-500/10';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'text-red-500';
      case 'Medium':
        return 'text-tertiary-500';
      case 'Low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  // Hardcoded data for now
  const taskData = {
    id: '1',
    title: 'Review project proposal',
    description: 'Go through the Q4 project proposal and provide feedback',
    time: '10:30 AM',
    category: 'Work',
    subtasks: 3,
    priority: 'High' as const,
    isOverdue: true,
    isNotSynced: false,
    isCompleted: false,
  };

  async function handleConfirmation() {
    setIsLoading(true);
    try {
      // Handle the confirmation action based on the value
      if (confirmDetails.value === 'delete') {
        // Handle delete logic here
        console.log('Deleting task:', taskData.id);
      } else if (confirmDetails.value === 'complete') {
        // Handle complete logic here
        console.log('Marking task as completed:', taskData.id);
      }

      setConfirmDetails({
        isActive: false,
        type: ResponseE.DEFAULT,
        description: '',
        value: '',
      });
    } catch (error) {
      console.error('Error handling confirmation:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View className="mb-3 rounded-xl border border-gray-700 bg-slate-800 p-4">
      {/* Header with menu */}
      <View className="flex-row justify-between">
        <View className="flex-1">
          {/* Task title and checkbox */}

          <View className="flex-row items-start gap-3">
            <TouchableOpacity
              onPress={() => {
                setConfirmDetails({
                  isActive: true,
                  type: ResponseE.SUCCESS,
                  value: 'complete',
                  description: 'Are you sure you want to mark this task as completed?',
                });
              }}
              className={`mt-1 h-5 w-5 rounded-md border-2 ${
                taskData.isCompleted ? 'border-primary-500 bg-primary-500' : 'border-gray-500'
              } items-center justify-center`}>
              {taskData.isCompleted && <Feather name="check" size={12} color="white" />}
            </TouchableOpacity>

            <View className="flex-1">
              <Text
                className={`font-semibold text-white ${taskData.isCompleted ? 'line-through opacity-60' : ''}`}>
                {taskData.title}
              </Text>
              <Text
                className={`mt-1 text-sm text-gray-400 ${taskData.isCompleted ? 'line-through opacity-60' : ''}`}>
                {taskData.description}
              </Text>
            </View>
            <View
              className={`rounded-md border px-2 py-0.5 ${getPriorityPaint(taskData.priority)}`}>
              <Text className={`text-xs font-medium ${getPriorityColor(taskData.priority)}`}>
                {taskData.priority}
              </Text>
            </View>
            <Menu style={{ backgroundColor: '#1e293b', borderRadius: 100 }}>
              <MenuTrigger>
                <View className="rounded-full p-1">
                  <Feather name="more-vertical" size={16} color="#9ca3af" />
                </View>
              </MenuTrigger>
              <MenuOptions style={{ backgroundColor: '#1e293b' }}>
                {menuOptions.map((option, index) => (
                  <MenuOption key={index} onSelect={option.action}>
                    <View className="px-4 py-2">
                      <Text
                        className={`font-semibold text-white ${
                          option?.value === 'delete' ? 'text-red-500' : ''
                        }`}>
                        {option.label}
                      </Text>
                    </View>
                  </MenuOption>
                ))}
              </MenuOptions>
            </Menu>
          </View>

          {/* Time and category */}
          <View className="mt-3 flex-row flex-wrap  items-center gap-4">
            <View className="flex-row items-center gap-1">
              <Feather name="clock" size={14} color="#9ca3af" />
              <Text className="text-sm text-gray-400">{taskData.time}</Text>
            </View>
            <View className="flex-row items-center gap-1">
              <FontAwesome6 name="tag" size={14} color="#9ca3af" />
              <Text className="text-sm text-gray-400">{taskData.category}</Text>
            </View>
            <View className="flex-row items-center gap-1">
              <MaterialCommunityIcons name="source-branch" size={14} color="#9ca3af" />
              <Text className="text-sm text-gray-400">{taskData.subtasks} subtasks</Text>
            </View>
            <View className="flex-row items-center gap-1">
              <MaterialIcons name="sync-problem" size={14} color="#f59e0b" />
              <Text className="text-sm text-yellow-500">Not synced</Text>
            </View>
            <View className="flex-row items-center gap-1">
              <MaterialIcons name="error" size={14} color="#ef4444" />
              <Text className="text-sm text-red-500">Overdue</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Edit Modal */}
      <Modal visible={showEditModal} animationType="fade" presentationStyle="formSheet">
        <View className="flex-1 bg-slate-800">
          <TaskForm closeModal={() => setShowEditModal(false)} />
        </View>
      </Modal>

      {/* Confirmation Modal */}
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

export default TaskCard;
