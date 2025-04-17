import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeStatus,
  toggleDeleteModal,
  toggleModal,
  setExpandItem,
  deleteTodo,
  setSelectedTodo,
} from "../store/todoSlice";

export const useList = () => {
  const dispatch = useDispatch();
  const { todos, filter, expandItem, selectedTodo } = useSelector(
    (state) => state.todo
  );

  const ongoingTodoCount = useMemo(() => {
    return todos.filter((todo) => !todo.isDone).length;
  }, [todos]);

  const doneTodoCount = todos.length - ongoingTodoCount;

  const filteredTodos = useMemo(() => {
    return todos
      .filter((todo) => {
        if (filter.isDone !== null) {
          if (filter.isDone !== todo.isDone) {
            return false;
          }
        }

        if (filter.type !== null) {
          if (filter.type !== todo.type) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);

        if (filter.sortByDate === "asc") {
          return dateA - dateB;
        } else if (filter.sortByDate === "desc") {
          return dateB - dateA;
        }
      });
  }, [todos, filter]);

  const collapsePanel = () => {
    if (expandItem) {
      dispatch(setExpandItem(null));
    }
  };

  const handleChangeStatus = (id) => {
    collapsePanel();
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      const updatedTodo = { ...todo, isDone: !todo.isDone };
      dispatch(changeStatus(updatedTodo));
    }
  };

  const openDeleteModal = (id) => {
    collapsePanel();
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      dispatch(setSelectedTodo(todo));
      dispatch(toggleDeleteModal());
    }
  };

  const openEditModal = (id) => {
    collapsePanel();
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      dispatch(setSelectedTodo(todo));
      dispatch(toggleModal());
    }
  };

  const handleExpandItem = (id) => {
    dispatch(setExpandItem(expandItem === id ? null : id));
  };

  const handleDeleteTodo = () => {
    if (selectedTodo) {
      dispatch(deleteTodo(selectedTodo.id));
    }
  };

  return {
    filteredTodos,
    expandItem,
    doneTodoCount,
    totalTodoCount: todos.length,
    handleChangeStatus,
    openDeleteModal,
    openEditModal,
    handleExpandItem,
    selectedTodo,
    handleDeleteTodo,
  };
};
