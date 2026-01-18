import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import Button from '../common/Button';
import { isValidEmail } from '../../utils/helpers';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../constants/routes';

const LoginForm = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    responseError: '',
  });

  function resetErrors() {
    setErrors({
      email: '',
      password: '',
      responseError: '',
    });
  }

  const [isLoading, setIsLoading] = useState(false);
  async function handleSubmit() {
    resetErrors();
    if (!formData.email || (formData.email && !isValidEmail(formData.email))) {
      setErrors({
        ...errors,
        email: 'Enter a valid email',
      });
    }
    if (!formData.password) {
      setErrors({
        ...errors,
        password: 'Password is required',
      });
    }
    if (errors.email || errors.password) {
      return;
    }
    navigation.replace('dashboard');
    // make a post request
  }

  return (
    <View>
      <View>
        <Text className="text-gray-400">Email</Text>
        <TextInput
          value={formData.email}
          placeholder="Enter your email"
          className="mt-2 rounded-xl border border-slate-600 bg-background-500 px-4 py-4 text-white placeholder:text-gray-500"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          onChangeText={(event) => setFormData({ ...formData, email: event })}
        />
        {errors.email && <Text className="mt-1 text-xs text-red-600">{errors.email}</Text>}
      </View>
      <View className="mt-4">
        <Text className="text-gray-400">Password</Text>
        <View className="relative overflow-hidden">
          <TextInput
            value={formData.password}
            placeholder="Enter your password"
            secureTextEntry={!showPassword}
            className="mt-2 rounded-xl border border-slate-600 bg-background-500 px-4 py-4 text-white placeholder:text-gray-500"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="off"
            onChangeText={(event) => setFormData({ ...formData, password: event })}
          />
          <View className="absolute bottom-2 right-0.5 top-2.5 z-10 h-[80%] items-center justify-center rounded-r-2xl bg-background-500 pl-2 pr-3">
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <Feather name={showPassword ? 'eye-off' : 'eye'} size={22} color="#cccccc" />
            </Pressable>
          </View>
        </View>
        {errors.password && <Text className="mt-1 text-xs text-red-600">{errors.password}</Text>}
      </View>
      <View className="flex-row justify-end">
        <Button
          variant="link"
          label="Forgot Password?"
          className="mt-3 !px-0 !py-0"
          onPress={() => navigation.replace('forgot_password', { email: formData.email })}
        />
      </View>
      <View className="mt-6">
        <Button
          label="Login"
          isLoading={isLoading}
          disabled={!formData.email || !formData.password}
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
};

export default LoginForm;
