import { useQuery } from "react-query";
import axios from "axios";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const getPosts = async () => {
  const data = await axios.get("https://jsonplaceholder.typicode.com/posts");
  return data.data;
};

export const usePost = (
  onSuccess: (data: Post[]) => void,
  onError: (error: unknown) => void
) => {
  return useQuery<Post[]>("get-posts", getPosts, {
    onSuccess: onSuccess,
    onError: onError,
  });
};
