import { createExtensionObject } from './extension';
import { ViewerTypes } from '../constants/viewer-types';
import { createToken } from './token';

describe('extension', () => {
  const manifest = {
    anchor: 'panel',
    authorName: 'test',
    id: 'id',
    description: 'desc',
    iconUrl: 'test.png',
    iconUrls: ['test'],
    name: 'test',
    requestIdentityLink: false,
    sku: 'sku',
    state: 'state',
    summary: 'summary',
    vendorCode: 'vendorCode',
    views: {
      panel: {
        viewerUrl: 'test',
      },
    },
    version: '0.1',
    whitelistedConfigUrls: ['test'],
    whitelistedPanelUrls: ['test'],
    bitsEnabled: false,
    canInstall: true,
    eulaTosUrl: 'test.biz',
    supportEmail: 'test@test.biz',
    privacyPolicyUrl: 'test.biz',
    installationCount: -42,
  };
  const index = '0';
  const role = ViewerTypes.LoggedOut;
  const isLinked = false;
  const ownerID = 'test';
  const channelId = 'test';
  const secret = 'test';
  const opaqueId = 'testOpaqueId';

  it('creates an extension with the correct data', () => {
    const expected = {
      authorName: manifest.authorName,
      clientId: manifest.id,
      description: manifest.description,
      iconUrl: manifest.iconUrl,
      id: manifest.id + ':' + index,
      name: manifest.name,
      requestIdentityLink: manifest.requestIdentityLink,
      sku: manifest.sku,
      state: manifest.state,
      summary: manifest.summary,
      token: createToken(role, isLinked, ownerID, channelId, secret, opaqueId),
      vendorCode: manifest.vendorCode,
      version: manifest.version,
      views: manifest.views,
      whitelistedConfigUrls: manifest.whitelistedConfigUrls,
      whitelistedPanelUrls: manifest.whitelistedPanelUrls,
      channelId: channelId,
      bitsEnabled: manifest.bitsEnabled,
    };
    const result = createExtensionObject(manifest, index, role, isLinked, ownerID, channelId, secret, opaqueId);
    expect(result).toEqual(expected);
  });
});
