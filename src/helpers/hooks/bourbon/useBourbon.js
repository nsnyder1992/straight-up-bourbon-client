import { useEffect, useState } from "react";

export default function useBourbon(isEdit, init) {
  //rate states
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [aroma, setAroma] = useState();
  const [taste, setTaste] = useState();
  const [photoUrl, setPhotoUrl] = useState();
  const [link, setLink] = useState();
  const [distillery, setDistillery] = useState();
  const [year, setYear] = useState();
  const [selection, setSelection] = useState();
  const [fileUrl, setFileUrl] = useState();

  //add and image to product
  const addImage = (image) => {
    setFileUrl(image);
  };

  useEffect(() => {
    if (isEdit) {
      setId(init.id);
      setName(init.name);
      setDescription(init.description);
      setAroma(init.aroma);
      setTaste(init.taste);
      setPhotoUrl(init.photoUrl);
      setLink(init.link);
      setDistillery(init.distillery);
      setYear(init.year);
      setSelection(init.selection);
      setFileUrl(init.photoUrl);
    }
  }, [isEdit, init]);

  return {
    id,
    name,
    setName,
    description,
    setDescription,
    aroma,
    setAroma,
    taste,
    setTaste,
    photoUrl,
    setPhotoUrl,
    link,
    setLink,
    distillery,
    setDistillery,
    year,
    setYear,
    selection,
    setSelection,
    fileUrl,
    addImage,
  };
}
