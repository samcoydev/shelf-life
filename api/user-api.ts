import { API_URL } from '@env'
import axios from 'axios'
import { UserData } from '../types/user-data'

const URL_BASE = API_URL + "/user"

export const UserAPI = {

   ping: async () => {
      axios(URL_BASE + "/ping").then(
         data => {
            console.log("[GET] User Ping successful: ", data.data);
            return data.data;
         }, err => {
            console.log("[GET] ERROR: " + err);
         }
      )
   },

   welcomeUser: async (email: string) => {
      return await axios({
         method: 'post',
         url: URL_BASE + "/welcome",
         data: {
            email: email
         }
       });
   },

   postUserData: async (userData: UserData) => {
      return await axios<UserData>({
         method: 'post',
         url: URL_BASE + "/register",
         data: { ...userData }
       });
   },

   getUserData: async () => {
      return await axios<UserData>({
         url: URL_BASE,
       });
   },

   leaveHousehold: async () => {
      return await axios<UserData>({
         method: "put",
         url: URL_BASE,
       });
   },

   getUsersByHouseholdId: async (householdId: string) => {
      return await axios<UserData[]>({
         method: "get",
         url: URL_BASE + "/household",
         params: {
            householdId: householdId 
         }
       });
   },

   logout: async () => {
      return await axios({
         method: "post",
         url: URL_BASE + "/logout",
      })
   }
}
