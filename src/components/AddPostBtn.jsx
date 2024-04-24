import React from "react";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";

function AddPostBtn({ className }) {
  return (
    <Link className={`${className}`} to="/add-post">
      <PlusCircle />
      Add Post
    </Link>
  );
}

export default AddPostBtn;
