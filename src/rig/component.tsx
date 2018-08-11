import * as React from 'react';
import './component.sass';
import { RigNav } from '../rig-nav';
import { ExtensionViewContainer } from '../extension-view-container';
import { Console } from '../console';
import { ExtensionViewDialog } from '../extension-view-dialog';
import { RigConfigurationsDialog } from '../rig-configurations-dialog';
import { EditViewDialog, EditViewProps } from '../edit-view-dialog';
import { ProductManagementViewContainer } from '../product-management-container';
import { missingConfigurations } from '../util/errors';
import { createSignedToken } from '../util/token';
import { fetchExtensionManifest, fetchUserByName, fetchUserInfo } from '../util/api';
import { Labels } from '../constants/nav-items'
import { OverlaySizes } from '../constants/overlay-sizes';
import { IdentityOptions } from '../constants/identity-options';
import { MobileSizes } from '../constants/mobile';
import { ViewerTypes } from '../constants/viewer-types';
import { RigRole } from '../constants/rig';
import { RigExtensionView, RigExtension } from '../core/models/rig';
import { ExtensionManifest } from '../core/models/manifest';
import { UserSession } from '../core/models/user-session';
import { SignInDialog } from '../sign-in-dialog';
import { ExtensionMode, ExtensionViewType } from '../constants/extension-coordinator';

const idSource: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const idLength: number = 15;

export interface ReduxStateProps {
  session: UserSession;
}

export interface ReduxDispatchProps {
  saveManifest: (manifest: ExtensionManifest) => void;
  userLogin: (userSession: UserSession) => void;
}

interface State {
  apiHost: string;
  clientId: string;
  secret: string;
  version: string;
  channelId: string;
  ownerName: string;
  extensionViews: RigExtensionView[],
  manifest: ExtensionManifest;
  showExtensionsView: boolean;
  showConfigurations: boolean;
  showEditView: boolean;
  idToEdit: string;
  selectedView: string;
  userId?: string;
  error?: string;
}

type Props = ReduxDispatchProps & ReduxStateProps;

export class RigComponent extends React.Component<Props, State> {
  public state: State = {
    apiHost: process.env.API_HOST || 'api.twitch.tv',
    clientId: process.env.EXT_CLIENT_ID,
    secret: process.env.EXT_SECRET,
    version: process.env.EXT_VERSION,
    channelId: process.env.EXT_CHANNEL_ID,
    ownerName: process.env.EXT_OWNER_NAME,
    extensionViews: [],
    manifest: {} as ExtensionManifest,
    showExtensionsView: false,
    showConfigurations: false,
    showEditView: false,
    idToEdit: '0',
    selectedView: Labels.ExtensionViews,
  }

  constructor(props: Props) {
    super(props);
    this.setLogin();
  }

  public componentDidMount() {
    this.initLocalStorage();
    this.fetchInitialConfiguration();
  }

  public openConfigurationsHandler = () => {
    this.setState({
      showConfigurations: true,
    });
  }

  public closeConfigurationsHandler = () => {
    this.setState({
      showConfigurations: false,
    });
  }

  public openEditViewHandler = (id: string) => {
    this.setState({
      showEditView: true,
      idToEdit: id,
    });
  }

  public closeEditViewHandler = () => {
    this.setState({
      showEditView: false,
      idToEdit: '0',
    });
  }

  public viewerHandler = () => {
    this.setState({
      selectedView: Labels.ExtensionViews,
    });
  }

  private openProductManagementHandler = () => {
    this.setState({
      selectedView: Labels.ProductManagement,
    });
  }

  public openExtensionViewHandler = () => {
    if (!this.state.error) {
      this.setState({
        showExtensionsView: true,
      });
    }
  }

  public closeExtensionViewDialog = () => {
    this.setState({
      showExtensionsView: false
    });
  }

  private refreshConfigurationsHandler = () => {
    const token = createSignedToken(RigRole, '', this.state.userId, this.state.channelId, this.state.secret);
    fetchExtensionManifest(this.state.apiHost, this.state.clientId, this.state.version, token)
      .then(this.onConfigurationSuccess)
      .catch(this.onConfigurationError);
  }

  public onConfigurationSuccess = (manifest: any) => {
    this.props.saveManifest(manifest);
    this.setState({ manifest });
  }

