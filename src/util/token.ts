import { ViewerTypes } from '../constants/viewer-types';
import { RigRole } from '../constants/rig';
import { sign } from 'jsonwebtoken';

const OneYearMS: number = 365 * 24 * 60 * 60 * 1000;

interface PubsubPerms {
  listen?: string[];
  send?: string[];
}

export interface TokenPayload {
  exp: number;
  user_id?: string;
  opaque_user_id: string;
  channel_id?: string;
  role: string;
  pubsub_perms: PubsubPerms;
}

export type TokenSpec = {
  role: string,
  secret: string,
  opaqueUserId?: string,
  channelId?: string,
  userId?: string,
};

export function createSignedToken(tokenSpec: TokenSpec): string {
  const { role, secret, opaqueUserId, channelId, userId } = tokenSpec;
  const pubsub_perms: PubsubPerms = {
    listen: ['broadcast', 'global'],
  }
  if (role === 'broadcaster') {
    pubsub_perms.send = ['broadcast']
  } else if (role === RigRole) {
    pubsub_perms.send = ['*']
    pubsub_perms.listen = ['*']
  }

  const payload: TokenPayload = {
    exp: Math.floor(((Date.now() + OneYearMS) / 1000)),
    opaque_user_id: opaqueUserId || '',
    role,
    pubsub_perms,
  };
  if (channelId) {
    payload['channel_id'] = channelId;
  }
  if (userId) {
    payload['user_id'] = userId;
  }

  return sign(payload, new Buffer(secret, 'base64'), { algorithm: 'HS256' });
}
