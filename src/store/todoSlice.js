import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("todoState");
    if (serializedState === null) {
      return {
        todos: [],
        loading: false,
        selectedTodo: null,
        showModal: false,
        showDeleteModal: false,
        expandItem: null,
        filter: {
          type: null,
          isDone: null,
          sortByDate: "desc",
        },
      };
    }
    const parsedState = JSON.parse(serializedState);
    return {
      ...parsedState,
      showModal: false,
      showDeleteModal: false,
      selectedTodo: null,
      expandItem: null,
      filter: {
        type: null,
        isDone: null,
        sortByDate: "desc",
      },
    };
  } catch (e) {
    console.error("Could not load state", e);
    return {
      todos: [],
      loading: false,
      selectedTodo: null,
      showModal: false,
      showDeleteModal: false,
      expandItem: null,
      filter: {
        type: null,
        isDone: null,
        sortByDate: "desc",
      },
    };
  }
};

const initialState = loadState();

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("todoState", serializedState);
  } catch (e) {
    console.error("Could not save state", e);
  }
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.showModal = !state.showModal;
      if (!state.showModal) {
        state.selectedTodo = null;
      }
    },

    toggleDeleteModal: (state) => {
      state.showDeleteModal = !state.showDeleteModal;
      if (!state.showDeleteModal) {
        state.selectedTodo = null;
      }
    },

    addNewTodo: (state, action) => {
      const newTodo = {
        ...action.payload,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        isDone: false,
      };
      state.todos.push(newTodo);
      saveState(state);
    },

    changeStatus: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.isDone = !todo.isDone;
        saveState(state);
      }
    },

    updateTodo: (state, action) => {
      const todoIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (todoIndex !== -1) {
        state.todos[todoIndex] = {
          ...state.todos[todoIndex],
          ...action.payload,
        };
        saveState(state);
      }
    },

    selectedTodo: (state, action) => {
      state.selectedTodo = action.payload;
    },

    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      saveState(state);
    },

    setFilter: (state, action) => {
      state.filter = action.payload;
    },

    setExpandItem: (state, action) => {
      state.expandItem = action.payload;
    },
  },
});

export const {
  toggleModal,
  addNewTodo,
  changeStatus,
  updateTodo,
  deleteTodo,
  selectedTodo,
  toggleDeleteModal,
  setFilter,
  setExpandItem,
} = todoSlice.actions;
export default todoSlice.reducer;
