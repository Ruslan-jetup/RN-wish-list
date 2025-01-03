import { PremiumPeriodEnum } from 'typing/enums';

export interface IUserInfo {
  firstName: string;
  lastName: string;
  nickName: string;
  userAvatarUri: string;
  userCountry: string;
  email: string;
  dateOfBirth: Date | null;
  phoneNumber: string;
  dialCode: string;
  notification: boolean;
  premiumPeriod?: PremiumPeriodEnum;
}
