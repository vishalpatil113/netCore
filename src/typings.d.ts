/* SystemJS module definition */


declare var module: NodeModule;
interface NodeModule {
  id: string;
}

declare module "*.json" {
    const value: any;
    export default value;

}

declare var instance_name: any;
declare var server_url: any;
declare var allActiveChannels: any;
declare var login_url: string;
declare var site_url: string;
declare var firebase: any;
declare var base_url: any;
declare var report_download_limit: any;
