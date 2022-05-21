export const IS_FIRST_TIME_USER = 'IS_FIRST_TIME_USER';


export const firstTimeUser = (isFirstTimeUser: boolean) => ({
  type: IS_FIRST_TIME_USER,
  payload: isFirstTimeUser
});