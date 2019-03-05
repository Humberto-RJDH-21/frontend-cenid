import {environment} from '../../environments/environment'


export class ServicesCommon {

  public static GATEWAY_URL_BASE(): string {
    console.log('Evironment usado en la aplicacion ---> ', environment.gateWayUrl);
    return environment.gateWayUrl
  }

}
