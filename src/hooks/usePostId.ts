import { useQuery, useQueryClient } from "react-query";
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
  const queryClient = useQueryClient();

  return useQuery(["post-id", id], () => getPostDetails(id), {
    initialData: () => {
      const posts: Post[] | undefined = queryClient.getQueryData("get-posts");
      const postSummary = posts?.find((p: Post) => p.id === Number(id));

      if (postSummary) {
        return postSummary;
      } else return undefined;
    },
  });

  // return useQuery<Post>(["post-id", id], () => getPostDetails(id));
};
