import { API_URL } from '@env'
import axios from 'axios'

const URL_BASE = API_URL + "/shopping-list"

export const ShoppingListAPI = {

   ping: async () => {
      axios(URL_BASE + "/ping").then(
         data => {
            console.log("[GET] Shopping list successful: ", data.data);
            return data.data;
         }, err => {
            console.log("[GET] ERROR: " + err);
         }
      )
   },
}
