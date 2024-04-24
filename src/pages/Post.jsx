import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import service from "../appwrite/config";
import NotFound from "./NotFound";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) setPost(post.documents[0]);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    service.deleteFile(post?.image).then((status) => {
      if (status) {
        service.deletePost(post?.$id);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="flex lg:flex gap-2  border rounded-xl p-2">
          <img
            src={service.getFilepreview(post.image)}
            alt={post.title}
            className="w-2/4 h-max"
          />
          <div className="w-2/4 flex flex-col justify-between">
            <div className="flex flex-col">
              <div className="w-full mb-6">
                <h1 className="text-4xl uppercase font-bold">{post.title}</h1>
              </div>
              <div className="browser-css">{parse(post.description)}</div>
            </div>

            {isAuthor && (
              <div className="self-end">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button className="mr-2 bg-black text-white rounded px-1">
                    Edit
                  </Button>
                </Link>
                <Button
                  className=" bg-black text-white rounded px-1"
                  onClick={deletePost}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  ) : (
    <NotFound />
  );
}
