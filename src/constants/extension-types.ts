import { ExtensionAnchor, ExtensionMode, ExtensionPlatform } from './extension-coordinator';

export const ExtensionAnchors: { [key: string]: string } = {
  [ExtensionAnchor.Overlay]: 'Overlay',
  [ExtensionAnchor.Panel]: 'Panel',
  [ExtensionAnchor.Component]: 'Component',
  [ExtensionMode.Config]: 'Configuration',
  [ExtensionMode.Dashboard]: 'Dashboard',
  [ExtensionPlatform.Mobile]: 'Mobile',
};
export const DefaultExtensionType = ExtensionAnchor.Overlay;
