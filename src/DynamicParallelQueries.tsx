import { useQueries } from "react-query";
import axios from "axios";

const getPostDetails = async (id: string) => {
  const data = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  return data.data;
};

export const DynamicParallelQueries = ({ postIds }: { postIds: string[] }) => {
  console.log(postIds);
  const results = useQueries(
    postIds.map((id: string) => {
      return {
        queryKey: ["get-post-detail", id],
        queryFn: () => getPostDetails(id),
      };
    })
  );

  console.log({ results });

  return (
    <div>
      <h6>DynamicParallelQueries</h6>
      <ul>
        {results &&
          results.map(
            ({ data }) => data && <li key={data.id}>- {data.title}</li>
          )}
      </ul>
    </div>
  );
};
