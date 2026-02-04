import { Text, View } from 'react-native';
import ModalMessage from 'react-native-modal';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../constants/colors';
import { ResponseE } from '../../types/common.interface';

interface MessageModalProps {
  isVisible: boolean;
  message: string;
  type: ResponseE;
  className?: string;
}
const MessageModal = ({ isVisible, message, type, className }: MessageModalProps) => {
  return (
    <ModalMessage isVisible={isVisible}>
      <View
        className={
          `mx-auto w-[80%] items-center justify-center rounded-lg border border-slate-600 bg-background-600 py-6 ` +
          className
        }>
        <View className="item-center justify-center">
          {type === ResponseE.ERROR ? (
            <MaterialIcons name="error" size={80} color="red" />
          ) : type === ResponseE.SUCCESS ? (
            <Ionicons name="checkmark-circle-sharp" size={80} color="#10B981" />
          ) : (
            <MaterialCommunityIcons
              name="information-slab-circle"
              size={80}
              color={COLORS.PRIMARY}
            />
          )}
        </View>

        <Text className="pt-3 text-center text-white font-semibold text-lg ">{message}</Text>
      </View>
    </ModalMessage>
  );
};

export default MessageModal;
