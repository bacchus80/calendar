// API URL shoud probably be saved in a .ENV file
const BASE_URL =
  "https://crudcrud.com/api/c974ef5540f34583aacee5422b10fc66/my-events/";

export const apiRoutes = {
  events: BASE_URL,
  delete: BASE_URL + "{id}",
  update: BASE_URL + "{event}",
  create: BASE_URL + "{event}",
};
