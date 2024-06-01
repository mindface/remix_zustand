import { create } from "zustand";

export interface Post {
  id: number;
  title: string;
  body: string;
  date: string;
  status: string;
}

export type PostList = Post[];

interface StorePost {
  postList: Post[];
  post: Post;

  getPost: () => void;
  addPost: (post: Post) => void | { saveResult: string };
  updatePost: (post: Post) => void | { saveResult: string };
  deletePost: (postId: number) => void;
  reset: () => void;
}

export const useStorePost = create<StorePost>((set, get) => ({
  postList: [],
  post: {
    id: 1,
    title: "手法001",
    body: "手法の説明です。",
    date: "20230102",
    status: "run",
  },
  getPost: () => {},
  addPost: (post: Post) => {
    const list = [...get().postList,post];
    set({postList: list});
  },
  updatePost: (post: Post) => {
    const list = get().postList.map((item) => {
      if(post.id === item.id) {
        return post;
      }
      return item;
    });
    set({postList: list});
  },
  deletePost: (postId: number) => {
    if(postId === -1) return;
    const list = get().postList.map((item) => {
      if(postId === item.id) {
        return {...item, status: "stop"}
      }
      return item
    });
    set({postList: list});
  },
  reset: () => {
    set({
      postList: [],
    });
  },
}));
