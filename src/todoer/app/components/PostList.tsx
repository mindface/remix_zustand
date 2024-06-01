import { useMemo } from "react";
import { useStorePost } from "../store/post02";
import PostMake from "../components/PostMake";

export default function PostList() {
  const {postList} = useStorePost((store) => ({
    postList: store.postList,
  }));

  const viewPostList = useMemo(() => {
    return postList.filter((item) => item.status === "run");
  },[postList]);

  return (
    <div className="post-box">
      <ul className="post-list">
        {viewPostList.map((item) => <li className="post-item" key={item.id}>
            <p>{item.title}</p>
            <p>{item.body}</p>
            <PostMake makeType="update" updateItem={item} />
          </li>
        )}
      </ul>
    </div>
  );
}
