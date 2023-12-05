import { useQuery } from "react-query";
import axios from "axios";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const getPostDetails = async (id: string) => {
  const data = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  return data.data;
};

export const usePostId = (id: string) => {
  console.log("id: ", id);
  return useQuery<Post>(["post-id", id], () => getPostDetails(id));
};
