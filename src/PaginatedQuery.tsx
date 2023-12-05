import { Fragment, useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import axios from "axios";

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
const getComments = async (page: number) => {
  const data = await axios.get(
    `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=20`
  );
  return data.data;
};

export const PaginatedQuery = () => {
  //   const [pageNumber, setPageNumber] = useState(1);

  const {
    data,
    isLoading,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<Comment[]>(
    ["get-paginated"], //useInfiniteQuery는 queryKey를 꼭 배열로 제공해 줘야 합니다.
    ({ pageParam = 1 }) => getComments(pageParam),
    {
      //   keepPreviousData: true, //캐시 된 데이터를 먼저 보여주고 나중에 fetching이 끝난 다음 다시 화면에 데이터를 업데이트해 주는 방식을 제공합니다.
      getNextPageParam: (_lastPage, pages) => {
        if (pages.length < 10) {
          return pages.length + 1;
        } else return undefined;
      },
    }
  );

  useEffect(() => {
    let fetching = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleScroll = async (e: any) => {
      const { scrollHeight, scrollTop, clientHeight } =
        e.target.scrollingElement;
      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [fetchNextPage, hasNextPage]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="text-4xl">ReactQuery</div>

      {data &&
        data.pages.map((item, i) => (
          <Fragment key={i}>
            {item && item.map((p) => <div key={p.id}>{p.name}</div>)}
          </Fragment>
        ))}
      <div className="space-x-4">
        <button
          className="border"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage}
        >
          Load More
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </>
  );
};
