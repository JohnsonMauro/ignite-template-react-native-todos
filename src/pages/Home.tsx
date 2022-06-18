import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleEditTask(taskId:number, taskNewTitle:string) {
    setTasks(oldTasks =>
      oldTasks.map(task =>
        task.id === taskId ? { ...task, title: taskNewTitle } : task,
      ),
    );
  }

  function handleAddTask(newTaskTitle: string) {
    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    tasks.find(task => task.title === newTaskTitle)
      ? Alert.alert('Task já cadastrada', "Você não pode cadastrar uma task com o mesmo nome")
      : setTasks(oldTasks => [...oldTasks, data]);
  }

  function handleToggleTaskDone(id: number) {
    setTasks(oldTasks =>
      oldTasks.map(task =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não"
        },
        {
          text: "Sim", onPress: () => setTasks(oldTasks => oldTasks.filter(
            task => task.id !== id
          ))
        }
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})