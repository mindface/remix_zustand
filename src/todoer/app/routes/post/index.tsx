import type { MetaFunction, LinksFunction } from "@remix-run/node";
import PostList from "../../components/PostList";
import PostMake from "../../components/PostMake";

import styles from "../../style/app.css?url";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App Post" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
];

export default function Post() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Remix for Post</h1>
      <PostMake makeType="add" />
      <PostList />
    </div>
  );
}
