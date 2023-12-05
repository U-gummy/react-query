import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { AxiosQuery } from "./AxiosQuery";
import { ReactQuery } from "./ReactQuery";
import { ReactQueryDevtools } from "react-query/devtools";
import { ReactQueryDetails } from "./ReactQueryDetails";
import { ParallelQuery } from "./ParallelQuery";
import { DynamicParallelQueries } from "./DynamicParallelQueries";
import { DependQuery } from "./DependQuery";
import { PaginatedQuery } from "./PaginatedQuery";
import { PaginatedQueryObserver } from "./PaginatedQueryObserver";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/axios-query" element={<AxiosQuery />} />
          <Route path="/react-query" element={<ReactQuery />} />
          <Route path="/react-query/:postId" element={<ReactQueryDetails />} />
          <Route path="/parallel-query" element={<ParallelQuery />} />
          <Route
            path="/dynamic-parallel-queries"
            element={<DynamicParallelQueries postIds={["1", "3"]} />}
          />
          <Route path="/depend-query" element={<DependQuery />} />
          <Route path="/paginated-query" element={<PaginatedQuery />} />
          <Route
            path="/paginated-query-observer"
            element={<PaginatedQueryObserver />}
          />
        </Route>
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </>
  );
}
export default App;
