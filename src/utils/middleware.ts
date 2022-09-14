import { ErrorRequestHandler } from "express"
import { errorLoger } from "./logger"

export const ErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  errorLoger.error(err)
  return res.status(500).json("system busy")
}