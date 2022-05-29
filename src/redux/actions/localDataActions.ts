import { fetchDataFromFS, getCurrentLogedInUser, logInToFirebase, registerUserInFirebase } from "../../services/firebaseServices";

export const VIEW_ON_BOARDING = 'IS_FIRST_TIME_USER';
export const LOCATIONS_FROM_FS = 'LOCATIONS_FROM_FS';
export const UAE_USER_LOCATION = 'UAE_USER_LOCATION';
export const FETCH_LOGEDIN_USER = 'FETCH_LOGEDIN_USER';
export const REGISTER_USER_FS = 'REGISTER_USER_FS';
export const LOGIN_USER = 'LOGIN_USER';


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

export const register = async (displayName: string, username: string, password: string) => {
  return async (dispatch: any) => {
    const registerUser = await registerUserInFirebase(displayName, username, password);

        dispatch ({
            type: REGISTER_USER_FS,
            payload: registerUser
        });
    };
};

export const loginToFB = (isUserLogedin: boolean) => {

    console.log('TAG isUserLogedin -- redux: ', isUserLogedin);
    
        return {
            type: LOGIN_USER,
            payload: isUserLogedin
        };

};

export const getLogedinFbUser = () => {
  const currentUser = getCurrentLogedInUser();

  console.log('TAG currentUser: ', currentUser);
  

  return {
    type: FETCH_LOGEDIN_USER,
    payload: currentUser
  };
};