import { SETPAGE } from "./types";

export const setPages = (page,count,data) => {
    return {
      type: SETPAGE,
      page: page,
      count:count,
      data:data
    };
  };