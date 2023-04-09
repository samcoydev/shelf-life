import { API_URL } from '@env'

export const ShoppingListAPI = {


   ping: async () => {
      try {
         const response = await fetch(
           API_URL + "/shopping-list/ping",
         );
         const json = await response.json();
         return json;
       } catch (error) {
         console.error(error);
       }
   },

   pingSecured: async (token: string) => {
      try {
         const response = await fetch(
           API_URL + "/shopping-list/ping", {
            headers:{
               Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer " + token,
                },
           }
         );
         const json = await response.json();
         return json;
       } catch (error) {
         console.error(error);
       }
   }
}
