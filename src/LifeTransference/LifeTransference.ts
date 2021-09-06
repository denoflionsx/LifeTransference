import {IPlugin, IModLoaderAPI} from 'modloader64_api/IModLoaderAPI';
import {IOOTCore} from 'modloader64_api/OOT/OOTAPI';
import {InjectCore} from 'modloader64_api/CoreInjection';
import { LifeTransferenceClient } from './LifeTransferenceClient';
import { SidedProxy, ProxySide } from 'modloader64_api/SidedProxy/SidedProxy';

class LifeTransference implements IPlugin{

    ModLoader!: IModLoaderAPI;
    pluginName?: string | undefined;
    @InjectCore()
    core!: IOOTCore;
    @SidedProxy(ProxySide.CLIENT, LifeTransferenceClient)
    client!: LifeTransferenceClient;

    preinit(): void {
    }
    init(): void {
    }
    postinit(): void {
    }
    onTick(frame?: number | undefined): void {
    }
}

module.exports = LifeTransference;