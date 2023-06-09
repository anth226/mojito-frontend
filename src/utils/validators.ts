export const emailValidator = (email: string) => {
  if (email === "") {
    return true;
  }
  const regex = new RegExp(/(^[A-Za-z\-_.\d]*@+[a-zA-z]*.com)/);
  return regex.test(email);
};
