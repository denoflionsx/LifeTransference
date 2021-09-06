import { onTick, Preinit } from 'modloader64_api/PluginLifecycle';
import { InjectCore } from 'modloader64_api/CoreInjection';
import { LifeTransferenceStorage } from './LifeTransferenceStorage';
import { LifeTransferencePacket } from './LifeTransferencePackets';
import { IModLoaderAPI } from 'modloader64_api/IModLoaderAPI';
import { ModLoaderAPIInject } from "modloader64_api/ModLoaderAPIInjector";
import { NetworkHandler } from 'modloader64_api/NetworkHandler';
import { LifeTransferenceCoreWrapper } from './LifeTransferenceCoreWrapper';

export class LifeTransferenceClient{

    @InjectCore()
    core!: any;
    wrapper!: LifeTransferenceCoreWrapper;
    @ModLoaderAPIInject()
    ModLoader!: IModLoaderAPI;
    storage: LifeTransferenceStorage = new LifeTransferenceStorage();

    @Preinit()
    preinit(){
        this.wrapper = new LifeTransferenceCoreWrapper(this.core, this.ModLoader);
    }

    @onTick()
    onTick(frame: number){
        if (this.core.helper.isTitleScreen() || !this.core.helper.isSceneNumberValid()){
            return;
        }
        if (this.wrapper.health !== this.storage.health){
            this.storage.health = this.wrapper.health;
            let packet: LifeTransferencePacket = new LifeTransferencePacket(this.storage.health, this.ModLoader.clientLobby);
            this.ModLoader.clientSide.sendPacket(packet);
        }
    }

    @NetworkHandler('LifeTransferencePacket')
    onLifeTransference(packet: LifeTransferencePacket){
        if (this.wrapper.health !== packet.health){
            this.wrapper.health = packet.health;
            this.storage.health = packet.health;
        }
    }

}