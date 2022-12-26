import { createContext, useContext, useState } from 'react';

const ADD_MESSAGE_COLOR = '#3d84b8';
const REGULAR_MESSAGE_COLOR = '#2b2e4a';
const ERROR_MESSAGE_COLOR = '#fb3640';

const ScoreCardContext = createContext({
  addmessages: [],
  querymessages: [],
  addtable_message: [],
  querytable_message: [],
  setAddTable_message: () => {},
  setQueryTable_message: () => {},
  addCardMessage: () => {},
  addErrorMessage: () => {},
  clearMessage: () => {},
});

const makeMessage = (message, color) => {
  return { message, color };
};

const ScoreCardProvider = (props) => {
  const [addmessages, setAddMessages] = useState([]);
  const [querymessages, setQueryMessages] = useState([]);
  const [addtable_messages,setAddTable_messages] =useState([]);
  const [querytable_messages,setQueryTable_messages] =useState([]);
  const setAddTable_message = (message) => {
    setAddTable_messages(message);
  }

  const setQueryTable_message = (message) => {
    setQueryTable_messages(message);
  }

  const addCardMessage = (message) => {
    setAddMessages([...addmessages, makeMessage(message, ADD_MESSAGE_COLOR)]);
  };

  const addErrorMessage = (message,type) => {
    if(type==='add')
      setAddMessages([...addmessages, makeMessage(message, ERROR_MESSAGE_COLOR)]);
    else if(type==='query')
      setQueryMessages([...querymessages, makeMessage(message, ERROR_MESSAGE_COLOR)]);
  };

  const clearMessage = (message) => {
    setAddMessages([makeMessage(message, REGULAR_MESSAGE_COLOR)]);
    setQueryMessages([makeMessage(message, REGULAR_MESSAGE_COLOR)]);
  };

  return (
    <ScoreCardContext.Provider
      value={{
        addmessages,
        querymessages,
        addtable_messages,
        querytable_messages,
        setAddTable_message,
        setQueryTable_message,
        addCardMessage,
        addErrorMessage,
        clearMessage,
      }}
      {...props}
    />
  );
};

function useScoreCard() {
  return useContext(ScoreCardContext);
}

export { ScoreCardProvider, useScoreCard };
