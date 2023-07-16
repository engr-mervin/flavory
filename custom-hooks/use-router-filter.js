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

  const addMultipleParam = function (params, values) {
    //params => array of arrays with param and value

    console.log(params, values);
    let updatedQuery = { ...router.query };

    for (let i = 0; i < params.length; i++) {
      updatedQuery = { ...updatedQuery, [params[i]]: values[i] };
    }

    router.push({ pathname, query: updatedQuery });
  };

  const addParamShallow = function (param, value) {
    let updatedQuery;
    //Parameter already exists
    updatedQuery = { ...router.query, [param]: value };

    router.push({ pathname, query: updatedQuery }, undefined, {
      shallow: true,
    });
  };

  return { addParam, addMultipleParam, addParamShallow };
};

export default useRouterFilter;
