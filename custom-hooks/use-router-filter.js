import { useRouter } from "next/router";

const useRouterFilter = function () {
  const router = useRouter();
  const pathname = router.pathname;
  const addParam = function (param, value) {
    let updatedQuery;
    //Parameter already exists
    updatedQuery = { ...router.query, [param]: value };

    router.push({ pathname, query: updatedQuery });
  };

  return addParam;
};

export default useRouterFilter;
