import { API_URL } from '@env'
import axios from 'axios'
import { AlertData } from '../types/alert-data'

const URL_BASE = API_URL + "/alert"

export const AlertsAPI = {

   ping: async () => {
      axios(URL_BASE + "/ping").then(
         data => {
            console.log("[GET] Alert Ping successful: ", data.data);
            return data.data;
         }, err => {
            console.log("[GET] ERROR: " + err);
         }
      )
   },

   getHouseholdAlerts: async () => {
      console.log("Getting alerts");
      return await axios<AlertData[]>({
         method: 'get',
         url: URL_BASE,
      })
   },

   respondToRequest: async (alertId: string, didAccept: boolean) => {
      console.log("Responding to request");
      return await axios({
         method: 'post',
         url: URL_BASE + '/action',
         data: {
            alertId,
            didAccept
         },
      })
   }
}
