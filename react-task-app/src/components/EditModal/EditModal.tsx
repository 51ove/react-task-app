import { useState, type ChangeEvent } from 'react'
import { FiX } from 'react-icons/fi'
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux'
import { deleteTask, setModalActive, updateTask } from '../../store/slices/boardSlice';
import { addLog } from '../../store/slices/loggerSlice';
import { v4 } from 'uuid';
import { buttons, closeButton, deleteButton, header, input, modalWindow, title, updateButton, wrapper } from './EditModal.css';

const EditModal = () => {

  const editingState = useTypedSelector(state => state.modal);
  const dispatch = useTypedDispatch();

  const [data, setData] = useState(editingState)

  const handleCloseButton = ()=>{
    dispatch(setModalActive(false));
  }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>)=>{
    setData({
      ...data,
      task: {
        ...data.task,
        taskName: e.target.value
      }
    })
  }
  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>)=>{
    setData({
      ...data,
      task: {
        ...data.task,
        taskDescription: e.target.value
      }
    })
  }
  const handleAuthorChange = (e: ChangeEvent<HTMLInputElement>)=>{
    setData({
      ...data,
      task: {
        ...data.task,
        taskOwner: e.target.value
      }
    })
  }

  const handleUpdate = ()=> {
    dispatch(
      updateTask({
        boardId: editingState.boardId, // list.tsx에서 task 클릭시 setModalData로 모달에 필요한 해당 보드,리스트 정보 설정해놓음 
        listId: editingState.listId,
        task:  data.task
      })
    )

    dispatch(
      addLog({
        logId: v4(),
        logMessage: `일 수정하기: ${editingState.task.taskName}`,
        logAuthor: 'User',
        logTimestamp: String(Date.now())
      })
    )

    dispatch(setModalActive(false))
  }

  const handleDelete = ()=>{
    dispatch(
      deleteTask({
        boardId: editingState.boardId,
        listId: editingState.listId,
        taskId: editingState.task.taskId
      })
    )

    dispatch(
      addLog({
        logId: v4(),
        logMessage: `일 삭제하기: ${editingState.task.taskName}`,
        logAuthor: 'User',
        logTimestamp: String(Date.now())
      })
    )

    dispatch(setModalActive(false))
  }

  return (
    <div className={wrapper}>
      <div className={modalWindow}>
        <div className={header}>
          <div className={title}>{editingState.task.taskName}</div>
          <FiX className={closeButton} onClick={handleCloseButton}/>         
        </div>

        <div className={title}>제목</div>
        <input
          className={input}
          type='text'
          value={data.task.taskName}
          onChange={handleNameChange}
        />

        <div className={title}>설명</div>
        <input
          type='text'
          value={data.task.taskDescription}
          onChange={handleDescriptionChange}
          className={input}
        />

        <div className={title}>생성한 사람</div>
        <input
          type='text'
          value={data.task.taskOwner}
          onChange={handleAuthorChange}
          className={input}
        />

        <div className={buttons}>
          <button onClick={handleUpdate} className={updateButton}>
            일 수정하기
          </button>
          <button onClick={handleDelete} className={deleteButton}>
            일 삭제하기
          </button>
        </div>

      </div>
    </div>
  )
}

export default EditModal