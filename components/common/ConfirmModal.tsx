import { Text, View } from 'react-native';
import ModalMessage from 'react-native-modal';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../constants/colors';
import { ResponseE } from '../../types/common.interface';
import Button from './Button';

interface ConfirmModalProps {
  isVisible: boolean;
  message: string;
  type?: ResponseE;
  className?: string;
  loading?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
}
const ConfirmModal = ({
  isVisible,
  message,
  type,
  className,
  loading,
  onClose,
  onConfirm,
}: ConfirmModalProps) => {
  return (
    <ModalMessage isVisible={isVisible}>
      <View
        className={
          `mx-auto w-[90%] items-center justify-center rounded-lg border border-slate-700 bg-background-600 py-6 ` +
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

        <Text className="px-4 pt-3 text-center text-lg font-semibold text-white ">{message}</Text>
        <View className="mt-6 flex-row gap-4 px-8">
          <View className="flex-1">
            <Button
              label="cancel"
              variant="outline"
              onPress={onClose}
              type={type}
              disabled={loading}
            />
          </View>
          <View className="flex-1">
            <Button label="confirm" onPress={onConfirm} type={type} isLoading={loading} />
          </View>
        </View>
      </View>
    </ModalMessage>
  );
};

export default ConfirmModal;
