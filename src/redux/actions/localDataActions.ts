import { fetchDataFromFS } from "../../services/firebaseServices";

export const VIEW_ON_BOARDING = 'IS_FIRST_TIME_USER';
export const LOCATIONS_FROM_FS = 'LOCATIONS_FROM_FS';
export const UAE_USER_LOCATION = 'UAE_USER_LOCATION';
export const FETCH_LOGEDIN_USER = 'FETCH_LOGEDIN_USER';


export const viewedOnboarding = (viewOnBoarding: boolean) => ({
  type: VIEW_ON_BOARDING,
  payload: viewOnBoarding
});

export const getCreatorsDataFS = () => {
  return async (dispatch: any) => {
      const fsData = await fetchDataFromFS();

          dispatch ({
              type: LOCATIONS_FROM_FS,
              payload: fsData
          });
      };
};

export const useCurrentUserLocation = (permissionIsGranted: string) => {
  return {
    type: UAE_USER_LOCATION,
    payload: permissionIsGranted
  };
};

// export const getLogedinFbUser = () => {
//   return {
//     type: FETCH_LOGEDIN_USER,
//     payload: permissionIsGranted
//   };
// };