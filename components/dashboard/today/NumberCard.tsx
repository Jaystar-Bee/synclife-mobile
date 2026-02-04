import React from 'react';
import { Text, View } from 'react-native';

interface NumberCardProps {
  count: number;
  title: string;
  color: string;
}

const NumberCard = ({ count, title, color }) => {
  return (
    <View className="flex-1 h-[70px] items-center justify-center rounded-2xl border border-gray-600 bg-slate-800">
      <Text className="text-center text-2xl font-bold" style={{ color: color }}>
        {count}
      </Text>
      <Text className="text-center text-gray-400 text-xs font-semibold">{title}</Text>
    </View>
  );
};

export default NumberCard;
