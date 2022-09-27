import { useEffect, useState } from "react";

export default function useImages(isEdit, init) {
  const [id, setId] = useState();
  const [url, setUrl] = useState();
  const [fileUrl, setFileUrl] = useState();

  //add and image
  const addImage = (image) => {
    setFileUrl(image);
  };

  useEffect(() => {
    if (isEdit) {
      setId(init.id);
      setUrl(init.url);
      setFileUrl(init.url);
    }
  }, [isEdit, init]);

  return {
    id,
    url,
    setUrl,
    fileUrl,
    addImage,
  };
}
