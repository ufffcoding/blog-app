import React, { useEffect, useState } from "react";
import service from "../appwrite/config";
import { setPosts as localPost } from "../store/postSlice";
import { Container, PostCard } from "../components";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    service.getPosts().then((post) => {
      if (post) {
        setPosts(post.documents);
      }
      console.log();
    });
  }, []);

  useEffect(() => {
    if (posts) {
      dispatch(localPost(posts));
    }
  }, [posts.length]);

  if (!authStatus) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <img
                className="mx-auto"
                src="/Screenshot 2024-04-24 141539.png"
                alt=""
              />
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
