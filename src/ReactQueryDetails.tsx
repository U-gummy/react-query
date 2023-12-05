import { useParams } from "react-router-dom";
import { usePostId } from "./hooks/usePostId";

export const ReactQueryDetails = () => {
  const { postId } = useParams();
  console.log("postId: ", postId);
  const { isLoading, isError, data } = usePostId(postId as string);
  if (isLoading) return <>Loading...</>;
  if (isError) return <>에러가 발생했습니다.</>;

  return (
    <>
      {data && (
        <div>
          <h1>ID : {data.id}</h1>
          <h1>TITLE : {data.title}</h1>
          <h2>BODY : {data.body}</h2>
        </div>
      )}
    </>
  );
};
