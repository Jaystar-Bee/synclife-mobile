import { createNativeBottomTabNavigator } from '@react-navigation/bottom-tabs/unstable';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TodayScreen from './screens/dashboard/TodayScreen';
import CalendarScreen from './screens/dashboard/CalendarScreen';
import InsightsScreen from './screens/dashboard/InsightsScreen';
import SettingsScreen from './screens/dashboard/SettingsScreen';
import { COLORS } from './constants/colors';
import { FontAwesome6, FontAwesome5, SimpleLineIcons } from '@expo/vector-icons';

import { getHeaderTitle } from '@react-navigation/elements';
import TheHeader from './components/common/TheHeader';

const DashboardApp = () => {
  const Tab = createBottomTabNavigator();
  // const Tab = createNativeBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.PRIMARY,
        tabBarInactiveTintColor: '#cccccc',
        headerStyle: { backgroundColor: COLORS.BACKGROUND },
        headerTitleStyle: { color: 'white' },
        header: ({ navigation, route, options }) => {
          const title = getHeaderTitle(options, route.name);
          return <TheHeader title={title} navigation={navigation} style={options.headerStyle} />;
        },

        tabBarStyle: { paddingTop: 10, paddingBottom: 10 },
        tabBarBackground: () => COLORS.BACKGROUND,
      }}>
      <Tab.Screen
        name="dashboardToday"
        component={TodayScreen}
        options={{
          title: 'Today',
          contentStyle: { backgroundColor: COLORS.BACKGROUND },
          tabBarIcon: ({ color }) => <FontAwesome6 name="list-check" size={20} color={color} />,
        }}
      />
      <Tab.Screen
        name="dashboardCalendar"
        component={CalendarScreen}
        options={{
          title: 'Calendar',
          tabBarIcon: ({ color }) => <FontAwesome6 name="calendar" size={20} color={color} />,
        }}
      />
      <Tab.Screen
        name="dashboardInsight"
        component={InsightsScreen}
        options={{
          title: 'Insight',
          tabBarIcon: ({ color }) => <FontAwesome5 name="chart-pie" size={20} color={color} />,
        }}
      />
      <Tab.Screen
        name="dashboardSettings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <SimpleLineIcons name="settings" size={20} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default DashboardApp;
