import { API_URL } from '@env'
import axios from 'axios'
import {ProductData} from "../types/product-data";
import {PantryItemData} from "../types/pantry-item-data";

const URL_BASE = API_URL + "/pantry"

export const PantryAPI = {

   ping: async () => {
      axios(URL_BASE + "/ping").then(
         data => {
            console.log("[GET] Pantry successful: ", data.data);
            return data.data;
         }, err => {
            console.log("[GET] ERROR: " + err);
         }
      )
   },

   getPantryItems: async () => {
      return axios<PantryItemData[]>({
         method: 'get',
         url: URL_BASE
      })
   },

   savePantryItem: async (pantryItem) => {
      return axios<PantryItemData>({
         method: 'post',
         url: URL_BASE,
         data: pantryItem
      })
   }
}
