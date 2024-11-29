import { TUserExist } from '../types/common.type';
import jwt from 'jsonwebtoken';

function createToken(user: TUserExist) {
  const { user_id } = user;
  const accessToken = jwt.sign({ user_id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  });
  const refreshToken = jwt.sign({ user_id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });
  return { accessToken, refreshToken };
}

export default createToken;
