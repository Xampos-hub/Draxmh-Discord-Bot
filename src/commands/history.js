import { EmbedBuilder } from 'discord.js';
import { getUserCases } from '../utils/moderationLog.js';

export const historyCommand = {
    name: 'history',
    description: 'View user moderation history',
    execute(message, args) {
        const user = message.mentions.users.first() || message.author;
        const cases = getUserCases(user.id);

        const embed = new EmbedBuilder()
            .setTitle(`📋 Moderation History for ${user.tag}`)
            .setColor('#0099ff')
            .setDescription(cases.length ? 
                cases.map(c => 
                    `**Case ${c.id} - ${c.type}**\n` +
                    `• Moderator: ${c.moderator}\n` +
                    `• Reason: ${c.reason}\n` +
                    `• Date: ${c.timestamp.toLocaleDateString()}`
                ).join('\n\n')
                : 'No moderation history found.'
            )
            .setTimestamp();

        message.reply({ embeds: [embed] });
    }
};
