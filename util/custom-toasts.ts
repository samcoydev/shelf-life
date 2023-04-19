import Toast from 'react-native-root-toast'
import * as Haptics from 'expo-haptics';
import { error, success } from '../constants/colors'

const errorToastOptions = {
   position: -100,
   duration: Toast.durations.SHORT,
   containerStyle: { backgroundColor: error },
   textStyle: { fontSize: 12 }
}

const successToastOptions = {
   position: -100,
   duration: Toast.durations.SHORT,
   containerStyle: { backgroundColor: success },
   textStyle: { fontSize: 12 }
}

export const showErrorToast = (message: string) => {
   Toast.show(message, errorToastOptions);
   Haptics.notificationAsync(
      Haptics.NotificationFeedbackType.Error
   )
}

export const showSuccessToast = (message: string) => {
   Toast.show(message, successToastOptions);
   Haptics.notificationAsync(
      Haptics.NotificationFeedbackType.Success
   )
}