import { DiscordClientConfig } from "../../discord-client";
import { HttpsRequestOptions } from "../../https-client";
export interface IGuildResponse {
    id: string;
    name: string;
    icon?: null;
    description?: null;
    splash?: null;
    discovery_splash?: null;
    features?: (null)[] | null;
    emojis?: (null)[] | null;
    banner?: null;
    owner_id: string;
    application_id?: null;
    region: string;
    afk_channel_id?: null;
    afk_timeout: number;
    system_channel_id?: null;
    widget_enabled: boolean;
    widget_channel_id?: null;
    verification_level: number;
    roles?: (RolesEntity)[] | null;
    default_message_notifications: number;
    mfa_level: number;
    explicit_content_filter: number;
    max_presences?: null;
    max_members: number;
    max_video_channel_users: number;
    vanity_url_code?: null;
    premium_tier: number;
    premium_subscription_count: number;
    system_channel_flags: number;
    preferred_locale: string;
    rules_channel_id?: null;
    public_updates_channel_id?: null;
    nsfw: boolean;
    nsfw_level: number;
    embed_enabled: boolean;
    embed_channel_id?: null;
  }
  export interface RolesEntity {
    id: string;
    name: string;
    permissions: number;
    position: number;
    color: number;
    hoist: boolean;
    managed: boolean;
    mentionable: boolean;
    permissions_new: string;
    tags?: Tags | null;
  }
  export interface Tags {
    bot_id: string;
  }
  

export function buildChannelsRequest(config: DiscordClientConfig, guildId: number): HttpsRequestOptions<void> {
    return {
        hostname: config.baseUrl,
        endpoint: `${config.apiUrl}/guilds/${guildId}`
    };
}