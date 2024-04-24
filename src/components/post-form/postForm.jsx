import React, { useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import service from "../../appwrite/config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function postForm({ post }) {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const { register, setValue, getValues, control, watch, handleSubmit } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        description: post?.description || "",
        category: post?.category || "general",
        status: post?.status || "active",
      },
    });

  const submit = async (data) => {
    if (post) {
      const uploadFile = data.image[0]
        ? await service.uploadFile(data.image[0])
        : null;

      if (uploadFile && updateFile !== post.image) {
        await service.deleteFile(post.$id);
      }
      const updateFile = await service.updatePost(post.$id, {
        ...data,
        image: uploadFile ? uploadFile.$id : undefined,
      });
      if (updateFile) {
        navigate(`/post/${post.$id}`);
      }
    } else {
      const uploadFile = data.image[0]
        ? await service.uploadFile(data.image[0])
        : null;
      if (uploadFile) {
        data.image = uploadFile.$id;
        const createPost = await service.createPost({
          ...data,
          userId: userData.$id,
        });
        if (createPost) {
          navigate(`/all-posts`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value.trim().toLowerCase().replace(/\s/g, "-");
  });

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }

      return () => subscription.unsubscribe();
    });
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap ">
      <div className="lg:w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
          readOnly={true}
        />
        <RTE
          label="Description"
          name="description"
          control={control}
          defaultValue={getValues("description")}
        />
      </div>
      <div className="lg:w-1/3 flex flex-col gap-2 px-2">
        <Input
          label="Image :"
          type="file"
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer file:bg-gray-300 file:border-none bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={service.getFilepreview(post.image)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["general", "technology", "science", "sci-fiction"]}
          label="Category"
          className=""
          {...register("category", { required: true })}
        />
        <Select
          options={["active", "inactive"]}
          label="Status"
          className=""
          {...register("status", { default: "active" })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full bg-slate-900 rounded text-white"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default postForm;
