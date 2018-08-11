import * as React from 'react';
import { PositionProperty } from 'csstype';
import { ExtensionManifest, ExtensionViews } from './manifest';

export type RigExtensionView = {
  x: number;
  y: number;
  orientation: string;
  id: string;
  extension: RigExtension;
  type: string;
  mode: string;
  role: string;
  linked: boolean;
  deleteViewHandler: (id: string) => void;
  openEditViewHandler: (id: string) => void;
  position?: Position;
  frameSize?: FrameSize;
};

export type FrameSize = {
  height: number;
  width: number;
};

export type RigExtension = ExtensionManifest & {
  clientId?: string;
  token: string;
  channelId: string;
  bitsEnabled: boolean;
};
