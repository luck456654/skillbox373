import { useState, useEffect } from "react";

const useIsValidArray = (array) => {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (Array.isArray(array) && array.length > 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [array]);

  return isValid;
};

export default useIsValidArray;
