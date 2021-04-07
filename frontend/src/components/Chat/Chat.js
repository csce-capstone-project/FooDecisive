import React, {
  useEffect,
  useContext,
  useReducer,
  useCallback,
  memo,
  useRef,
  useState
} from "react";
import "./Chat.css";
import { makeStyles } from '@material-ui/core/styles';
import { IoMdSend } from "react-icons/io";
import ResizableTextarea from "../ResizableTextarea";
import Bubble from "../Bubble";
import { witaiREST } from '../../services/witai';
import { List } from '../RestaurantDetail/List';
import GridList from '@material-ui/core/GridList';
import Fade from 'react-reveal/Fade';
import FastfoodIcon from '@material-ui/icons/Fastfood';

import {
  BOT,
  USER,
  THINKING,
  INIT_BUBBLES,
  ERROR_BUBBLES
} from "../../Constants";
import Context from "../../Context";

const ICON_COLOR = "Orange";
const NO_LOCATION_MESSAGE =
  "Oh, I can't access your location. 📍 Please allow me to access it so I can help you.";
const ICON_SIZE = 32;

// reducer and init state for the Chat component
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_BUBBLES":
      return { ...state, bubbles: action.payload };
    case "SET_SHOULD_SEND":
      return { ...state, shouldSend: action.payload };
    case "SET_BOT_RESPONSE":
      return { ...state, botResponse: action.payload };
    default:
      return state;
  }
};

const initialState = {
  bubbles: INIT_BUBBLES,
  shouldSend: false,
  botResponse: null
};

// helper functions
const filteredThinking = bubbles => [
  ...bubbles.filter(b => b.type !== THINKING)
];

const callApi = (input, userLocation) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: input,
      user: { coordinates: userLocation }
    })
  };
  const endpoint = process.env.REACT_APP_API_ENDPOINT;
  return witaiREST.chat(encodeURIComponent(input.trim()),userLocation).then(response =>{
    return response;
  })
};

// memoizing the two presentational components
const Header = memo(() => (
  <div className="header-chat" style={{margin: 'auto'}}>
    {/* <img src={logo} alt="Loa" className="header-logo" /> */}
    {/* <i class='fas fa-hamburger' style={{fontSize:'48px', paddingRight:'30px', color:'orange'}}></i> */}
    <FastfoodIcon style={{fontSize: '50px', color: 'Orange'}}/>
    <p className="header-chat-text" style={{padding: '10px'}}>Jessie</p>
  </div>
));

const BubbleContainer = memo(({ bubbles }) => (
  <div className="bubbles-container">
    {bubbles.map((b, i) => (
      <Bubble key={i} {...b} />
    ))}
  </div>
));



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 1100,
    height: '100% !important',
  },
}));


export const Chat = () => {
  const [results, setResults] = useState([])
  const [{ bubbles, shouldSend, botResponse }, dispatch] = useReducer(
    reducer,
    initialState
  );
  // this ref will contain the message from the user
  const messageRef = useRef("");
  // get location and restaurants setter from Context
  const { userLocation, setRestaurants } = useContext(Context);

  const handleSend = () => {
    dispatch({
      type: "SET_BUBBLES",
      payload: [
        { type: THINKING, content: null, bubbleType: "text" },
        {
          type: USER,
          content: messageRef.current,
          bubbleType: "text"
        },
        ...filteredThinking(bubbles)
      ]
    });
    dispatch({ type: "SET_SHOULD_SEND", payload: false });
  };

  // wrapped in useCallback to not change on every render as a useEffect dependency (see below)
  const handleSendMemo = useCallback(handleSend, [bubbles, dispatch]);

  useEffect(() => {
    if (shouldSend) handleSendMemo();
  }, [shouldSend, handleSendMemo]);

  const fetchRestaurantsMemo = useCallback(() => {
    const inputValue = messageRef.current;
    if (inputValue && inputValue !== "") {
      if (userLocation !== null) {
        const input = inputValue.substr(0, inputValue.length - 1); // Remove '\n' caracter at the end
        // fetch restaurants
        callApi(input, userLocation)
          .then(response => response)
          .then(data => {
            const resultsNew = data.results !== null ? data.results : [];
            dispatch({ type: "SET_BOT_RESPONSE", payload: data.message })
            setResults(resultsNew);
          })
          .catch(e => {
            console.log(e);
            dispatch({ type: "SET_BOT_RESPONSE", payload: ERROR_BUBBLES });
            setRestaurants([]);
          });
      } else {
        dispatch({
          type: "SET_BOT_RESPONSE",
          payload: [{ type: "text", content: NO_LOCATION_MESSAGE }]
        });
      }
    }
  }, [userLocation, dispatch, setRestaurants, messageRef]);

  useEffect(() => {
    if (bubbles.length > 1) {
      const { type } = bubbles[0];
      // user has sent last message, we stop thinking the previous ones ane push thinking to last (fetch restaurants)
      if (type === THINKING) fetchRestaurantsMemo();
    }
  }, [bubbles, fetchRestaurantsMemo]);

  // we received bots responses, and reset the bubbles
  useEffect(() => {
    if (botResponse !== null) {
      let newBubbles = botResponse.map(b => ({
        type: BOT,
        bubbleType: b.type,
        content: b.content,
        gif: b.gif
      }));
      newBubbles.push(...filteredThinking(bubbles));
      dispatch({ type: "SET_BUBBLES", payload: newBubbles });
      if(newBubbles[0].bubbleType == "text"){
        dispatch({ type: "SET_BOT_RESPONSE", payload: [{
          type: "gif",
          content:newBubbles[0].gif,
          gif:[]
        }]})
      }
      else{
        dispatch({ type: "SET_BOT_RESPONSE", payload: null });
      }
    }
  }, [botResponse]);

  // wrapped in callbakc because passed to ResizableTextarea, and shouldn't change on every render
  const setShouldSendMemo = useCallback(
    payload => dispatch({ type: "SET_SHOULD_SEND", payload }),
    [dispatch]
  );

  const renderInput = () => (
    <div className="chat-input-container">
      <ResizableTextarea
        className="chat-input"
        placeholder="Send a message..."
        messageRef={messageRef}
        setShouldSend={setShouldSendMemo}
      />
      <IoMdSend
        className="send-logo"
        onClick={() => handleSend()}
        color={ICON_COLOR}
        size={ICON_SIZE}
      />
    </div>
  );


  const classes = useStyles();
  return (
    <Fade>
    <div className="container">
      <div className="chat-container">
        <Header />
        <BubbleContainer bubbles={bubbles} />
        {renderInput()}
      </div>
      <div className="list-container">
      <GridList cellHeight={160} className={classes.gridList} cols={3}>
        <List businesses={results} />
      </GridList>
      </div>
    </div>
    </Fade>
  );
};

export default Chat;
