import RPC from 'discord-rpc';
import { useRpcStore } from '@/store/rpc';

export default function useDiscord(clientId: string) {
    const rpcStore = useRpcStore();
    RPC.register(clientId);

    const client = new RPC.Client({ transport: 'ipc' });

    function setActivity() {
        const activityOptions = rpcStore.track.name
            ? {
                details: `Слушает: ${rpcStore.track.name}`,
                state: rpcStore.track.artists,
                largeImageKey: rpcStore.track.image,
                smallImageKey: 'yandex-rpc'
            }
            : {
                details: 'Ничего не слушает',
                largeImageKey: 'yandex-rpc'
            };

        client.setActivity(activityOptions);
    }

    client.on('ready', () => {
        setActivity();

        setInterval(() => {
            setActivity();
        }, 15e3);
    });

    client.login({ clientId });
}
