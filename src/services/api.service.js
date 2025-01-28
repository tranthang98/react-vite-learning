import axios from "./axios.customize";

const createUserAPI = (fullName, email, password, phone) => {
  const URL_BACKEND = "/api/v1/user";
  const data = {
    fullName: fullName,
    email: email,
    password: password,
    phone: phone
  }
  return axios.post(URL_BACKEND, data);
}

const updateUserAPI = (_id, fullName, phone) => {
  const URL_BACKEND = "/api/v1/user";
  const data = {
    _id: _id,
    fullName: fullName,
    phone: phone
  }
  return axios.put(URL_BACKEND, data);
}

const fetchAllUserAPI = (current, pageSize) => {
  const URL_BACKEND = `/api/v1/user?current=${current}&pageSize=${pageSize}`;
  return axios.get(URL_BACKEND);
}

const deleteUserAPI = (id) => {
  const URL_BACKEND = `/api/v1/user/${id}`;//backtick
  return axios.delete(URL_BACKEND);
}

const handleUploadFile = (file, folder) => {
  const URL_BACKEND = "/api/v1/file/upload";
  let config = {
    headers: {
      "upload-type": folder,
      "Content-Type": "multipart/form-data"
    }
  }
  const bodyFormData = new FormData();
  bodyFormData.append("fileImg", file);

  return axios.post(URL_BACKEND, bodyFormData, config);
}

const updateUserAvatarAPI = (avatar, _id, fullName, phone) => {
  const URL_BACKEND = "/api/v1/user";
  const data = {
    _id: _id,
    fullName: fullName,
    phone: phone,
    avatar: avatar
  }
  return axios.put(URL_BACKEND, data);
}

const registerUserAPI = (fullName, email, password, phone) => {
  const URL_BACKEND = "/api/v1/user/register";
  const data = {
    fullName: fullName,
    email: email,
    password: password,
    phone: phone
  }
  return axios.post(URL_BACKEND, data);
}

const loginUserAPI = (username, password) => {
  const URL_BACKEND = "/api/v1/auth/login";
  const data = {
    username: username,
    password: password,
    delay: 2000
  }
  return axios.post(URL_BACKEND, data);
}

const getAccountAPI = () => {
  const URL_BACKEND = "/api/v1/auth/account";
  return axios.get(URL_BACKEND);
}

const logOutAPI = () => {
  const URL_BACKEND = "/api/v1/auth/logout";
  return axios.post(URL_BACKEND);
}

const fetchAllBookAPI = (current, pageSize) => {
  const URL_BACKEND = `/api/v1/book?current=${current}&pageSize=${pageSize}`;
  return axios.get(URL_BACKEND);
}

const updateBookAPI = (id, thumbnail, mainText, price, sold, quantity, author, category) => {
  const URL_BACKEND = "/api/v1/book";
  const data = {
    _id: id,
    thumbnail: thumbnail,
    mainText: mainText,
    price: price,
    sold: sold,
    quantity: quantity,
    author: author,
    category: category,
  }
  return axios.put(URL_BACKEND, data);
}

const createBookAPI = (thumbnail, mainText, price, quantity, author, category) => {
  const URL_BACKEND = "/api/v1/book";
  const data = {
    thumbnail: thumbnail,
    mainText: mainText,
    author: author,
    price: price,
    quantity: quantity,
    category: category,
  }
  return axios.post(URL_BACKEND, data);
}

const updateBookThumbnailAPI = (id, newThumbnail, mainText, price, quantity, author, category) => {
  const URL_BACKEND = "/api/v1/book";
  const data = {
    _id: id,
    thumbnail: newThumbnail,
    mainText: mainText,
    price: price,
    quantity: quantity,
    author: author,
    category: category,
  }
  return axios.put(URL_BACKEND, data);
}

const deleteBookAPI = (id) => {
  const URL_BACKEND = `/api/v1/book/${id}`;
  return axios.delete(URL_BACKEND);
}

export {
  createUserAPI, updateUserAPI, fetchAllUserAPI,
  deleteUserAPI, handleUploadFile, updateUserAvatarAPI,
  registerUserAPI, loginUserAPI, getAccountAPI, logOutAPI,
  createBookAPI, fetchAllBookAPI, updateBookAPI, updateBookThumbnailAPI, deleteBookAPI
}