import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { COLORS } from '../../constants/colors';
import StatSection from '../../components/dashboard/today/StatSection';
import HabitSection from '../../components/dashboard/today/HabitSection';
import TaskSection from '../../components/dashboard/today/TaskSection';

const TodayScreen = () => {
  return (
    <View className="flex-1" style={{ backgroundColor: COLORS.BACKGROUND }}>
      <ScrollView className="flex-1 px-4 py-6">
        <StatSection />
        <HabitSection />
        <TaskSection />
      </ScrollView>
    </View>
  );
};

export default TodayScreen;
