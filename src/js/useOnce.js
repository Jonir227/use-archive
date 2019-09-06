import { useRef } from "react";

function useOnce(init) {
  let value = init;
  if (typeof value === "function") {
    value = value();
  }
  return useRef(value).current;
}

export default useOnce;
