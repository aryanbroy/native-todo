import { createSettingsStyles } from '@/assets/styles/settings.styles';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Index() {
  const { toggleDarkMode, colors } = useTheme();
  const styles = createSettingsStyles(colors);

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={styles.container}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <LinearGradient
            colors={colors.gradients.primary}
            style={styles.iconContainer}
          >
            <Ionicons name="flash-outline" size={30} color={'#ffffff'} />
          </LinearGradient>
          <View>
            <Text style={styles.title}>Today&apos;s Task</Text>
            <Text style={styles.statLabel}>2 out of 4 completed</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={() => toggleDarkMode()}>
        <Text>Toggle Mode</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

// const styles = StyleSheet.create({
//   view: {
//     flex: 1,
//     // justifyContent: 'center',
//     // alignItems: 'center',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     // justifyContent: 'center',
//   },
//   heading: {
//     fontSize: 45,
//     fontWeight: 'bold',
//   },
// });
