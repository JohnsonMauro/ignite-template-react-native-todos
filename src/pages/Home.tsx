import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  function handleAddTask(newTaskTitle: string) {
    const taskExists = tasks.find((task) => task.title === newTaskTitle);

    if (taskExists) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );
    } else {
      const data = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      };
      setTasks((prevTask) => [...prevTask, data]);
    }
  }

  function handleToggleTaskDone(id: number) {
    let data = [...tasks];
    const objIndex = tasks.findIndex((obj) => obj.id === id);
    data[objIndex].done = !data[objIndex].done;
    setTasks(data);
  }
  function handleEditTask(taskId: number, taskNewTitle: string) {
    let data = [...tasks];
    const objIndex = tasks.findIndex((obj) => obj.id === taskId);
    data[objIndex].title = taskNewTitle;
    setTasks(data);
  }
  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => {
            const updatedTasks = tasks.filter((task) => task.id !== id);
            setTasks(updatedTasks);
          },
          style: "cancel",
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
