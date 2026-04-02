import {createSlice, type PayloadAction} from "@reduxjs/toolkit"
import type { IBoard, IList, ITask } from "../../types";


type TBoardsState = {
    modalActive: boolean;
    boardArray: IBoard[]
}

type TAddBoardAction = {
    board: IBoard;
}

type TDleteListAction = {
    boardId: string;
    listId: string;
}

type TAddListAction = {
    boardId: string;
    list: IList;
}

type TAddTaskAction = {
    boardId: string;
    listId: string;
    task: ITask;
}

type TDeleteTaskAction = {
    boardId: string;
    listId: string;
    taskId: string;
}

type TDeleteBoardAction = {
    boardId: string;
}

type TSortAction = {
    boardIndex: number;
    droppableIdStart: string;
    droppableIdEnd: string;
    droppableIndexStart: number;
    droppableIndexEnd: number;
    draggableId: string; // 아이템 아이디 (==tasks 아이디)
}

const initialState : TBoardsState = {
    modalActive: false,
    boardArray: [
        {
            boardId : 'board-0',
            boardName: "첫 번째 게시물",
            lists: [
                {
                    listId: "list-0",
                    listName: "List 1",
                    tasks: [
                        {
                            taskId: "task-0",
                            taskName: "Task 1",
                            taskDescription: "Description",
                            taskOwner: "John"
                        },
                        {
                            taskId: "task-1",
                            taskName: "Task 2",
                            taskDescription: "Description",
                            taskOwner: "John"
                        }
                    ]
                },
                {
                    listId: "list-1",
                    listName: "List 2",
                    tasks: [
                        {
                            taskId: "task-3",
                            taskName: "Task 3",
                            taskDescription: "Description",
                            taskOwner: "John"
                        }
                    ]
                }
            ]
        }
    ]
}

const boardsSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {
        addBoard: (state, {payload}:PayloadAction<TAddBoardAction>)=>{
            state.boardArray.push(payload.board)
        },

        deleteBoard: (state, {payload}:PayloadAction<TDeleteBoardAction>)=>{
            state.boardArray = state.boardArray.filter(
                board => board.boardId !== payload.boardId
            )
            
        },

        addList: (state, {payload}: PayloadAction<TAddListAction>)=> {
            state.boardArray.map(board => 
                board.boardId === payload.boardId
                ? {...board, lists : board.lists.push(payload.list)}
                : board
            )
        },

        addTask: (state, {payload}: PayloadAction<TAddTaskAction>)=>{
            state.boardArray.map(board =>
                board.boardId === payload.boardId
                ? {
                    ...board,
                    lists: board.lists.map( list =>
                        list.listId === payload.listId
                        ? {
                            ...list,
                            tasks: list.tasks.push(payload.task)
                        }
                        : list
                    )
                }
                : board
            )
        },

        updateTask: (state, {payload}:PayloadAction<TAddTaskAction>)=>{
            state.boardArray =state.boardArray.map(board => 
                board.boardId === payload.boardId
                ?
                {
                    ...board,
                    lists: board.lists.map(list => 
                        list.listId === payload.listId
                        ?
                            {
                                ...list,
                                tasks: list.tasks.map(task => 
                                    task.taskId === payload.task.taskId
                                        ? payload.task
                                        : task
                                )
                            
                            }
                        :
                        list
                    )
                }
                :
                board
            )
        },

        deleteTask: (state, {payload}:PayloadAction<TDeleteTaskAction>) => {
            state.boardArray = state.boardArray.map(board => 
                board.boardId === payload.boardId
                ?
                {
                    ...board,
                    lists: board.lists.map(list =>
                        list.listId === payload.listId
                        ?
                        {
                            ...list,
                            tasks: list.tasks.filter(
                                task => task.taskId !== payload.taskId
                            )
                        }
                        :
                        list
                    )
                }
                :
                board
            )
        },

        deleteList: (state, {payload}:PayloadAction<TDleteListAction>)=>{
            state.boardArray = state.boardArray.map((board)=>(
                board.boardId === payload.boardId
                ?
                {
                    ...board,
                    lists: board.lists.filter(
                        list => list.listId !== payload.listId
                    // lists 부분만 재정의해서 덮어씌우기 (리스트 삭제)
                    )
                }
                :
                board
            ))
        },

        setModalActive: (state, {payload} : PayloadAction<boolean>) =>{
            state.modalActive = payload
        },

        sort : (state, {payload} : PayloadAction<TSortAction>) => {
            // 같은 리스트
            if(payload.droppableIdStart === payload.droppableIdEnd){
                // 시작점 리스트 담기
                const list = state.boardArray[payload.boardIndex].lists.find(
                    list => list.listId === payload.droppableIdStart
                )
                
                // 변경시키는 아이템을 배열에서 지워줌
                // 지워진 아이템을 배열로 리턴 받음
                const card = list?.tasks.splice(payload.droppableIndexStart, 1);

                // 지워진 아이템 (같은 리스트 다른 인덱스에) 넣어주기
                list?.tasks.splice(payload.droppableIndexEnd, 0, ...card!);
            }

            // 다른 리스트
            if(payload.droppableIdStart !== payload.droppableIdEnd) {
                // 시작점 리스트 담기
                const listStart = state.boardArray[payload.boardIndex].lists.find(
                    list => list.listId === payload.droppableIdStart
                )
                // 지워진 아이템
                const card = listStart?.tasks.splice(payload.droppableIndexStart,1);

                // 도착점 리스트 담기
                const listEnd = state.boardArray[payload.boardIndex].lists.find(
                    list => list.listId === payload.droppableIdEnd
                )

                // 도착점 리스트에 아이템 넣어주기
                listEnd?.tasks.splice(payload.droppableIndexEnd, 0, ...card!)
            }
        }


    }
})

export const {sort, addBoard,deleteBoard, deleteList, deleteTask, updateTask, setModalActive, addList, addTask} = boardsSlice.actions;
// boardsSlice.actions 안에는 액션 생성 함수들어있음
// Redux Toolkit에서는 reducers 안에 쓴 함수 이름을 기반으로 액션 생성함수를 자동으로 만들어줌
export const boardsReducer = boardsSlice.reducer; 