import React, { type FC } from 'react'
import List from '../List/List';
import ActionButton from '../ActionButton/ActionButton';
import { listsContainer } from './ListContainer.css';
import type { IList } from '../../types';

type TListContainerProps = {
  boardId: string;
  lists: IList[];
}
const ListContainer : FC<TListContainerProps> = (
  {
    lists,
    boardId
  }
) => {
  return (
    <div className={listsContainer}>
      {
        lists.map( list => (
          <List 
            key={list.listId} 
            list={list}
            boardId={boardId}
          />
        ))
      }
      <ActionButton
        boardId={boardId} 
        listId={""}
        list 
        // 값 없이 prop만 쓰면 자동으로 true (props 타입이 뭐든간에)
      />
    </div>
  )
}

export default ListContainer