import { useQuery } from "react-query";
import axios from "axios";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const getPosts = async () => {
  const data = await axios.get("https://jsonplaceholder.typicode.com/posts");
  return data.data;
};

export const ReactQuery = () => {
  const { isLoading, data, isError, error } = useQuery<Post[]>(
    "get-posts",
    getPosts
  );

  console.log("error: ", isError, error);
  if (isLoading) return <>Loading...</>;
  if (isError) return <>에러가 발생했습니다.</>;

  return (
    <>
      <div className="text-4xl">ReactQuery</div>

      <ul className="list-disc p-4">
        {data && data?.map((item) => <li key={item.id}>{item.title}</li>)}
      </ul>
    </>
  );
};
