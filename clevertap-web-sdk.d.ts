type Region = "eu1" | "in1" | "sg1" | "us1" | "sk1";

type PrivacyData = {
  optOut?: boolean;
  useIP?: boolean;
};

interface Privacy extends Array {
  push(...privacyArr: PrivacyData[]): 0;
}

type EventName = string;
type EventData = object;
type EventNameOrData = EventName | EventData;
type EventDetails = {
  firstTime: Date;
  lastTime: Date;
  count: number;
};
interface EventHandler extends Array {
  push(evtName: string, ...evtNameOrData: EventNameOrData[]): 0;
  getDetails(evtName: string): EventDetails | undefined;
}

type SiteData = {
  Name?: string;
  Identity?: string | number;
  Gender?: "M" | "F";
  Employed?: "Y" | "N";
  Married?: "Y" | "N";
  Education?: "School" | "College" | "Graduate";
  Age?: string | number;
  DOB?: string | number | Date;
  Phone?: string | number;
  [key: string]: any;
};
type ProfileData = {
  Site?: SiteData;
  Facebook?: object;
  "Google Plus"?: object;
};
interface ProfileHandler extends Array {
  push(...profileData: ProfileData[]): 0;
  getAttribute(profileName: string): any;
}

interface UserLoginHandler extends Array {
  push(...profileData: ProfileData[]): 0;
  clear(): void;
}

type NotificationData = {
  titleText: string;
  bodyText: string;
  okButtonText: string;
  rejectButtonText: string;
  okButtonColor?: string;
  skipDialog?: boolean = false;
  askAgainTimeInSeconds?: number = 7 * 24 * 60 * 60;
  okCallback?: () => void;
  rejectCallback?: () => void;
  subscriptionCallback?: () => void;
  hidePoweredByCT?: boolean = false;
  serviceWorkerPath?: string = "/clevertap_sw.js";
  httpsPopupPath?: string;
  httpsIframePath?: string;
  apnsWebPushId?: string;
  apnsWebPushServiceUrl?: string;
};

interface NotificationHandler extends Array {
  push(notificationData: NotificationData): 0;
  push(
    titleText: string,
    bodyText: string,
    okButtonText: string,
    rejectButtonText: string,
    okButtonColor?: string,
    skipDialog?: boolean = false,
    askAgainTimeInSeconds?: number = 7 * 24 * 60 * 60
  ): 0;
}

interface User {
  getTotalVisits(): number | undefined;
  getLastVisit(): Date | undefined;
}

interface Session {
  getTimeElapsed(): number | undefined;
  getPageCount(): number | undefined;
}

declare module "clevertap-web-sdk" {
  let privacy: Privacy;
  let event: EventHandler;
  let profile: ProfileHandler;
  let onUserLogin: UserLoginHandler;
  let notifications: NotificationHandler;
  let user: User;
  let session: Session;
  let spa: boolean = false;
  let enablePersonalization: boolean = false;
  let raiseNotificationClicked: () => void = () => {};
  function setLogLevel(logLevel: 0 | 1 | 2 | 3): void;
  function getCleverTapID(): string | null;
  function logout(): void;
  function clear(): void;
  function pageChanged(): void;
  function init(
    accountId: string,
    region: Region = "eu1",
    targetDomain?: string
  ): void;
  export default {
    init,
    privacy,
    event,
    profile,
    onUserLogin,
    notifications,
    user,
    session,
    setLogLevel,
    getCleverTapID,
    logout,
    clear,
    pageChanged,
    spa,
    enablePersonalization,
    raiseNotificationClicked,
  };
}
