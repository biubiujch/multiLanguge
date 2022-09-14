import { ErrorRequestHandler } from "express";
import jsonWebToken from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY!;

// 生成token
export const setToken = (user: { name: string; id: string }) => {
  const token = jsonWebToken.sign(
    {
      //   exp 的值是一个时间戳，这里表示 1h 后 token 失效
      //   exp: Math.floor(Date.now() / 1000) + 60 * 60,
      userId: user.id,
      userName: user.name,
    },
    SECRET_KEY,
    {
      expiresIn: "24h", //token有效期
      // expiresIn: 60 * 60 * 24 * 7,  两种写法
      // algorithm:"HS256"  默认使用 "HS256" 算法
    }
  );
  return token;
};

export const handleAuth: ErrorRequestHandler = (err, req, res, next) => {
  if (err.status === 401) {
    return res.status(203).json("please login");
  }
  next();
};
