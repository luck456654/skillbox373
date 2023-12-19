const updatedUrl = ({ url, key, value }) => {
  //функция которая заменяет параметры запроса
  const params = new URLSearchParams(url.substring(url.indexOf("?")));
  params.set(key, value);
  const updatedUrl =
    url.substring(0, url.indexOf("?")) + "?" + params.toString();
  return updatedUrl;
};

export default updatedUrl;
