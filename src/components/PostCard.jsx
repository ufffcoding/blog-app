import React from "react";
import service from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, category, image }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="border rounded-t-md bg-white shadow-lg transition-transform hover:scale-125">
        <img
          src={service.getFilepreview(image)}
          className="aspect-video w-full rounded-md"
          alt={title}
        />
        <div className="min-h-min p-3">
          <p className="mt-4 w-full text-xs font-semibold leading-tight text-gray-700">
            #{category}
          </p>
          <p className="mt-4 flex-1 text-base font-semibold text-gray-900">
            {title}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
