import { API_URL } from '@env'
import axios from 'axios'
import { Household } from '../types/household'

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

   postHousehold: async (householdDTO: Household, email: string) => {
      const res = await axios({
         method: 'post',
         url: URL_BASE,
         data: {
            householdDTO: householdDTO
         },
         params: {
            email: email
         }
       });
   },
}
