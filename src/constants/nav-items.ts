import { ExtensionMode } from './extension-coordinator';

export const ExtensionViews = 'Extension Views';
export const ProductManagement = 'Product Management';

export const ConfigNames: { [key: string]: string; } = {
  [ExtensionMode.Config]: 'Broadcaster Configuration',
  [ExtensionMode.Dashboard]: 'Broadcaster Live Dashboard',
};
