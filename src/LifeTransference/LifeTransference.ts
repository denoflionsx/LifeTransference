import { IModLoaderAPI } from 'modloader64_api/IModLoaderAPI';
import { LifeTransferenceClient } from './LifeTransferenceClient';
import { SidedProxy, ProxySide } from 'modloader64_api/SidedProxy/SidedProxy';

export default class LifeTransference {

    ModLoader!: IModLoaderAPI;
    @SidedProxy(ProxySide.CLIENT, LifeTransferenceClient)
    client!: LifeTransferenceClient;

}