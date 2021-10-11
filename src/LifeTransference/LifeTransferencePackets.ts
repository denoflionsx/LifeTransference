import { Packet } from 'modloader64_api/ModLoaderDefaultImpls';

export class LifeTransferencePacket extends Packet {

    health: number;

    constructor(health: number, lobby: string) {
        super('LifeTransferencePacket', 'LifeTransferencePacket', lobby, true);
        this.health = health;
    }
}