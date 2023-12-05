import { useQuery } from "react-query";
import axios from "axios";

export const DependQuery = () => {
  const getPosts = async () => {
    const data = await axios.get("https://jsonplaceholder.typicode.com/posts");
    return data.data;
  };

  const getComments = async (postId: string) => {
    const data = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    );
    return data.data;
  };

  const { data: posts } = useQuery("get-comments", () => getPosts());
  const postFirstId = posts && posts[0].id;

  const { data: comments } = useQuery(
    ["get-comments", postFirstId],
    () => getComments(postFirstId),
    {
      enabled: !!postFirstId,
    }
  );

  console.log("comments", postFirstId, comments);
  return (
    <div>
      <p>{postFirstId && postFirstId}</p>
      <ul>
        {comments &&
          comments.map((item: { id: number; name: string }, index: number) => (
            <li key={item.id}>
              {index + 1}.{item.name}
            </li>
          ))}
      </ul>
    </div>
  );
};
