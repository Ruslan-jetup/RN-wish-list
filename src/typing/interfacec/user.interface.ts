import { PremiumPeriodEnum } from 'typing/enums';

export interface IUserAuth {
  userName: string;
  userCountry: string;
  userAvatarUri: string;
  premiumPeriod?: PremiumPeriodEnum;
}
