import { useMutation, useQuery, useQueryClient } from "react-query";
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

const addPost = (post: { title: string; body: string }) => {
  return axios.post("https://jsonplaceholder.typicode.com/posts", post);
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

export const useAddPost = () => {
  const queryClient = useQueryClient();
  return useMutation(addPost, {
    onSuccess: (data) => {
      // 리스트 fetching
      // queryClient.invalidateQueries("get-posts");

      //POST 액션 후에 GET 액션이 무조건 일어나는데 POST 액션 후에 일어나는 GET 액션을 방지 (setQueryData)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueryData("get-posts", (oldProductData: any) => {
        return [...oldProductData, data.data];
      });
    },
  });
};
