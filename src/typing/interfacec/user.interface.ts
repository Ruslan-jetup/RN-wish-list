import { PremiumPeriodEnum } from 'typing/enums';

export interface IUserInfo {
  firstName: string;
  lastName: string;
  userNickName: string;
  userAvatarUri: string;
  userCountry: string;
  email: string;
  dateOfBirth: string;
  phoneNumber: number | null;
  notification: boolean;
  premiumPeriod?: PremiumPeriodEnum;
}
