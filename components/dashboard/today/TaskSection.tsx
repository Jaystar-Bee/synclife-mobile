import { useState } from 'react';
import { FlatList, Modal, Text, View } from 'react-native';
import Button from '../../common/Button';
import EmptyTask from './EmptyTask';
import TaskForm from '../form/TaskForm';
import TaskCard from './TaskCard';

const TaskSection = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const data = [1,2,3];
  return (
    <View className="mt-6">
      <View className="flex-row items-center justify-between gap-4">
        <Text className="text-xl font-bold text-white">Today&apos;s Tasks</Text>
        <Button label="+ Add Task" variant="link" onPress={() => setShowTaskForm(true)} />
      </View>
      {/* <FlatList
        className="py-4"
        data={[1,2,3]}
        keyExtractor={(item) => item.toString()}
        renderItem={() => <TaskCard />}
        ItemSeparatorComponent={() => <View className="h-4" />}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={<EmptyTask />}
      /> */}
      {data?.length > 0 ? (
        data?.map((task) => <TaskCard key={task} data={task} />)
      ) : (
        <EmptyTask />
      )}

      <Modal visible={showTaskForm} animationType="fade" presentationStyle="formSheet">
        <View className="flex-1 bg-slate-800">
          <TaskForm closeModal={() => setShowTaskForm(false)} />
        </View>
      </Modal>
    </View>
  );
};

export default TaskSection;
