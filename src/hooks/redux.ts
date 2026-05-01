import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppState } from "../store/reducer";
import type { AppDispatch } from "../store/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
