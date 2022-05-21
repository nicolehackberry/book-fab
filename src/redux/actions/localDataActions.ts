export const VIEW_ON_BOARDING = 'IS_FIRST_TIME_USER';


export const viewedOnboarding = (viewOnBoarding: boolean) => ({
  type: VIEW_ON_BOARDING,
  payload: viewOnBoarding
});