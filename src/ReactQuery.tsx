import { Post, usePost } from "./hooks/usePost";

export const ReactQuery = () => {
  const onSuccess = (data: Post[]) => {
    console.log("데이터 가져오기 후 사이드 이펙트 수행", data);
  };

  const onError = (error: unknown) => {
    console.log("오류 발생 후 사이드 이펙트 수행", error);
  };

  const { isLoading, isFetching, data, isError, error, refetch } = usePost(
    onSuccess,
    onError
  );

  console.log("error: ", isError, error);
  if (isLoading || isFetching) return <>Loading...</>;
  if (isError) return <>에러가 발생했습니다.</>;

  return (
    <>
      <div className="text-4xl">ReactQuery</div>

      <button
        onClick={() => refetch()}
        className="py-2 px-4 border bg-slate-100 rounded-md"
      >
        fetch data
      </button>

      <ul className="list-disc p-4">
        {data && data?.map((item) => <li key={item.id}>{item.title}</li>)}
      </ul>
    </>
  );
};
