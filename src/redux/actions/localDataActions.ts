import { fetchDataFromFS } from "../../services/firebaseServices";

export const VIEW_ON_BOARDING = 'IS_FIRST_TIME_USER';
export const LOCATIONS_FROM_FS = 'LOCATIONS_FROM_FS';


export const viewedOnboarding = (viewOnBoarding: boolean) => ({
  type: VIEW_ON_BOARDING,
  payload: viewOnBoarding
});

export const getTESTFromFS1 = () => {
  return async (dispatch: any) => {
      const fsData = await fetchDataFromFS();

          dispatch ({
              type: LOCATIONS_FROM_FS,
              payload: fsData
          });
      };
};