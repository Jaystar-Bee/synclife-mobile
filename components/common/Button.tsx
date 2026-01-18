import { Pressable, Text, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { COLORS } from '../../constants/colors';
import LoadingSpinner from './Loader';

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
}: ButtonProps) => {
  return (
    <Pressable
      onPress={disabled || isLoading ? undefined : onPress}
      hitSlop={10}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
        transform: [{ scale: pressed ? 0.95 : 1 }],
      })}>
      <View
        className={`flex-row items-center justify-center rounded-xl px-6 py-4 ${variant === 'solid' ? 'bg-primary' : variant === 'outline' ? 'border border-primary bg-transparent' : variant === 'ghost' ? 'bg-primary/10' : 'bg-transparent'} ${disabled ? 'opacity-35' : ''}  ${className}`} style={style}>
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
            className={`font-semibold ${variant === 'solid' || variant === 'ghost' ? 'text-white' : 'text-primary'} ${textClassName}`}>
            {label}
          </Text>
        ) : (
          children
        )}
      </View>
    </Pressable>
  );
};

export default Button;
