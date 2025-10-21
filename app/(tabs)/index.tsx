import { createSettingsStyles } from '@/assets/styles/settings.styles';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Progress, ProgressFilledTrack } from '@/components/ui/progress';
import { createHomeStyles } from '@/assets/styles/home.styles';

export default function Index() {
  const { colors } = useTheme();
  const styles = createSettingsStyles(colors);
  const hStyles = createHomeStyles(colors);

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
      <View style={homeStyles.progressContainer}>
        <View style={{ flex: 1, marginRight: 12 }}>
          <Progress value={50} size="md" orientation="horizontal">
            <ProgressFilledTrack className="bg-emerald-500" />
          </Progress>
        </View>

        <Text className="text-emerald-500" style={homeStyles.percentage}>
          50%
        </Text>
      </View>
      <View style={homeStyles.inputContainer}>
        {/* <Input */}
        {/*   variant="outline" */}
        {/*   size="xl" */}
        {/*   isDisabled={false} */}
        {/*   isInvalid={false} */}
        {/*   isReadOnly={false} */}
        {/*   style={{ flex: 1 }} */}
        {/* > */}
        {/*   <InputField placeholder="Enter Text here..." /> */}
        {/* </Input> */}
        <TextInput
          style={hStyles.input}
          placeholder="Enter todo here"
          placeholderTextColor={colors.textMuted}
        />
        <LinearGradient
          colors={colors.gradients.muted}
          style={hStyles.addButton}
        >
          <Ionicons name="add-outline" size={24} color={'#ffffff'} />
        </LinearGradient>
      </View>
      {/* <TouchableOpacity onPress={() => toggleDarkMode()}> */}
      {/*   <Text>Toggle Mode</Text> */}
      {/* </TouchableOpacity> */}
    </LinearGradient>
  );
}

const homeStyles = StyleSheet.create({
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  percentage: {
    fontSize: 18,
    fontWeight: '800',
    marginLeft: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: 20,
    gap: 20,
  },
});
