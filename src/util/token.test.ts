import { verify } from 'jsonwebtoken';
import { TokenSpec, createSignedToken } from './token';
import { TokenPayload } from './token';

describe('token', () => {
  const secret = 'secret';
  const role = 'rig_role';
  const ouid = 'rig_ouid';
  const uid = 'rig_uid';
  const channelId = 'rig_channel';
  const ownerId = 'rig_owner';
  const isLinked = false;

  describe('createSignedToken', () => {
    const expected = {
      opaqueUserId: ouid,
      userId: uid,
      role: role,
      channelId: channelId,
    }

    it('should leave userId out if it is not specified', () => {
      const tokenSpec = { role, secret, opaqueUserId: ouid, channelId };
      const token = createSignedToken(tokenSpec);
      const payload = verify(token, Buffer.from(secret, 'base64')) as TokenPayload;

      expect(payload.opaque_user_id).toBe(expected.opaqueUserId);
      expect(payload.channel_id).toBe(expected.channelId);
      expect(payload.role).toBe(expected.role);
      expect(payload.user_id).toBeUndefined();
    });

    it('should have userId if it is specified', () => {
      const tokenSpec = { role, secret, opaqueUserId: ouid, channelId, userId: uid };
      const token = createSignedToken(tokenSpec);
      const payload = verify(token, Buffer.from(secret, 'base64')) as TokenPayload;

      expect(payload.opaque_user_id).toBe(expected.opaqueUserId);
      expect(payload.channel_id).toBe(expected.channelId);
      expect(payload.role).toBe(expected.role);
      expect(payload.user_id).toBe(expected.userId);
    });
  });
});
