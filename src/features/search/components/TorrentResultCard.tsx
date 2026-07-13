import {
  TorrentCard,
  TorrentCardProps,
} from '@/features/torrents/components/TorrentCard';
import { Torrent } from '@/models/torrent';

type TorrentResultCardProps = Omit<TorrentCardProps, 'onPress' | 'torrent'> & {
  torrent: Torrent;
  onPress?: (torrent: Torrent) => void;
};

export function TorrentResultCard({
  torrent,
  onPress,
  onDetailsPress,
  ...props
}: TorrentResultCardProps) {
  return (
    <TorrentCard
      onDetailsPress={onDetailsPress ?? onPress}
      onPress={onPress}
      torrent={torrent}
      {...props}
    />
  );
}
