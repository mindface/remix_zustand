
import { Dispatch, createContext, useReducer, ReactNode } from "react";

export interface Post {
  id: number;
  title: string;
  body: string;
  date: string;
  status: string;
}

export type PostList = Post[];

interface State {
  postList: PostList;
  post: Post;
}

interface Action {
  type: string,
  postList?: PostList,
  post?: Post;
}

interface Props {
  children: ReactNode
}

export const postContext = createContext({} as {
  state: State,
  dispatch: Dispatch<Action>
})

const reducer = (state:State,action:Action) => {
  const actionList = action.postList ?? [];
  switch (action.type) {
    case "post/set":
      return {
        ...state,
        methodList: actionList
      }
    case "post/add":
      const list = [...state.postList,action.post] as PostList;
      return {
        ...state,
        methodList: list
      }
    case "method/update":
      const __ = actionList.map((item) => {
        return item.id === action.post!.id ? action.post : item; 
      }).filter(Boolean) as PostList;
      return {
        ...state,
        methodList: __
      }
    default:
      return state
  }
}

const initalState: State = {
  postList:[
    {
      id: 1,
      title: "手法01",
      body: "手法の説明です。",
      date: "20230102",
      status: "run",
    }
  ],
  post:  {
    id: 1,
    title: "手法01",
    body: "手法の説明です。",
    date: "20230102",
    status: "run",
  }
}

export const PostProvider = (props:Props) => {
  const [state,dispatch] = useReducer(reducer,initalState);
  return <postContext.Provider value={{state,dispatch}}>{props.children}</postContext.Provider>
}