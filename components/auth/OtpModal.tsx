import { useState, useEffect } from 'react';
import {
  BackHandler,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  View,
} from 'react-native';
import useCountdown from '../../hook/useCounter';
import Button from '../common/Button';
import { OtpInput } from 'react-native-otp-entry';
import { COLORS } from '../../constants/colors';

interface OtpModalProps {
  email: string;
  name: string;
  visible: boolean;
  onClose: () => void;
}

const OtpModal = ({ email, name, visible, onClose }: OtpModalProps) => {
  function handleOpenCheck() {
    if (!email) {
      onClose();
    }
  }
  const { time, restart, isFinished } = useCountdown(60);

  // OTP SENDING
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  async function handleVerify() {
    if (!otp) return;
    try {
      setIsLoading(true);
      // send request

      // log user in
      setTimeout(() => {
        setIsLoading(false);
      }, 6000);
    } catch (error) {
    } finally {
    }
  }

  // RESEND OTP
  const [isResending, setIsResending] = useState(false);
  async function handleResendOTP() {
    if (!email) return;
    try {
      setIsResending(true);
      // send request
      setTimeout(() => {
        setIsResending(false);
        restart();
      }, 1000);
    } catch (error) {
    } finally {
    }
  }

  // CLOSE MODAL
  function handleClose() {
    if (!isResending && !isLoading) {
      onClose();
    }
  }
  
  return (
    <Modal
      presentationStyle="formSheet"
      animationType="slide"
      onRequestClose={handleClose}
      visible={visible}
      onShow={() => {
        restart();
        handleOpenCheck();
      }}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View className="flex-1 items-center justify-center bg-background-500 px-6">
          <View>
            <Image
              source={require('./../../assets/logos/logo-1024.png')}
              className="mx-auto h-24 w-24 rounded-2xl"
            />
            <View className="mt-8">
              <Text className="text-center text-2xl font-bold text-white">Verify your email</Text>
              <Text className="mx-auto mt-2 max-w-[70%] text-center text-gray-400">
                Enter code we&apos;ve sent to your inbox {email}
              </Text>
              <View className="mt-14">
                <OtpInput
                  numberOfDigits={4}
                  focusColor={COLORS.PRIMARY}
                  type="numeric"
                  textInputProps={{
                    accessibilityLabel: 'One-Time Password',
                  }}
                  placeholder="****"
                  onTextChange={(text) => setOtp(text)}
                  theme={{
                    pinCodeTextStyle: {
                      color: 'white',
                    },
                  }}
                />
              </View>
            </View>

            <View className="mt-6 flex-row justify-center gap-1">
              <Text className="text-gray-400">Didn&apos;t get the code?</Text>
              <Button
                label={isFinished ? 'Resend it' : `Resend in (00:${time}s)`}
                variant="link"
                className="!px-0 !py-0"
                isLoading={isResending}
                onPress={handleResendOTP}
                disabled={isResending || !isFinished}
              />
            </View>
            <View className="mt-14">
              <Button
                label="Continue"
                isLoading={isLoading}
                disabled={!otp || isLoading}
                onPress={handleVerify}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default OtpModal;
