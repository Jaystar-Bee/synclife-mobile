// import { createNativeBottomTabNavigator } from '@react-navigation/bottom-tabs/unstable';
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
      id={'dashboard'}
      initialRouteName="dashboardToday"
      screenOptions={{
        tabBarActiveTintColor: COLORS.PRIMARY,
        tabBarInactiveTintColor: '#cccccc',
        headerStyle: { backgroundColor: COLORS.BACKGROUND },
        headerTitleStyle: { color: 'white' },
        header: (props) => {
          const title = getHeaderTitle(props?.options, props?.route.name);
          return <TheHeader title={title} {...props} style={props?.options.headerStyle as any} />;
        },

        tabBarStyle: { paddingTop: 10, paddingBottom: 10, backgroundColor: COLORS.BACKGROUND },
      }}>
      <Tab.Screen
        name="dashboardToday"
        component={TodayScreen}
        options={{
          title: 'Today',
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
