import { createSettingsStyles } from '@/assets/styles/settings.styles';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Progress, ProgressFilledTrack } from '@/components/ui/progress';
import { createHomeStyles } from '@/assets/styles/home.styles';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import LoadingComponent from '@/components/LoadingComponent';

interface Task {
  _id: string;
  text: string;
  isCompleted: boolean;
}

// const tasks: Task[] = [
//   { _id: 1, text: 'Learn Python', isCompleted: false },
//   { _id: 2, text: 'Subscribe to Codesistency', isCompleted: true },
//   { _id: 3, text: 'Learn React Native', isCompleted: false },
// ];

export default function Index() {
  const { colors } = useTheme();
  const styles = createSettingsStyles(colors);
  const hStyles = createHomeStyles(colors);
  const [todoInput, setTodoInput] = useState('');
  const addTodo = useMutation(api.todos.addTodos);
  const listTodos = useQuery(api.todos.getTodos);

  useEffect(() => {
    console.log(listTodos);
  }, [listTodos]);

  const onChangeTodoText = (text: string) => {
    setTodoInput(text);
  };

  const onSubmit = async () => {
    setTodoInput('');
    console.log(todoInput);
    try {
      const result = await addTodo({ text: todoInput });
      console.log('Added todo successfuly');
      console.log(result);
    } catch (error) {
      console.log('Error submitting todo: ', error);
    }
  };

  const renderItem = ({ item }: { item: Task }) => {
    return (
      <View style={hStyles.todoItemWrapper}>
        <LinearGradient
          colors={colors.gradients.surface}
          style={hStyles.todoItem}
        >
          <TouchableOpacity>
            <LinearGradient
              colors={
                item.isCompleted
                  ? colors.gradients.success
                  : colors.gradients.muted
              }
              style={[
                hStyles.checkboxInner,
                {
                  borderColor: item.isCompleted ? 'transparent' : colors.border,
                },
              ]}
            >
              {item.isCompleted && (
                <Ionicons name="checkmark" size={18} color="#fff" />
              )}
            </LinearGradient>
          </TouchableOpacity>
          <View style={hStyles.todoTextContainer}>
            <Text
              style={[
                hStyles.todoText,
                item.isCompleted && {
                  textDecorationLine: 'line-through',
                  color: colors.textMuted,
                  opacity: 0.6,
                },
              ]}
            >
              {item.text}
            </Text>
            <View style={hStyles.todoActions}>
              <TouchableOpacity activeOpacity={0.8}>
                <LinearGradient
                  colors={colors.gradients.warning}
                  style={hStyles.actionButton}
                >
                  <Ionicons name="pencil" size={14} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8}>
                <LinearGradient
                  colors={colors.gradients.danger}
                  style={hStyles.actionButton}
                >
                  <Ionicons name="trash" size={14} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  };

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
        <TextInput
          style={hStyles.input}
          placeholder="Enter todo here"
          placeholderTextColor={colors.textMuted}
          onChangeText={onChangeTodoText}
          value={todoInput}
        />
        <LinearGradient
          colors={colors.gradients.muted}
          style={hStyles.addButton}
        >
          <Ionicons
            name="add-outline"
            size={24}
            color={'#ffffff'}
            onPress={onSubmit}
          />
        </LinearGradient>
      </View>
      <FlatList
        style={hStyles.todoList}
        data={listTodos}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={hStyles.todoListContent}
        ListEmptyComponent={<LoadingComponent />}
      />
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
