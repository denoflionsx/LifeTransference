import { Z64LibSupportedGames } from "Z64Lib/API/Utilities/Z64LibSupportedGames";
import { Z64_GAME } from "Z64Lib/src/Common/types/GameAliases";
import { IZ64Main } from "Z64Lib/API/Common/IZ64Main";

export const enum LifeTransferenceSupportedCores {
    UNKNOWN = "",
    Z64 = "Z64Lib",
    SUPER_MARIO_64 = "SuperMario64",
    BANJO_KAZOOIE = "BanjoKazooie"
}

export function isOOT(){
    return Z64_GAME === Z64LibSupportedGames.OCARINA_OF_TIME;
}

export function isMM(){
    return Z64_GAME === Z64LibSupportedGames.MAJORAS_MASK;
}

export function isTitleScreen(core: any){
    if (isOOT()){
        return (core as IZ64Main).OOT!.helper.isTitleScreen();
    }else if (isMM()){
        return (core as IZ64Main).MM!.helper.isTitleScreen();
    }else{
        return false;
    }
}