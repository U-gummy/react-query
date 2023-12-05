import { Link } from "react-router-dom";
import { Post, usePost } from "./hooks/usePost";
import { useState } from "react";
import { useAddPost } from "./hooks/usePostId";

export const ReactQuery = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const onSuccess = (data: Post[]) => {
    console.log("데이터 가져오기 후 사이드 이펙트 수행", data);
  };

  const onError = (error: unknown) => {
    console.log("오류 발생 후 사이드 이펙트 수행", error);
  };

  const { isLoading, isFetching, data, isError, refetch } = usePost(
    onSuccess,
    onError
  );

  const { mutate: addPost } = useAddPost();

  const handleCreate = () => {
    const data = { title, body };
    const a = addPost(data);
    console.log("a: ", a);
  };

  if (isLoading || isFetching) return <>Loading...</>;
  if (isError) return <>에러가 발생했습니다.</>;

  return (
    <>
      <div className="text-4xl">ReactQuery</div>

      <div className="space-x-2">
        <input
          className="border"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="border"
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button className="border" onClick={handleCreate}>
          Create
        </button>
      </div>

      <button
        onClick={() => refetch()}
        className="py-2 px-4 border bg-slate-100 rounded-md"
      >
        fetch data
      </button>

      <ul className="list-disc p-4">
        {data &&
          data?.map((item) => (
            <li key={item.id}>
              <Link to={`/react-query/${item.id}`}>{item.title}</Link>
            </li>
          ))}
      </ul>
    </>
  );
};
