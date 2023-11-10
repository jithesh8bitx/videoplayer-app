import { commonAPI } from "./commonAPI";
import serverURL from "./serverURL";

// upload videos
export const uploadAllVideo = async (reqBody) => {
  return await commonAPI("POST", `${serverURL}/videos`, reqBody);
};

export const getAllVideos = async () => {
  return await commonAPI("GET", `${serverURL}/videos`);
};

export const deleteVideo = async (id) => {
  return await commonAPI("DELETE", `${serverURL}/videos/${id}`);
};

export const addToHistory = async (videoDetails) => {
  return await commonAPI("POST", `${serverURL}/history`, videoDetails);
};

export const deleteHistory = async (id) => {
  return await commonAPI("DELETE", `${serverURL}/history/${id}`);
};

export const getAllHistory = async () => {
  return await commonAPI("GET", `${serverURL}/history`);
};

export const addCategory = async (rbody) => {
  return await commonAPI("POST", `${serverURL}/categories`, rbody);
};

export const getAllCategory = async () => {
  return await commonAPI("GET", `${serverURL}/categories`);
};

export const deleteCategory = async (id) => {
  return await commonAPI("DELETE", `${serverURL}/categories/${id}`);
};

//api to get a particular video
export const getAVideo = async (id) => {
  return await commonAPI("GET", `${serverURL}/videos/${id}`);
};

//api to update category
export const updateCategory = async (id, body) => {
  return await commonAPI("PUT", `${serverURL}/categories/${id}`, body);
};
