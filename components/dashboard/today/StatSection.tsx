import React from 'react';
import { View } from 'react-native';
import NumberCard from './NumberCard';
import { COLORS } from '../../../constants/colors';

const StatSection = () => {
  return (
    <View className='flex-row gap-4 w-full'>
      <NumberCard count={2} title="Tasks" color="#ffffff" />
      <NumberCard count={1} title="Done" color="#10B981" />
      <NumberCard count={2} title="Habits" color={COLORS.TERTIARY} />
    </View>
  );
};

export default StatSection;
