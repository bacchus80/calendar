const BASE_URL = process.env.REACT_APP_API_URL;

export const apiRoutes = {
  events: BASE_URL,
  delete: BASE_URL + "{id}",
  update: BASE_URL + "{event}",
  create: BASE_URL + "{event}",
};
