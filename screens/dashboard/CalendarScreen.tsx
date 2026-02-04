import {useState} from 'react'
import { View } from 'react-native'
import {Calendar, LocaleConfig} from 'react-native-calendars';
import { COLORS } from '../../constants/colors';


const CalendarScreen = () => {
    const [selectedDay, setSelectedDay] = useState('');
  return (
    <View className="flex-1" style={{ backgroundColor: COLORS.BACKGROUND }}>
      <View className='m-6 border border-gray-500 rounded-xl overflow-hidden'>

      <Calendar
      onDayPress={day => {
        setSelectedDay(day.dateString);
      }}
      markedDates={{
        [selectedDay]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
      }}

      theme={{
        
        calendarBackground: COLORS.BACKGROUND,
        textSectionTitleColor: '#ffffff',
        selectedDayBackgroundColor: COLORS.PRIMARY,
        selectedDayTextColor: '#ffffff',
        todayTextColor: COLORS.PRIMARY,
        dayTextColor: '#ffffff',
        textDisabledColor: '#dd99ee'
      }}
      />
      </View>
    </View>
  )
}

export default CalendarScreen