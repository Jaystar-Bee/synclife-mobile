import { StyleSheet, Text, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../constants/colors';
import { useMemo } from 'react';

interface DropdownProps {
  items: { title: string; value: string, icon: string, color: string}[];
  value?: string;
  onChange?: (value: string) => void;
}

export default function Dropdown({ items, value, onChange }: DropdownProps) {
 const item = useMemo(() => {
  const result =  items.find((item) => item.value === value);
  return result 
 }, [items, value]);
 
  function handleSelect(item: { title: string; value: string, icon: string, color: string } | null) {
    if (onChange && item) {
      onChange(item?.value);
    }
  }
  return (
    <SelectDropdown
      data={items}
      defaultValue={item}
      onSelect={(selectedItem, index) => {
        handleSelect(selectedItem);
      }}
      renderButton={(selectedItem, isOpened) => {
        return (
          <View className="flex-row  items-center justify-between rounded-xl border border-slate-600 bg-background-500 px-5 py-4">
            {selectedItem && (
              <Icon
                name={selectedItem.icon}
                style={[
                  {
                    color: selectedItem?.color,
                  },
                  styles.dropdownItemIconStyle,
                ]}
              />
            )}
            <Text
              style={styles.dropdownButtonTxtStyle}
              className={`${selectedItem ? 'text-white' : 'text-gray-500'}`}>
              {(selectedItem && selectedItem.title) || 'Select your mood'}
            </Text>
            <Icon
              name={isOpened ? 'chevron-up' : 'chevron-down'}
              style={styles.dropdownButtonArrowStyle}
              color={selectedItem ? 'white' : '#6b7280'}
            />
          </View>
        );
      }}
      renderItem={(item, index, isSelected) => {
        return (
          <View
            style={{
              ...styles.dropdownItemStyle,
              ...(isSelected && { backgroundColor: '#D2D9DF' }),
            }}>
            <Icon
              name={item.icon}
              style={[
                {
                  color: item?.color,
                },
                styles.dropdownItemIconStyle,
              ]}
            />
            <Text
              style={[
                { color: isSelected ? COLORS.BACKGROUND : 'white' },
                styles.dropdownItemTxtStyle,
              ]}>
              {item.title}
            </Text>
            {isSelected && <Icon name="check" style={styles.dropdownItemIconStyle} />}
          </View>
        );
      }}
      showsVerticalScrollIndicator={false}
      dropdownStyle={styles.dropdownMenuStyle}
    />
  );
}

const styles = StyleSheet.create({
  dropdownButtonTxtStyle: {
    flex: 1,
  },
  dropdownButtonArrowStyle: {
    fontSize: 18,
  },
  dropdownMenuStyle: {
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: 12,
    borderWidth: 1,
    borderTopWidth: 1,
    borderColor: '#475569',
    paddingVertical: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  dropdownItemIconStyle: {
    fontSize: 16,
    marginRight: 8,
  },
});
