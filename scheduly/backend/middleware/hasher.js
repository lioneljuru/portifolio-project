import { compareSync, genSaltSync, hashSync } from 'bcrypt';

const saltRounds = 10;
export const hashPwd = (password) => {
  const salt = genSaltSync(saltRounds);
  return hashSync(password, salt);
}


export const checkpwd = (hashedPwd, password) => {
  return compareSync(password, hashedPwd);
}