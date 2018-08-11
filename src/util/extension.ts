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
    ...manifest,
    clientId: manifest.id,
    id: manifest.id + ':' + index,
    token: createToken(role, isLinked, ownerID, channelId, secret, opaqueId),
    channelId: channelId,
  };
}
