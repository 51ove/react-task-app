import './App.css'
import { appContainer, board, buttons } from './App.css'
import BoardList from './components/BoardList/BoardList'
import { useState } from 'react';
import ListContainer from './components/ListContainer/ListContainer';
import { useTypedSelector } from './hooks/redux';

function App() {
  const [activeBoardId,setActiveBoardId] = useState('board-0');

  const boards = useTypedSelector((state)=> state.boards.boardArray);

  const getActiveBoard = boards.filter(board => board.boardId === activeBoardId)[0] // active한(켜져있는) board의 객체
  const lists = getActiveBoard.lists; // board 객체에서 lists 부분만

  return (
    <div className={appContainer}>
      <BoardList 
        activeBoardId={activeBoardId} 
        setActiveBoardId={setActiveBoardId}
      />
      
      <div className={board}>
        <ListContainer lists = {lists} boardId = {getActiveBoard.boardId}></ListContainer>
      </div>

      <div>
        <button className={buttons}>
          이 게시판 삭제하기
        </button>
        <button>

        </button>
      </div>

    </div>
  )
}

export default App
