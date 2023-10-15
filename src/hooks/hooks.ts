import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootStore, AppDispatch } from "../redux/store";

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootStore> = useSelector
