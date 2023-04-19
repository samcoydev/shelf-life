import { API_URL } from '@env'
import axios from 'axios'
import { UserData } from '../types/user-data'
import { AlertData } from '../types/alert-data'

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
   
   getUserData: async () => {
      return await axios<UserData>({
         url: URL_BASE,
       });
   },

   logout: async () => {
      return await axios({
         method: "post",
         url: URL_BASE + "/logout",
      })
   },

   getUsersFriends: async () => {
      return await axios<UserData[]>({
         method: "get",
         url: URL_BASE + "/friends"
      })
   },

   sendFriendRequest: async (email: string) => {
      return await axios({
         method: "post",
         url: URL_BASE + `/friends/${email}`
      })
   },

   respondToFriendRequest: async (alertId: string, didAccept: boolean) => {
      return await axios({
         method: "post",
         url: URL_BASE + '/friends/action',
         data: {
            alertId,
            didAccept
         }
      })
   },

   getUsersByHouseholdId: async (householdId: string) => {
      return await axios<UserData[]>({
         method: "get",
         url: URL_BASE + `/household/${householdId}`
       });
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

   leaveHousehold: async () => {
      return await axios<UserData>({
         method: "put",
         url: URL_BASE + "/household/leave",
       });
   },

   getUserAlerts: async () => {
      return await axios<AlertData[]>({
         method: 'get',
         url: URL_BASE + "/alerts",
      })
   },

   deleteUserAlert: async (id: string) => {
      return await axios({
         method: 'delete',
         url: URL_BASE + `/alerts/${id}`
      })
   }

}
