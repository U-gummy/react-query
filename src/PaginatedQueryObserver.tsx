import { Fragment, useCallback, useEffect, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import axios from "axios";

// FIXME: 뭔가 잘 동작하지 않는다.

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

export const PaginatedQueryObserver = () => {
  const observerElem = useRef(null);

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery<Comment[]>(
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

  const handleObserver: IntersectionObserverCallback = useCallback(
    (entries) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage]
  );

  useEffect(() => {
    const element = observerElem.current;

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1,
    };

    const observer = new IntersectionObserver(handleObserver, options);
    //observer.observe 하기 전에 꼭 element가 있는지 없는지 if 문으로 체크해야 합니다.
    // if 문이 없으면 Failed to execute 'observe' on 'IntersectionObserver': parameter 1 is not of type 'Element'. 에러가 발생됩니다.
    if (element) observer.observe(element);
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [fetchNextPage, hasNextPage, handleObserver]);

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
      <div className="loader" ref={observerElem}>
        {isFetchingNextPage && hasNextPage ? "Loading..." : "No search left"}
      </div>
    </>
  );
};
