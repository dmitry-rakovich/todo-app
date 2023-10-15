import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { projectReducer } from "./slices/projectSlice";
import { taskReducer } from "./slices/taskSlice";
import { subTaskReducer} from "./slices/subTaskslice";
import { commentReducer } from "./slices/commentSlice";

const reducers = combineReducers({
    projects: projectReducer,
    tasks: taskReducer,
    subtasks: subTaskReducer,
    comments: commentReducer
})
const store = configureStore({
    reducer: reducers
})

export default store

export type RootStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch