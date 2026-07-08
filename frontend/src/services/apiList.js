import { apiDelete, apiGet, apiPost, apiPut } from "./api";

export const getContacts = () => apiGet("/contact");
export const addContact = (data) => apiPost("/add-contact", data);

export const getHireRequests = () => apiGet("/hire");
export const addHireRequest = (data) => apiPost("/hire", data);

export const getReviews = () => apiGet("/review");
export const addReview = (data) => apiPost("/addreview", data);
export const updateReview = (id, data) =>
  apiPut(`/review/${id}`, data);

export const getExperiences = () => apiGet("/experience");
export const addExperience = (data) =>
  apiPost("/experience", data);
export const updateExperience = (id, data) =>
  apiPut(`/experience/${id}`, data);
export const deleteExperience = (id) =>
  apiDelete(`/experience/${id}`);