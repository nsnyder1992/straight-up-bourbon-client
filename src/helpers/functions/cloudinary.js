//send image to cloudinary and post data to backend server
export const uploadImg = async (
  signatureUrl,
  cloudinaryUrl,
  file,
  sessionToken
) => {
  let formData = new FormData();
  let filename = file?.name.split(".")[0];

  if (!filename) return;
  //get cloudinary security from backend
  const res = await fetch(`${signatureUrl}/${filename}`, {
    method: "GET",
    headers: new Headers({
      authorization: sessionToken,
    }),
  });
  const json = await res.json();

  //set form data
  formData.append("file", file);
  formData.append("api_key", json.key);
  formData.append("timestamp", json.timestamp);
  formData.append("folder", json.folder);
  formData.append("public_id", json.public_id);
  formData.append("signature", json.signature);

  //post to cloudinary and get url for storage
  const cloudinaryRes = await fetch(cloudinaryUrl, {
    method: "POST",
    body: formData,
  });
  const cloudinaryJson = await cloudinaryRes.json();
  return cloudinaryJson;
};

export const uploadEditedImg = async (
  signatureUrl,
  cloudinaryUrl,
  file,
  sessionToken
) => {
  let formData = new FormData();
  let filename = file.name.split(".")[0];

  const res = await fetch(`${signatureUrl}/${filename}`, {
    method: "GET",
    headers: new Headers({
      authorization: sessionToken,
    }),
  });
  const json = await res.json();

  //set form data
  formData.append("file", file);
  formData.append("api_key", json.key);
  formData.append("timestamp", json.timestamp);
  formData.append("folder", json.folder);
  formData.append("public_id", json.public_id);
  formData.append("signature", json.signature);

  //post to cloudinary and get url for storage
  const cloudinaryRes = await fetch(cloudinaryUrl, {
    method: "POST",
    body: formData,
  });
  const cloudinaryJson = await cloudinaryRes.json();
  return cloudinaryJson;
};
