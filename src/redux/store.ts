import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { projectReducer } from "./slices/projectSlice";
import { taskReducer } from "./slices/taskSlice";
import { subTaskReducer} from "./slices/subTaskslice";

const reducers = combineReducers({
    projects: projectReducer,
    tasks: taskReducer,
    subtasks: subTaskReducer
})
const store = configureStore({
    reducer: reducers
})

export default store

export type RootStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch