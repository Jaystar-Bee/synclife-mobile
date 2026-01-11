import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import Button from '../common/Button';
import { isValidEmail } from '../../utils/helpers';
import Feather from '@expo/vector-icons/Feather';
import OtpModal from './OtpModal';

const RegisterForm = () => {
  const route = useRoute();
  // @ts-ignore
  const { email } = route.params || { email: '' };
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  useEffect(() => {
    if (email) {
      setFormData({
        ...formData,
        email,
      });
    }
  }, [email, formData]);

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    responseError: '',
  });
  function resetErrors() {
    setErrors({
      name: '',
      email: '',
      password: '',
      responseError: '',
    });
  }

  const [isLoading, setIsLoading] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  function handleSubmit() {
    if (errors.email || errors.password || errors.name) {
      resetErrors();
    }
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
    if (!formData.name) {
      setErrors({
        ...errors,
        name: 'Name is required',
      });
    }
    if (
      errors.email ||
      errors.password ||
      errors.name ||
      !isValidEmail(formData.email) ||
      !formData.password ||
      !formData.name
    ) {
      return;
    }
    try {
      // setRequest
      setIsLoading(true);
      setTimeout(() => {
        setShowOtpModal(true);
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    } finally {
    }
  }
  return (
    <View>
      <View>
        <Text className="text-gray-400">Name</Text>
        <TextInput
          value={formData.name}
          placeholder="Enter your name"
          className="mt-2 rounded-xl border border-slate-600 bg-background-500 px-4 py-4 text-white placeholder:text-gray-500"
          autoCapitalize="words"
          autoComplete="name"
          autoCorrect={false}
          onChangeText={(event) => setFormData({ ...formData, name: event })}
        />
        {errors.name && <Text className="mt-1 text-xs text-red-600">{errors.name}</Text>}
      </View>
      <View className="mt-4">
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
      <View className="mt-6">
        <Button
          label="Register"
          isLoading={isLoading}
          disabled={!formData.email || !formData.password || !formData.name}
          onPress={handleSubmit}
        />
      </View>
      <OtpModal
        email={formData.email}
        name={formData.name}
        visible={showOtpModal}
        onClose={() => setShowOtpModal(false)}
      />
    </View>
  );
};

export default RegisterForm;
