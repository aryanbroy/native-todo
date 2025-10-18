import useTheme from '@/hooks/useTheme';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Index() {
  const { toggleDarkMode } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Home page Niga</Text>
      <TouchableOpacity onPress={() => toggleDarkMode()}>
        <Text>Toggle Mode</Text>
      </TouchableOpacity>
    </View>
  );
}
