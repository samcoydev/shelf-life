import { API_URL } from '@env'
import axios from 'axios'
import {ProductData} from "../types/product-data";

const URL_BASE = API_URL + "/product"

export const ProductAPI = {

    ping: async () => {
        axios(URL_BASE + "/ping").then(
            data => {
                console.log("[GET] Product successful: ", data.data);
                return data.data;
            }, err => {
                console.log("[GET] ERROR: " + err);
            }
        )
    },

    scanItem: async (code: string) => {
        return axios<ProductData>({
            method: 'get',
            url: URL_BASE + `/scan${code}`
        })
    },

    requestProductToBeAdded: async (requestedProductDTO: ProductData) => {
        return axios<ProductData>({
            method: 'post',
            url: URL_BASE + `/request`,
            data: requestedProductDTO
        })
    }
}
