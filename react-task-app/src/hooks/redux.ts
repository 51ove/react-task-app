// redux를 위해 필요한 hooks

import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import type { AppDispatch, RootState } from "../store";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useTypedDispatch = () => useDispatch<AppDispatch>();
// const dispatch = useDispatch(); 대신에 hooks 만들기

// state 타입스크립트 추론 못하면 직접 지정해주기
// const logger = useSelector((state: RootState) => state.logger);


// TypedUseSelectorHook<> 가 하는 일

// interface obj<T> { // < >안에 나중에 넣을 타입 구멍 뚫어놓은것
//     name: T;
// }

// interface State {
//     state: {
//         data: string;
//         loading: boolean;
//     };
// }

// const obj: obj<State> = {
//     name: {
//         state: {
//             data: 'abcd',
//             loading: false
//         }
//     }
// }