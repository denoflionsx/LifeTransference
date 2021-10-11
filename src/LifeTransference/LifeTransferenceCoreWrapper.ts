import { IModLoaderAPI } from "modloader64_api/IModLoaderAPI";
import { isMM, isOOT, LifeTransferenceSupportedCores } from "./LifeTransferenceSupportedCores";
import { IZ64Main } from 'Z64Lib/API/Common/IZ64Main';

export class LifeTransferenceCoreWrapper {
    private core: any;
    private ModLoader!: IModLoaderAPI;
    game: LifeTransferenceSupportedCores;

    constructor(core: any, ModLoader: IModLoaderAPI) {
        this.core = core;
        this.ModLoader = ModLoader;
        if (this.ModLoader.isModLoaded(LifeTransferenceSupportedCores.Z64)) {
            this.game = LifeTransferenceSupportedCores.Z64;
        } else if (this.ModLoader.isModLoaded(LifeTransferenceSupportedCores.SUPER_MARIO_64)) {
            this.game = LifeTransferenceSupportedCores.SUPER_MARIO_64;
        } else if (this.ModLoader.isModLoaded(LifeTransferenceSupportedCores.BANJO_KAZOOIE)) {
            this.game = LifeTransferenceSupportedCores.BANJO_KAZOOIE;
        } else {
            this.game = LifeTransferenceSupportedCores.UNKNOWN;
        }
    }

    get health(): number {
        switch (this.game) {
            case LifeTransferenceSupportedCores.Z64:
                if (isOOT()) {
                    return (this.core as IZ64Main).OOT!.save.health;
                } else if (isMM()) {
                    return (this.core as IZ64Main).MM!.save.hearts;
                }
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
            case LifeTransferenceSupportedCores.Z64:
                if (isOOT()) {
                    (this.core as IZ64Main).OOT!.save.health = hp;
                } else if (isMM()) {
                    (this.core as IZ64Main).MM!.save.hearts = hp;
                }
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