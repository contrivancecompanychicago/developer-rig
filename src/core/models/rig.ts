import * as React from 'react';
import { PositionProperty } from 'csstype';
import { ExtensionViews } from './manifest';

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

export type RigExtension = {
  authorName: string;
  id: string;
  clientId?: string;
  description: string;
  iconUrl: string;
  name: string;
  requestIdentityLink: boolean
  sku: string;
  state: string;
  summary: string;
  token: string;
  vendorCode: string;
  version: string;
  views: ExtensionViews;
  whitelistedConfigUrls: string[];
  whitelistedPanelUrls: string[];
  channelId: string;
  bitsEnabled: boolean;
};
