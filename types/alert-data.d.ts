export type AlertData = {
   id: string;
   text: string;
   alertedHouseholdId?: string;
   alertedUserId?: string;
   expiration: Date;
   alertType: string;
   householdRequestId?: string;
   friendRequestId?: string;
}