  public onConfigurationError = (errMsg: string) => {
    this.setState({
      error: errMsg,
    });
  }

  public getFrameSizeFromDialog(extensionViewDialogState: any) {
    if (extensionViewDialogState.frameSize === 'Custom') {
      return {
        width: extensionViewDialogState.width,
        height: extensionViewDialogState.height
      };
    }
    if (extensionViewDialogState.extensionViewType === ExtensionViewType.Mobile) {
      return MobileSizes[extensionViewDialogState.frameSize];
    }

    return OverlaySizes[extensionViewDialogState.frameSize];
  }

  public createExtensionObject(
    manifest: ExtensionManifest,
    index: string,
    role: string,
    isLinked: boolean,
    ownerID: string,
    channelId: string,
    secret: string,
    opaqueId: string): RigExtension {
    const opaque = opaqueId ?
      opaqueId :
      Array(idLength).fill(0).map(_ => idSource.charAt(Math.floor(Math.random() * idSource.length))).join('');
    let token;
    switch (role) {
      case ViewerTypes.LoggedOut:
        token = createSignedToken('viewer', 'ARIG' + opaque, '', channelId, secret)
      case ViewerTypes.LoggedIn:
        if (isLinked) {
          token = createSignedToken('viewer', 'URIG' + opaque, 'RIG' + ownerID, channelId, secret)
        } else {
          token = createSignedToken('viewer', 'URIG' + opaque, '', channelId, secret)
        }
      case ViewerTypes.Broadcaster:
        token = createSignedToken('broadcaster', 'URIG' + opaque, 'RIG' + ownerID, channelId, secret)
      default:
        token = createSignedToken(RigRole, 'ARIG' + opaque, '', channelId, secret);
    }
    return {
      ...manifest,
      clientId: manifest.id,
      id: manifest.id + ':' + index,
      token,
      channelId,
    };
  }

  public createExtensionView = (extensionViewDialogState: any) => {
    const extensionViews = this.getExtensionViews();
    const mode = extensionViewDialogState.extensionViewType === ExtensionMode.Config ? ExtensionMode.Config :
      extensionViewDialogState.extensionViewType === ExtensionMode.Dashboard ? ExtensionMode.Dashboard : ExtensionMode.Viewer;
    const linked = extensionViewDialogState.identityOption === IdentityOptions.Linked ||
      extensionViewDialogState.extensionViewType === ExtensionMode.Config ||
      extensionViewDialogState.extensionViewType === ExtensionMode.Dashboard;
    const nextExtensionViewId = extensionViews.reduce((a: number, b: RigExtensionView) => Math.max(a, parseInt(b.id, 10)), 0) + 1;
    extensionViews.push({
      id: nextExtensionViewId.toString(),
      type: extensionViewDialogState.extensionViewType,
      extension: this.createExtensionObject(
        this.state.manifest,
        nextExtensionViewId.toString(),
        extensionViewDialogState.viewerType,
        linked,
        this.state.ownerName,
        this.state.channelId,
        this.state.secret,
        extensionViewDialogState.opaqueId,
      ),
      linked,
      mode,
      role: extensionViewDialogState.viewerType,
      x: extensionViewDialogState.x,
      y: extensionViewDialogState.y,
      orientation: extensionViewDialogState.orientation,
      frameSize: this.getFrameSizeFromDialog(extensionViewDialogState),
    });
    this.pushExtensionViews(extensionViews);
    this.closeExtensionViewDialog();
  }

  public deleteExtensionView = (id: string) => {
    this.pushExtensionViews(this.state.extensionViews.filter(element => element.id !== id));
  }

  public editViewHandler = (newViewState: EditViewProps) => {
    const views = this.getExtensionViews();
    views.forEach((element: RigExtensionView) => {
      if (element.id === this.state.idToEdit) {
        element.x = newViewState.x;
        element.y = newViewState.y;
        element.orientation = newViewState.orientation;
      }
    });
    this.pushExtensionViews(views);
    this.closeEditViewHandler();
  }

