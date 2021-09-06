import { IModLoaderAPI } from "modloader64_api/IModLoaderAPI";
import { IOOTCore } from "modloader64_api/OOT/OOTAPI";
import { IMMCore } from 'MajorasMask/API/MMAPI';
import { LifeTransferenceSupportedCores } from "./LifeTransferenceSupportedCores";

export class LifeTransferenceCoreWrapper {
    private core: any;
    private ModLoader!: IModLoaderAPI;
    private game: LifeTransferenceSupportedCores;

    constructor(core: any, ModLoader: IModLoaderAPI) {
        this.core = core;
        this.ModLoader = ModLoader;
        if (this.ModLoader.isModLoaded(LifeTransferenceSupportedCores.OCARINA_OF_TIME)) {
            this.game = LifeTransferenceSupportedCores.OCARINA_OF_TIME;
        } else if (this.ModLoader.isModLoaded(LifeTransferenceSupportedCores.MAJORAS_MASK)) {
            this.game = LifeTransferenceSupportedCores.MAJORAS_MASK;
        }else if (this.ModLoader.isModLoaded(LifeTransferenceSupportedCores.SUPER_MARIO_64)){
            this.game = LifeTransferenceSupportedCores.SUPER_MARIO_64;
        }else if (this.ModLoader.isModLoaded(LifeTransferenceSupportedCores.BANJO_KAZOOIE)){
            this.game = LifeTransferenceSupportedCores.BANJO_KAZOOIE;
        } else {
            this.game = LifeTransferenceSupportedCores.UNKNOWN;
        }
    }

    get health(): number {
        switch (this.game) {
            case LifeTransferenceSupportedCores.OCARINA_OF_TIME:
                return (this.core as IOOTCore).save.health;
            case LifeTransferenceSupportedCores.MAJORAS_MASK:
                return (this.core as IMMCore).save.hearts;
            case LifeTransferenceSupportedCores.SUPER_MARIO_64:
                // This isn't in SM64 Core.
                return this.ModLoader.emulator.rdramRead8(0x8033B21E);
            case LifeTransferenceSupportedCores.BANJO_KAZOOIE:
                // This isn't in BK Core.
                return this.ModLoader.emulator.rdramRead8(0x80385F83);
        }
        return -1;
    }

    set health(hp: number) {
        switch (this.game) {
            case LifeTransferenceSupportedCores.OCARINA_OF_TIME:
                (this.core as IOOTCore).save.health = hp;
                break;
            case LifeTransferenceSupportedCores.MAJORAS_MASK:
                (this.core as IMMCore).save.hearts = hp;
                break;
            case LifeTransferenceSupportedCores.SUPER_MARIO_64:
                this.ModLoader.emulator.rdramWrite8(0x8033B21E, hp);
                break;
            case LifeTransferenceSupportedCores.BANJO_KAZOOIE:
                this.ModLoader.emulator.rdramWrite8(0x80385F83, hp);
                break;
        }
    }
}