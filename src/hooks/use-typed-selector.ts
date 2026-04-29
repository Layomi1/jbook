import { type TypedUseSelectorHook, useSelector } from "react-redux";
import { type RootState } from "../state/store";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
