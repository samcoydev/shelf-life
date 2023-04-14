export type AlertData = {
   id: string;
   text: string;
   alerted_household_id: string;
   expiration: Date;
   alertType: AlertTypeEnum;
   household_request_id?: string;
}
