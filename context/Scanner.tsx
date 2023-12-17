import { createContext, useEffect, useState } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { showErrorToast, showSuccessToast } from '../util/custom-toasts'
import { PantryAPI } from '../api/pantry-api'
import {ProductData} from "../types/product-data";
import {ProductAPI} from "../api/product-api";


interface ScannerContextType {
   hasPermission: boolean | null;
   scanned: boolean | null;
   scannedProduct: ProductData | null;
   setScanned: (wasScanned: boolean) => void;
   handleBarCodeScanned: ({ type, data }: { type: string, data: string }) => void;
}

export const ScannerContext = createContext<ScannerContextType>({
   hasPermission: null,
   scanned: null,
   scannedProduct: null,
   setScanned: (wasScanned: boolean) => {},
   handleBarCodeScanned: ({ type, data }: { type: string, data: string }) => {}
})

const SCANNER_TAG = "[SCANNER] "

export const ScannerProvider = (props: { children: React.ReactNode}) => {
   const [hasPermission, setHasPermission] = useState(null);
   const [scanned, setScanned] = useState(false);
   const [scannedProduct, setScannedProduct] = useState(null);

   useEffect(() => {
      const getBarCodeScannerPermissions = async () => {
         const { status } = await BarCodeScanner.requestPermissionsAsync();
         setHasPermission(status === 'granted');
      };

      getBarCodeScannerPermissions();
   }, []);

   const handleBarCodeScanned = async ({ type, data }: { type: string, data: string }) => {
         setScanned(true);
         console.log(type, data);
         showSuccessToast(`Bar code with type ${type} and data ${data} has been scanned!`);
         await ProductAPI.scanItem(data).then(response => {
            console.log(response.status);
             if (response.status === 200) {
                // @ts-ignore
                if (response.data === null || response.data === undefined || response.data.code === undefined) {
                   console.log("There is no item with that code in our database - Prompt form")
                   const emptyProduct: ProductData = {code: data, name: null, pendingRequestGrant: false};
                   setScannedProduct(emptyProduct);
                } else {
                   console.log("Setting scanned product", response.data);
                   setScannedProduct(response.data);
                }
             }
         }, err => console.error(JSON.stringify(err)));
   };

   if (hasPermission === false) {
      showErrorToast("Please grant permission to your camera")
   }

   const values = {
      hasPermission,
      scanned,
      scannedProduct,
      setScanned,
      handleBarCodeScanned
   }

   return (
      <ScannerContext.Provider value={values}>
         {props.children}
      </ScannerContext.Provider>
   )
}
