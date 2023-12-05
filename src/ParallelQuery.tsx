import { useQuery } from "react-query";
import axios from "axios";

const getPosts = async () => {
  const data = await axios.get("https://jsonplaceholder.typicode.com/posts");
  return data.data;
};

const getPostDetails = async () => {
  const data = await axios.get(`https://jsonplaceholder.typicode.com/posts/1`);
  return data.data;
};

export const ParallelQuery = () => {
  const {
    data: postsData,
    isLoading: postsLoading,
    isError: postsError,
  } = useQuery("parallel-get-post", getPosts);
  const details = useQuery("parallel-get-post-detail", getPostDetails);
  return (
    <div>
      {JSON.stringify(postsLoading)}
      {JSON.stringify(postsError)}
      {JSON.stringify(postsData)}
      <br />
      <br />
      <br />
      {JSON.stringify(details)}
    </div>
  );
};
