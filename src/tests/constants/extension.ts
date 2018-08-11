import { MobileOrientation } from '../../constants/mobile';
import { ExtensionManifest } from '../../core/models/manifest';
import { RigExtensionView } from '../../core/models/rig';
import { ExtensionMode, ExtensionState } from '../../constants/extension-coordinator';

export const ManifestForTest: ExtensionManifest = {
  anchor: 'panel',
  authorName: 'test',
  bitsEnabled: true,
  canInstall: true,
  configUrl: 'test',
  description: 'test',
  eulaTosUrl: 'test.com',
  iconUrl: 'test.com',
  iconUrls: {},
  id: 'test',
  installationCount: 0,
  liveConfigUrl: 'test.com',
  name: 'test',
  panelHeight: 300,
  privacyPolicyUrl: 'test.com',
  requestIdentityLink: false,
  requiredBroadcasterAbilities: ['test'],
  screenshotUrls: ['test.png'],
  sku: 'test',
  state: ExtensionState.Testing,
  summary: 'test',
  supportEmail: 'test',
  vendorCode: 'test',
  version: '0.0.1',
  views: {
    panel: {
      viewerUrl: 'test',
      height: 300,
    },
    config: {
      viewerUrl: 'test',
    },
    liveConfig: {
      viewerUrl: 'test',
    },
    component: {
      aspectHeight: 3000,
      aspectWidth: 2500,
      size: 0,
      zoom: false,
      zoomPixels: 1024,
      viewerUrl: 'test',
    }
  },
  whitelistedConfigUrls: [],
  whitelistedPanelUrls: [],
};

export const ExtensionForTest = {
  anchor: 'panel',
  authorName: 'test',
  canInstall: true,
  id: 'id',
  installationCount: 0,
  description: 'description',
  eulaTosUrl: 'test.biz',
  iconUrl: 'iconUrl',
  iconUrls: {},
  name: 'name',
  panelHeight: 300,
  privacyPolicyUrl: 'test.com',
  requestIdentityLink: false,
  requiredBroadcasterAbilities: ['test'],
  screenshotUrls: ['test.png'],
  sku: 'sku',
  state: ExtensionState.Testing,
  summary: 'summary',
  token: 'token',
  supportEmail: 'test',
  vendorCode: 'vendorCode',
  version: '0.1',
  views: {
    panel: {
      viewerUrl: 'test',
      height: 300,
    },
    config: {
      viewerUrl: 'test',
    },
    liveConfig: {
      viewerUrl: 'test',
    },
    videoOverlay: {
      viewerUrl: 'test',
    },
    mobile: {
      viewerUrl: 'test',
    },
    component: {
      aspectHeight: 3000,
      aspectWidth: 2500,
      size: 0,
      zoom: false,
      zoomPixels: 1024,
      viewerUrl: 'test',
    }
  },
  whitelistedConfigUrls: ['foo'],
  whitelistedPanelUrls: ['bar'],
  channelId: 'channelId',
  bitsEnabled: false,
};

export function createViewsForTest(numOfViews: number, type: string, role: string, extras?: any): Partial<RigExtensionView>[] {
  let ex = {
    x: 0,
    y: 0,
    orientation: MobileOrientation.Portrait,
  };
  const extViews = [];
  if (extras) {
    ex.x = extras.x;
    ex.y = extras.y;
  }

  for (let i = 0; i < numOfViews; i++) {
    extViews.push({
      id: (extViews.length + 1).toString(),
      type: type,
      mode: 'viewer',
      extension: ExtensionForTest,
      linked: false,
      role: role,
      x: ex.x,
      y: ex.y,
      orientation: ex.orientation,
    });
  }
  return extViews;
}
