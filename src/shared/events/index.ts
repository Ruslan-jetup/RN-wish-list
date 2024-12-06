import {Events} from 'jet-tools';

export type AppEvents = {
  event: {
    data: string;
  };
  setkeyboardScrollAwareOptions: {
    enable: boolean;
  };
};

export const appEvents = new Events<AppEvents>();

