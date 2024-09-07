const SETTINGS = {
  URL: "http://localhost",
};

export async function getSpecialtiesList() {
  try {
    const url = new URL("/get-specialties-list", SETTINGS.URL);
    const request = await fetch(url);
    const response = await request.json();

    if (
      !request.ok ||
      !(request.status >= 200 && request.status < 300) ||
      !response.length
    ) {
      return Promise.reject(request.statusText || "Error");
    }

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

export function getSpecialtiesLists() {
  return "test";
}
