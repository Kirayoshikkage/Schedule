/* eslint-disable consistent-return */
import router from "./router";

const SETTINGS = {
  URL: "http://localhost",
};

async function requestDefault(
  method,
  customRule = function () {
    return false;
  }
) {
  try {
    const url = new URL(method, SETTINGS.URL);
    const request = await fetch(url);
    const response = await request.json();

    if (request.status === 404) {
      router.push({
        name: "home",
      });

      return Promise.reject(request.status);
    }

    if (
      !request.ok ||
      !(request.status >= 200 && request.status < 300) ||
      customRule(request, response)
    ) {
      return Promise.reject(request.status);
    }

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getSpecialtiesList() {
  return requestDefault(
    "/get-specialties-list",
    (request, response) => !response.length
  );
}

export async function getGroupsList(id) {
  return requestDefault(
    `/get-groups-list/${id}`,
    (request, response) => !response.title || !response.groups || !response.id
  );
}

export async function getGroupSchedule(id) {
  return requestDefault(`/get-group-schedule/${id}`, (request, response) => {
    const schedule = response[`list_par${response.title}`];

    return !response.title || !response.time || !schedule;
  });
}

export async function getTeacherSchedule(id) {
  return requestDefault(
    `/get-teacher-schedule?teacher=${id}`,
    (request, response) => !response.length
  );
}

export async function getTeachersList() {
  return requestDefault(
    `/get-teachers-list`,
    (request, response) => !response.length
  );
}
