import { ExtensionAnchor, ExtensionPlatform, ExtensionState, ExtensionViewType } from '../../constants/extension-coordinator';

export function getSupportedAnchors(views: ExtensionViews): ExtensionAnchor[] {
  const anchors = [];
  if (views.videoOverlay && views.videoOverlay.viewerUrl) {
    anchors.push(ExtensionAnchor.Overlay);
  }

  if (views.panel && views.panel.viewerUrl) {
    anchors.push(ExtensionAnchor.Panel);
  }

  if (views.component && views.component.viewerUrl) {
    anchors.push(ExtensionAnchor.Component);
  }

  return anchors;
}

export function getSupportedPlatforms(views: ExtensionViews): ExtensionPlatform[] {
  const platforms = [ExtensionPlatform.Web];

  if (views.mobile && views.mobile.viewerUrl) {
    platforms.push(ExtensionPlatform.Mobile);
  }

  return platforms;
}

export type ExtensionView = {
  viewerUrl: string;
};

export type ComponentView = ExtensionView & {
  aspectHeight: number;
  aspectWidth: number;
  size: number;
  zoom: boolean;
  zoomPixels: number;
};
export type ConfigView = ExtensionView;
export type LiveConfigView = ExtensionView;
export type MobileView = ExtensionView;
export type PanelView = ExtensionView & {
  height: number;
};
export type VideoOverlayView = ExtensionView;

export type ExtensionViews = {
  [ExtensionViewType.Component]?: ComponentView;
  [ExtensionViewType.Config]?: ConfigView;
  [ExtensionViewType.LiveConfig]?: LiveConfigView;
  [ExtensionViewType.Mobile]?: MobileView;
  [ExtensionViewType.Panel]?: PanelView;
  [ExtensionViewType.VideoOverlay]?: VideoOverlayView;
};

export type ExtensionManifest = {
  anchor: string;
  assetUrls?: string[];
  authorName: string;
  bitsEnabled: boolean;
  canInstall: boolean;
  configUrl?: string;
  description: string;
  eulaTosUrl: string;
  iconUrl: string;
  iconUrls: Object;
  id: string;
  installationCount: number;
  liveConfigUrl?: string;
  name: string;
  panelHeight?: number;
  privacyPolicyUrl: string;
  requestIdentityLink: boolean;
  requiredBroadcasterAbilities?: string[];
  screenshotUrls?: string[];
  sku: string;
  state: ExtensionState;
  summary: string;
  supportEmail: string;
  vendorCode: string;
  version: string;
  viewerUrl?: string;
  viewerUrls?: Object;
  views: ExtensionViews;
  whitelistedConfigUrls: string[];
  whitelistedPanelUrls: string[];
};
