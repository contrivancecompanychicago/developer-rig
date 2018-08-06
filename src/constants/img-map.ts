import * as panel from '../img/panel.png';
import * as panelOff from '../img/panelOff.png';
import * as overlay from '../img/overlay.png';
import * as overlayOff from '../img/overlayOff.png';
import * as component from '../img/component.png';
import * as componentOff from '../img/componentOff.png';
import * as mobile from '../img/mobile.png';
import * as mobileOff from '../img/mobileOff.png';
import { ExtensionAnchor, ExtensionMode, ExtensionPlatform } from './extension-coordinator';

export const ViewTypeImages: { [key: string]: { on: string; off: string; } } = {
  [ExtensionAnchor.Overlay]: { on: overlay, off: overlayOff },
  [ExtensionAnchor.Panel]: { on: panel, off: panelOff },
  [ExtensionAnchor.Component]: { on: component, off: componentOff },
  [ExtensionMode.Config]: { on: panel, off: panelOff }, // TODO
  [ExtensionMode.Dashboard]: { on: panel, off: panelOff }, // TODO
  [ExtensionPlatform.Mobile]: { on: mobile, off: mobileOff },
};
