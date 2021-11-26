type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

declare module "clevertap" {
  export type Callback = (res: any) => void;

  type Identity = RequireAtLeastOne<
    {
      identity?: string;
      FBID?: string;
      GPID?: string;
      objectId?: string;
    },
    "identity" | "FBID" | "GPID" | "objectId"
  >;

  type ProfileUploadData = {
    type: "profile";
    profileData: Record<string, any>;
    ts?: number;
  } & Identity;

  type EventUploadData = {
    type: "event";
    evtName: string;
    evtData: Record<string, any>;
    ts?: number;
  } & Identity;

  export type UploadData = ProfileUploadData | EventUploadData;

  export type UploadOptions = {
    debug?: number;
    batchSize?: number;
  };

  export type Query = {
    event_name: string;
    props?: Array<Record<string, any>>;
    from: number;
    to: number;
  };

  export type QueryOptions = {
    debug?: number;
    batchSize?: number;
  };

  type ProfileIdentity = RequireAtLeastOne<{
    email?: string;
    identity?: string;
    objectId?: string;
  }>;

  export type ProfileOptions = {
    debug?: number;
  } & ProfileIdentity;

  type CustomControlGroup = {
    type: "custom";
    name: string;
  };

  type CampaignControlGroup = {
    type: "campaign";
    percentage: number;
  };

  type TargetBasePayload = {
    name: string;
    devices: Array<string>;
    when: string;
    content: {
      title: string;
      body: string;
      platform_specific?: Record<string, any>;
      replacements?: Record<string, any>;
    };
    ttl?: number;
    wzrk_cid?: string;
    wzrk_bc?: number;
    wzrk_bi?: string;
    system_control_group_include?: boolean;
    control_group?: CampaignControlGroup | CustomControlGroup;
    wzrk_acts?: string;
    respect_throttle?: boolean;
    send_to_all_devices?: boolean;
  };

  type TargetSegmentPayload = {
    segment: "all";
  } & TargetBasePayload;

  type TargetWherePayload = {
    where: {
      event_name?: string;
      from?: number;
      to?: number;
      common_profile_properties?: {
        profile_fields: Array<Record<string, any>>;
      };
    };
  };

  export type TargetCreatePayload = TargetWherePayload | TargetSegmentPayload;

  export type TargetOptions = {
    debug?: number;
  };

  interface clevertap {
    upload(
      data: Array<UploadData>,
      options?: UploadOptions,
      callback?: Callback
    ): Promise<any>;
    profile(options: ProfileOptions, callback?: Callback);
    profiles(
      query: Query,
      options?: QueryOptions,
      callback?: Callback
    ): Promise<any>;
    events(
      query: Query,
      options?: QueryOptions,
      callback?: Callback
    ): Promise<any>;
    targets(
      action: "create",
      payload: TargetCreatePayload,
      options?: TargetOptions,
      callback?: Callback
    );
    targets(
      action: "estimate",
      payload: TargetCreatePayload,
      options?: TargetOptions,
      callback?: Callback
    );
    targets(
      action: "list",
      payload: { from?: number; to?: number },
      options?: TargetOptions,
      callback?: Callback
    );
    targets(
      action: "stop" | "result",
      payload: { id: number },
      options?: TargetOptions,
      callback?: Callback
    );
    TARGET_CREATE: "create";
    TARGET_ESTIMATE: "estimate";
    TARGET_LIST: "list";
    TARGET_RESULT: "result";
    TARGET_STOP: "stop";
    TARGET_ACTIONS: ["create", "estimate", "list", "result", "stop"];
  }

  export enum CLEVERTAP_REGIONS {
    EUROPE = "eu1",
    INDIA = "in1",
    SINGAPORE = "sg1",
    US = "us1",
  }
  export function init(
    accountId: string,
    accountPasscode: string,
    region?: CLEVERTAP_REGIONS
  ): clevertap;
}