  public render() {
    const view = this.state.selectedView === Labels.ProductManagement ? (
      <ProductManagementViewContainer clientId={this.state.clientId} />
    ) : (
      <div>
        <ExtensionViewContainer
          extensionViews={this.state.extensionViews}
          deleteExtensionViewHandler={this.deleteExtensionView}
          openExtensionViewHandler={this.openExtensionViewHandler}
          openEditViewHandler={this.openEditViewHandler} />
        {this.state.showExtensionsView &&
          <ExtensionViewDialog
            extensionViews={this.state.manifest.views}
            show={this.state.showExtensionsView}
            closeHandler={this.closeExtensionViewDialog}
            saveHandler={this.createExtensionView} />}
        {this.state.showEditView &&
          <EditViewDialog
            idToEdit={this.state.idToEdit}
            show={this.state.showEditView}
            views={this.getExtensionViews()}
            closeHandler={this.closeEditViewHandler}
            saveViewHandler={this.editViewHandler}
          />}
        {this.state.showConfigurations && <RigConfigurationsDialog
          config={this.state.manifest}
          closeConfigurationsHandler={this.closeConfigurationsHandler}
          refreshConfigurationsHandler={this.refreshConfigurationsHandler} />}
        {!this.props.session && <SignInDialog />}
        <Console />
      </div>
    );

    return (
      <div className="rig-container">
        <RigNav
          selectedView={this.state.selectedView}
          viewerHandler={this.viewerHandler}
          openConfigurationsHandler={this.openConfigurationsHandler}
          openProductManagementHandler={this.openProductManagementHandler}
          error={this.state.error} />
        {view}
      </div>
    );
  }

  public getExtensionViews() {
    const extensionViewsValue = localStorage.getItem("extensionViews");
    return extensionViewsValue ? JSON.parse(extensionViewsValue) : extensionViewsValue;
  }

  public pushExtensionViews(newViews: RigExtensionView[]) {
    localStorage.setItem("extensionViews", JSON.stringify(newViews));
    this.setState({
      extensionViews: newViews,
    });
  }

  private fetchInitialConfiguration() {
    if (this.state.ownerName) {
      if (this.state.clientId && this.state.version && this.state.channelId && this.state.secret) {
        fetchUserByName(this.state.apiHost, this.state.clientId, this.state.ownerName).then((user) => {
          const userId = user['id'];
          this.setState({ userId });
          const token = createSignedToken(RigRole, '', userId, this.state.channelId, this.state.secret);
          return fetchExtensionManifest(this.state.apiHost, this.state.clientId, this.state.version, token);
        })
          .then(this.onConfigurationSuccess)
          .catch(this.onConfigurationError);
      } else {
        this.onConfigurationError(missingConfigurations({
          'EXT_CLIENT_ID': this.state.clientId,
          'EXT_VERSION': this.state.version,
          'EXT_CHANNEL': this.state.channelId,
          'EXT_SECRET': this.state.secret,
        }));
      }
    }
  }

  private initLocalStorage() {
    const extensionViewsValue = localStorage.getItem("extensionViews");
    if (extensionViewsValue) {
      const extensionViews = JSON.parse(extensionViewsValue);
      extensionViews.forEach((view: RigExtensionView, index: number) => view.id = (index + 1).toString());
      this.setState({ extensionViews });
    } else {
      localStorage.setItem("extensionViews", JSON.stringify([]));
    }
  }

  private setLogin() {
    const windowHash = window.location.hash;
    const rigLogin = localStorage.getItem('rigLogin');
    if (windowHash.includes('access_token')) {
      const accessTokenKey = 'access_token=';
      const accessTokenIndex = windowHash.indexOf(accessTokenKey);
      const ampersandIndex = windowHash.indexOf('&');
      const accessToken = windowHash.substring(accessTokenIndex + accessTokenKey.length, ampersandIndex);
      fetchUserInfo(accessToken)
        .then(resp => {
          const userSess = {
            login: resp.login,
            authToken: accessToken,
            profileImageUrl: resp.profile_image_url,
          }
          this.state.ownerName = resp.login;
          this.props.userLogin(userSess);
          localStorage.setItem('rigLogin', JSON.stringify(userSess));
          window.location.assign('/');
        })
        .catch(error => {
          this.setState({
            error,
          });
        });
    }
    else if (rigLogin) {
      const login = JSON.parse(rigLogin);
      this.state.ownerName = login.login;
      this.props.userLogin({
        login: login.login,
        authToken: login.authToken,
        profileImageUrl: login.profileImageUrl,
      });
    }
  }
}
