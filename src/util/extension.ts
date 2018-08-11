import { createToken } from './token';
import { ExtensionManifest } from '../core/models/manifest';
import { RigExtension } from '../core/models/rig';

export function createExtensionObject(
  manifest: ExtensionManifest,
  index: string,
  role: string,
  isLinked: boolean,
  ownerID: string,
  channelId: string,
  secret: string,
  opaqueId: string): RigExtension
{
  return {
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
}
