import { useState, useEffect } from "react";
import axios from "axios";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const AxiosQuery = () => {
  const [data, setData] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <>Loading...</>;

  if (error) return <h2>{error}</h2>;

  return (
    <>
      <div className="text-4xl">AxiosQuery</div>
      <ul className="list-disc p-4">
        {data && data?.map((item) => <li key={item.id}>{item.title}</li>)}
      </ul>
    </>
  );
};
