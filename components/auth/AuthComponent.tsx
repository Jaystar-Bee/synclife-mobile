import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import Button from '../common/Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface AuthProps {
  children: any;
  title: string;
  description: string;
  belowText?: string;
  linkText?: string;
  link?: string;
}
const AuthComponent = ({
  children,
  title = 'Welcome Back',
  description,
  belowText,
  linkText,
  link,
}: AuthProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        className="flex-1"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          paddingHorizontal: 20,
        }}>
        <View className="w-full">
          <Image
            source={require('../../assets/logos/logo-1024.png')}
            className="mx-auto h-24 w-24 rounded-2xl"
          />
          <View className="mt-4">
            <Text className="text-center text-3xl font-black text-white ">{title}</Text>
            <Text className="mt-2 text-center text-gray-400">{description}</Text>
          </View>
          <View className="mt-10 rounded-2xl border border-slate-500 bg-slate-800 px-6 py-6">
            {children}
          </View>
          {belowText && linkText && (
            <View className="mt-3 flex-row justify-center gap-1">
              {belowText && <Text className="text-sm text-slate-400">{belowText}</Text>}
              {linkText && (
                <Button
                  variant="link"
                  label={linkText}
                  className="!px-0 !py-0"
                  textClassName="text-sm"
                  onPress={() => navigation.replace(link)}
                />
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AuthComponent;
