import React, { useRef, useState, useEffect } from "react";
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/pen/pen.png'
import { Task } from "./TasksList";

interface TasksItemProps {
    item: Task;
    index: number;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (taskId: number, taskNewTitle: string) => void;
}

export function TaskItem({ removeTask, toggleTaskDone, editTask, index, item }: TasksItemProps) {
    const [isEditing, setEditing] = useState(false);
    const [taskNewTitleValue, setTaskNewTitleValue] = useState(item.title);
    const textInputRef = useRef<TextInput>(null);

    function handleStartEditing() {
        setEditing(true);
    }

    function handleCancelEditing() {
        setTaskNewTitleValue(item.title);
        setEditing(false);
    }

    function handleSubmitEditing() {
        editTask(item.id, taskNewTitleValue);
        setEditing(false);
    }

    useEffect(() => {
        if (textInputRef.current) {
            if (isEditing) {
                textInputRef.current.focus();
            } else {
                textInputRef.current.blur();
            }
        }
    }, [isEditing])

    return <>
        <View>
            <TouchableOpacity
                testID={`button-${index}`}
                activeOpacity={0.7}
                style={styles.taskButton}
                onPress={() => toggleTaskDone(item.id)}
            >
                <View
                    testID={`marker-${index}`}
                    style={[
                        styles.taskMarker,
                        item.done && styles.taskMarkerDone
                    ]}
                >
                    {item.done && (
                        <Icon
                            name="check"
                            size={12}
                            color="#FFF"
                        />
                    )}
                </View>

                <TextInput
                    value={taskNewTitleValue}
                    onChangeText={setTaskNewTitleValue}
                    editable={isEditing}
                    onSubmitEditing={handleSubmitEditing}
                    ref={textInputRef}
                    style={item.done ? styles.taskTextDone : styles.taskText}
                >
                </TextInput>
            </TouchableOpacity>
        </View>

        <View style={styles.iconsContainer} >
            {isEditing ? (
                <TouchableOpacity
                    onPress={handleCancelEditing}
                >
                    <Icon name="x" size={24} color="#b2b2b2" />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    onPress={handleStartEditing}
                >
                    <Image source={editIcon} />
                </TouchableOpacity>
            )}

            <View
                style={styles.iconsDivider}
            />

            <TouchableOpacity
                disabled={isEditing}
                onPress={() => removeTask(item.id)}
            >
                <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
            </TouchableOpacity>
        </View>
    </>
}

const styles = StyleSheet.create({
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 15,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: "flex-end"
    },
    iconsDivider: {
        height: 24,
        width: 1,
        backgroundColor: '#C4C4C4',
        marginLeft: 12,
        marginRight: 12,
        opacity: 0.24,
        alignItems: 'center',
        borderWidth: 1
    }
})

