export enum ExtensionAnchor {
  Hidden = 'hidden',
  Panel = 'panel',
  VideoOverlay = 'videoOverlay',
  Component = 'component',
}

export enum ExtensionMode {
  Config = 'config',
  Dashboard = 'dashboard',
  Viewer = 'viewer',
}

export enum ExtensionPlatform {
  Mobile = 'mobile',
  Web = 'web',
}

export enum ExtensionState {
  Testing = 'Testing',
  HostedTest = 'Assets Uploaded',
  Approved = 'Approved',
  Released = 'Released',
  ReadyForReview = 'Ready For Review',
  InReview = 'In Review',
  PendingAction = 'Pending Action',
  Uploading = 'Uploading',
}

export enum ExtensionAction {
  TwitchExtAuth = 'twitch-ext-auth',
  TwitchExtBootstrap = 'twitch-ext-bootstrap',
  TwitchExtContext = 'twitch-ext-context',
  TwitchExtError = 'twitch-ext-error',
  TwitchExtLoaded = 'twitch-ext-loaded',
  TwitchExtLongtask = 'twitch-ext-longtask',
  TwitchExtNetworkTiming = 'twitch-ext-network-timing',
  TwitchExtReload = 'twitch-ext-reload',
  TwitchExtUserAction = 'twitch-ext-user-action',
  TwitchExtConfirmationRequest = 'twitch-ext-confirmation-request',
  TwitchExtBeginPurchase = 'twitch-ext-begin-purchase',
  TwitchExtReloadEntitlements = 'twitch-ext-reload-entitlements',
  TwitchExtProductPrices = 'twitch-ext-product-prices',
  TwitchExtVisibilityChanged = 'twitch-ext-visibility-changed',
  TwitchExtBitsProducts = 'twitch-ext-bits-products',
  TwitchExtUseBits = 'twitch-ext-use-bits',
  TwitchExtBitsTransactionComplete = 'twitch-ext-bits-transaction-complete',
  TwitchExtBitsOnHover = 'twitch-ext-bits-on-hover',
  TwitchExtPubSubReceived = 'twitch-ext-pubsub-received',
  TwitchExtPositionChanged = 'twitch-ext-position-changed',
  TwitchExtPubsubMessage = 'twitch-ext-pubsub-message',
  TwitchExtPubsubBindFailure = 'twitch-ext-pubsub-bind-failure',
  TwitchExtPubsubListen = 'twitch-ext-pubsub-listen',
  TwitchExtPubsubUnlisten = 'twitch-ext-pubsub-unlisten',
}

export enum ExtensionViewType {
  Component = "component",
  Config = "config",
  Hidden = "hidden",
  LiveConfig = "liveConfig",
  Mobile = "mobile",
  Panel = "panel",
  VideoOverlay = "videoOverlay",
}
