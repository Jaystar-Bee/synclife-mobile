import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { COLORS } from '../../constants/colors';
import LoadingSpinner from './Loader';
import { ResponseE } from '../../types/common.interface';

interface ButtonProps {
  label?: string;
  onPress: () => void;
  isLoading?: boolean;
  className?: string;
  style?: any;
  textClassName?: string;
  variant?: 'outline' | 'ghost' | 'link' | 'solid';
  disabled?: boolean;
  children?: React.ReactNode;
  type?: ResponseE;
}
const Button = ({
  children,
  label,
  isLoading,
  className,
  style,
  onPress,
  variant = 'solid',
  disabled,
  textClassName,
  type = ResponseE.DEFAULT,
}: ButtonProps) => {
  return (
    <TouchableOpacity>
      <Pressable
        onPress={disabled || isLoading ? undefined : onPress}
        hitSlop={10}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
          transform: [{ scale: pressed ? 0.95 : 1 }],
        })}>
        <View
          className={`flex-row items-center justify-center rounded-xl px-6 py-4 ${variant === 'solid' ? `${type === ResponseE.ERROR ? 'bg-red-600' : type === ResponseE.SUCCESS ? 'bg-[#10B981]' : 'bg-primary'}` : variant === 'outline' ? `border ${type === ResponseE.DEFAULT ? 'border-primary' : type === ResponseE.SUCCESS ? 'border-[#10B981]' : 'border-red-600'} bg-transparent` : variant === 'ghost' ? `${type === ResponseE.ERROR ? 'bg-red-600/10' : type === ResponseE.SUCCESS ? 'bg-[#10B981]/10' : 'bg-primary/10'}` : 'bg-transparent'} ${disabled ? 'opacity-35' : ''}  ${className}`}
          style={style}>
          {isLoading ? (
            <LoadingSpinner>
              <AntDesign
                name="loading-3-quarters"
                size={16.5}
                color={variant === 'solid' || variant === 'ghost' ? 'white' : COLORS.PRIMARY}
              />
            </LoadingSpinner>
          ) : label ? (
            <Text
              className={`font-semibold ${variant === 'solid' || variant === 'ghost' ? 'text-white' : `${type === ResponseE.ERROR ? 'text-red-600' : type === ResponseE.SUCCESS ? 'text-[#10B981]' : 'text-primary'}`} ${textClassName}`}>
              {label}
            </Text>
          ) : (
            <Text>{children}</Text>
          )}
        </View>
      </Pressable>
    </TouchableOpacity>
  );
};

export default Button;
