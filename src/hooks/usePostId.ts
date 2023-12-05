import { v4 as uuid } from "uuid";
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
    // onSuccess: (data) => {
    //   // 리스트 fetching
    //   // queryClient.invalidateQueries("get-posts");

    //   //POST 액션 후에 GET 액션이 무조건 일어나는데 POST 액션 후에 일어나는 GET 액션을 방지 (setQueryData)
    //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //   queryClient.setQueryData("get-posts", (oldProductData: any) => {
    //     return [...oldProductData, data.data];
    //   });
    // },
    // TODO: 잘 모르겠다... (cancelQueries 후 다시 불러온다는게 머선말이지)
    onMutate: async (newProduct) => {
      await queryClient.cancelQueries("get-posts");
      const previousProductData = queryClient.getQueryData("get-posts");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueryData("get-posts", (oldProductData: any) => {
        return [{ ...newProduct, id: uuid() }, ...oldProductData];
      });
      return {
        previousProductData,
      };
    },
    onError: (_error, _product, context) => {
      console.log("_error: ", _error);
      // 원상 복구
      queryClient.setQueryData("get-posts", context?.previousProductData);
    },
    onSettled: () => {
      //onSettled은 POST 액션이 에러가 났거나 아니면 성공했을 때 실행되는 항목
      // 'get-posts' 쿼리를 무효화시켜서 쿼리를 다시 fetching
      queryClient.invalidateQueries("get-posts");
    },
  });
};
