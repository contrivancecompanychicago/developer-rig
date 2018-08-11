import { ExtensionAnchor, ExtensionPlatform } from '../../constants/extension-coordinator';

export function getSupportedAnchors(views: ManifestViews): ExtensionAnchor[] {
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
export function getSupportedPlatforms(views: ManifestViews): ExtensionPlatform[] {
  const platforms = [ExtensionPlatform.Web];

  if (views.mobile && views.mobile.viewerUrl) {
    platforms.push(ExtensionPlatform.Mobile);
  }

  return platforms;
}

export interface ManifestView {
  aspectHeight?: number;
  aspectWidth?: number;
  size?: number;
  zoom?: boolean;
  zoomPixels?: number;
  height?: number;
  viewerUrl: string;
}

export interface ManifestViews {
  config?: ManifestView;
  liveConfig?: ManifestView;
  panel?: ManifestView;
  videoOverlay?: ManifestView;
  mobile?: ManifestView;
  component?: ManifestView;
}

export interface ExtensionManifest {
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
  state: string;
  summary: string;
  supportEmail: string;
  vendorCode: string;
  version: string;
  viewerUrl?: string;
  viewerUrls?: Object;
  views: ManifestViews;
  whitelistedConfigUrls: string[];
  whitelistedPanelUrls: string[];
}
