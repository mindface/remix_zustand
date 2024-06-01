import { useEffect, useState } from "react";
import { postContext } from "../store/post";
import { useStorePost } from "../store/post02";
import type { Post } from "../store/post02";

type Props = {
  makeType: string;
  updateItem?: Post;
}

export default function PostMake(props: Props) {
  const [postTitle,postTitleSet] = useState("");
  const [postBody,postBodySet] = useState("");
  const {postList, addPost, updatePost, deletePost} = useStorePost((store) => ({
    postList: store.postList,
    addPost: store.addPost,
    updatePost: store.updatePost,
    deletePost: store.deletePost    
  }));

  const addPostAction = () => {
    const addItem = {
      id: postList.length+1,
      title: postTitle,
      body: postBody,
      date: "20240601",
      status: "run",
    }
    addPost(addItem);
  }

  const updatePostAction = () => {
    if(!props.updateItem) return;
    const updateItem = {
      ...props.updateItem,
      title: postTitle,
      body: postBody
    };
    updatePost(updateItem);
  }

  useEffect(() => {
    const item = props.updateItem;
    if(item) {
      postTitleSet(item.title);
      postBodySet(item.body);
    };
  },[props.updateItem]);

  return (
    <div className="post-make">
      <div className="post-make-title">
        <input
          type="text"
          className="title"
          value={postTitle}
          onChange={(e) => postTitleSet(e.target.value)}
        />
      </div>
      <div className="post-make-body">
        <textarea
          cols={40}
          rows={5}
          className="body"
          value={postBody}
          onChange={(e) => postBodySet(e.target.value)}
        ></textarea>
      </div>
      <div className="post-make-submit">
        { props.makeType === 'add' ?
          <button className="btn" onClick={addPostAction}>追加</button> : 
          <button className="btn" onClick={updatePostAction}>更新</button>
        }
        <button className="btn" onClick={() => deletePost(props.updateItem?.id ?? -1)}>削除</button>
      </div>
    </div>
  );
}
