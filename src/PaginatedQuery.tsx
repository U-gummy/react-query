import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
const getComments = async (page: number) => {
  const data = await axios.get(
    `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=20`
  );
  return data.data;
};

export const PaginatedQuery = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const { data, isLoading, isFetching } = useQuery<Comment[]>(
    ["get-paginated", pageNumber],
    () => getComments(pageNumber),
    {
      keepPreviousData: true, //캐시 된 데이터를 먼저 보여주고 나중에 fetching이 끝난 다음 다시 화면에 데이터를 업데이트해 주는 방식을 제공합니다.
    }
  );
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="text-4xl">ReactQuery</div>

      <h2>current Page number : {pageNumber}</h2>
      <ul className="list-disc p-4">
        {data &&
          data.map((comment) => <li key={comment.id}>{comment.name}</li>)}
      </ul>
      <div className="space-x-4">
        <button
          onClick={() => setPageNumber((page) => page - 1)}
          disabled={pageNumber === 1}
        >
          Prev
        </button>
        <button
          onClick={() => setPageNumber((page) => page + 1)}
          disabled={pageNumber === 10}
        >
          Next
        </button>
      </div>
      <div>{isFetching && "Fetching..."}</div>
    </>
  );
};
