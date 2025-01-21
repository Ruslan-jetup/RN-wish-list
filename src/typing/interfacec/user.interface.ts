import { PremiumPeriodEnum } from 'typing/enums';

export interface IUserInfo {
  firstName: string;
  lastName: string;
  nickName: string;
  userAvatarUri: string | number;
  userCountry: string;
  email: string;
  dateOfBirth: Date | null;
  phoneNumber: string;
  dialCode: string;
  notification: boolean;
  premiumPeriod?: PremiumPeriodEnum;
  subscribers: number | null;
  subscriptions: number | null;
}
