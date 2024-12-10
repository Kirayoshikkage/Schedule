/* eslint-disable consistent-return */
import router from "./router";

const SETTINGS = {
  URL: "http://back.karasuxr.beget.tech",
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

export function pushError(error) {
  fetch(new URL("/api/v4/error", SETTINGS.URL), {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      title: error,
    }),
  });
}

export async function getNewsList() {
  return requestDefault(`/api/v5/news/`);
}

export async function getTeachersList() {
  return requestDefault(
    `/api/v3/prepodovatel/`,
    (request, response) => !response.length
  );
}

export async function getTeacherSchedule(id) {
  return requestDefault(
    `/api/v2/zadach/?teacher=${id}`,
    (request, response) => !response.length
  );
}

export async function getSpecialtiesList() {
  return requestDefault(
    "/api/v1/zadach/",
    (request, response) => !response.length
  );
}

export async function getGroupsList(id) {
  return requestDefault(
    `/api/v1/zadach/${id}/`,
    (request, response) => !response.title || !response.groups || !response.id
  );
}

export async function getGroupSchedule(id) {
  return requestDefault(`/api/v2/zadach/${id}/`, (request, response) => {
    const schedule = response[`list_par${response.title}`];

    return !response.title || !response.time || !schedule;
  });
}

export async function getFullScheduleList() {
  return requestDefault(
    "api/v2/zadach/",
    (request, response) => !response.length
  );
}
