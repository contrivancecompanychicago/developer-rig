import { ExtensionAnchor, ExtensionMode, ExtensionPlatform, ExtensionViewType } from '../../constants/extension-coordinator';

export function newMockCoordinator() {
  let coordinator = {} as any;

  coordinator.ExtensionMode = {
    Config: ExtensionMode.Config,
    Dashboard: ExtensionMode.Dashboard,
    Viewer: ExtensionMode.Viewer,
  };

  coordinator.ExtensionPlatform = {
    Mobile: ExtensionPlatform.Mobile,
    Web: ExtensionPlatform.Web,
  };

  coordinator.ExtensionAnchor = {
    Component: ExtensionAnchor.Component,
    Overlay: ExtensionAnchor.Overlay,
    Panel: ExtensionAnchor.Panel,
  };

  coordinator.ExtensionViewType = {
    Component: ExtensionViewType.Component,
    Config: ExtensionViewType.Config,
    LiveConfig: ExtensionViewType.LiveConfig,
    Mobile: ExtensionViewType.Mobile,
    Panel: ExtensionViewType.Panel,
    VideoOverlay: ExtensionViewType.VideoOverlay,
  };

  coordinator.getComponentPositionFromView = () => ({
    x: 20,
    y: 20,
  });

  coordinator.getComponentSizeFromView = () => ({
    width: 10,
    height: 10,
    zoomScale: 1024,
  });

  return coordinator;
}
