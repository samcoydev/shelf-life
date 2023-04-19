import { API_URL } from '@env'
import axios from 'axios'
import { HouseholdData } from '../types/household-data'
import { AlertData } from '../types/alert-data'

const URL_BASE = API_URL + "/household"

export const HouseholdAPI = {

   ping: async () => {
      axios(URL_BASE + "/ping").then(
         data => {
            console.log("[GET] Household Ping successful: ", data.data);
            return data.data;
         }, err => {
            console.log("[GET] ERROR: " + err);
         }
      )
   },

   saveHousehold: async (householdDTO: HouseholdData) => {
      return await axios({
         method: 'post',
         url: URL_BASE,
         data: { ...householdDTO },
       });
   },
   
   requestToJoinHousehold: async (householdName: string) => {
      return await axios({
         method: 'post',
         url: URL_BASE + `/request/${householdName}`,
      })
   },

   respondToHouseholdRequest: async (alertId: string, didAccept: boolean) => {
      return await axios({
         method: 'post',
         url: URL_BASE + '/request/action',
         data: {
            alertId,
            didAccept
         },
      })
   },
}
