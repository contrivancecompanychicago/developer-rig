import * as React from 'react';
import { ExtensionView } from '../extension-view';
import { ExtensionViewButton } from '../extension-view-button';
import { ExtensionMode } from '../constants/extension-coordinator';
import './component.sass';
import { RigExtensionView, RigExtension } from '../core/models/rig';
import { ConfigNames } from '../constants/nav-items'

interface ExtensionViewContainerProps {
  extensionViews: RigExtensionView[];
  openEditViewHandler?: (id: string) => void;
  deleteExtensionViewHandler: (id: string) => void;
  openExtensionViewHandler: Function;
}

type Props = ExtensionViewContainerProps;

export class ExtensionViewContainer extends React.Component<Props> {
  private openExtensionViewDialog = () => {
    this.props.openExtensionViewHandler();
  }

  public render() {
    let extensionViews: JSX.Element[] = [];
    if (this.props.extensionViews && this.props.extensionViews.length > 0) {
      extensionViews = this.props.extensionViews.map(view => {
        const role = view.mode === ExtensionMode.Viewer ? view.role : ConfigNames[view.mode];
        return <ExtensionView
          key={view.id}
          id={view.id}
          channelId={view.extension.channelId}
          extension={view.extension}
          type={view.type}
          mode={view.mode}
          role={role}
          frameSize={view.frameSize}
          position={{ x: view.x, y: view.y }}
          linked={view.linked}
          orientation={view.orientation}
          openEditViewHandler={this.props.openEditViewHandler}
          deleteViewHandler={this.props.deleteExtensionViewHandler} />
      });
    }

    return (
      <div className='view-container-wrapper'>
        <div className="view-container">
          {extensionViews}
        </div>
        <div>
          <ExtensionViewButton
            onClick={this.openExtensionViewDialog}>
          </ExtensionViewButton>
        </div>
      </div>
    );
  }
}
