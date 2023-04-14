import { API_URL } from '@env'
import axios from 'axios'
import { HouseholdData } from '../types/household-data'

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

   postHousehold: async (householdDTO: HouseholdData) => {
      const res = await axios({
         method: 'post',
         url: URL_BASE,
         data: { ...householdDTO },
       });
   },

   requestToJoinHousehold: async (householdName: string) => {
      console.log("Household name requesting: ", householdName);
      return await axios.post(URL_BASE + '/request', householdName);
   }
}
