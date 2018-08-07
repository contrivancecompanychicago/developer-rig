import { ExtensionMode } from './extension-coordinator';

export const ExtensionViews = 'Extension Views';
export const ProductManagement = 'Product Management';

export const ConfigNames: { [key: string]: string; } = {
  [ExtensionMode.Config]: 'Broadcaster Config',
  [ExtensionMode.Dashboard]: 'Live Config',
};
