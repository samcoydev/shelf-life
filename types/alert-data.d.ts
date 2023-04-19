export type AlertData = {
   id: string;
   text: string;
   alertedHouseholdId?: string;
   alertedUserId?: string;
   expiration: Date;
   alertType: AlertTypeEnum;
   householdRequestId?: string;
   friendRequestId?: string;
}
