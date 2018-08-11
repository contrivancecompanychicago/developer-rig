import { ExtensionMode } from './extension-coordinator';

export const Labels: { [key: string]: string } = {
  ExtensionViews: 'Extension Views',
  ProductManagement: 'Product Management',
};

export const ConfigNames: { [key: string]: string; } = {
  [ExtensionMode.Config]: 'Broadcaster Configuration',
  [ExtensionMode.Dashboard]: 'Broadcaster Live Dashboard',
};
