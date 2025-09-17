import { ThemedText } from '@/components/themed-text';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useApp } from '@/lib/store/AppContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image as RNImage, StyleSheet, View } from 'react-native';

type Props = {
  memorial: {
    id: string;
    name_full: string;
    date_birth: string;
    date_death: string;
    cemetery?: string;
    cover_image?: any;
  };
  onPress?: () => void;
};

function timeAgo(iso?: string) {
  if (!iso) return '';
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diff = Math.max(0, now - then);
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins} min${mins === 1 ? '' : 's'} ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs === 1 ? '' : 's'} ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days} day${days === 1 ? '' : 's'} ago`;
  const months = Math.floor(days / 30);
  return `${months} month${months === 1 ? '' : 's'} ago`;
}

export function MemorialCard({ memorial, onPress }: Props) {
  const scheme = useColorScheme() ?? 'light';
  const { posts } = useApp();
  const c = Colors[scheme];

  const latest = posts
    .filter((p) => p.memorial_id === memorial.id)
    .sort((a, b) => (a.created_at < b.created_at ? 1 : -1))[0];

  const activity = latest
    ? latest.type === 'candle'
      ? { icon: require('@/assets/images/candle.png'), label: `Candle lit ${timeAgo(latest.created_at)}` }
      : latest.type === 'message'
      ? { icon: require('@/assets/images/message.png'), label: `Message left ${timeAgo(latest.created_at)}` }
      : latest.type === 'flowers'
      ? { icon: require('@/assets/images/flower.png'), label: `Flowers placed ${timeAgo(latest.created_at)}` }
      : latest.type === 'photo'
      ? { icon: undefined as any, label: `Photo added ${timeAgo(latest.created_at)}` }
      : undefined
    : undefined;

  return (
    <Card onPress={onPress} style={[styles.card, { borderColor: c.border, backgroundColor: c.card }]}>
      <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
        {/* Framed photo */}
        {memorial.cover_image ? (
          <View style={[styles.avatarWrap, { borderColor: c.gold, backgroundColor: c.background }] }>
            <RNImage source={memorial.cover_image} style={styles.avatar} />
          </View>
        ) : (
          <View style={[styles.avatarWrap, { borderColor: c.border, backgroundColor: c.card, alignItems: 'center', justifyContent: 'center' }]}>
            <MaterialIcons name="person" size={40} color={c.tint as any} />
          </View>
        )}

        <View style={{ flex: 1, gap: 10 }}>
          <ThemedText type="defaultSemiBold" style={{ fontSize: 22 }}>{memorial.name_full}</ThemedText>
          <ThemedText style={{ color: c.silver, fontWeight: '700', fontSize: 18 }}>
            {`${memorial.date_birth} · ${memorial.date_death}`}
          </ThemedText>
          {memorial.cemetery ? (
            <ThemedText style={{ color: c.silver, fontWeight: '700' }}>
              {memorial.cemetery}
            </ThemedText>
          ) : null}
          {activity ? (
            <View style={{ marginTop: 12 }}>
              <Badge
                iconSource={activity.icon}
                iconSize={20}
                background={scheme === 'dark' ? 'rgba(199,169,141,0.18)' : 'rgba(199,169,141,0.18)'}
                color={c.tint as any}
              >
                {activity.label}
              </Badge>
            </View>
          ) : null}
        </View>

        <MaterialIcons name="chevron-right" size={22} color={c.muted as any} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  avatarWrap: {
    width: 60,
    height: 60,
    borderRadius: 26,
    borderWidth: 1,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 99,
  },
});

export default MemorialCard;
