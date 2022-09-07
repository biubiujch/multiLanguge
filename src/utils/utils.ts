import { RequestHandler } from "express";
import { WhereOptions } from "sequelize/types";

export function generateID() {
  return Date.now() + Math.random().toString().slice(2, 3);
}

export function filterQuery<T>(item: any) {
  const query: Record<string, any> = {};
  for (const key in item) {
    const value = item[key];
    if (typeof value === "undefined" || value === "" || value === null) {
      continue;
    } else {
      query[key] = value;
    }
  }

  return query as T;
}
