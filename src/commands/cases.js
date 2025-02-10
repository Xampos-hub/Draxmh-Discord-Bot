import { EmbedBuilder } from 'discord.js';
import { getRecentCases } from '../utils/moderationLog.js';

export const casesCommand = {
    name: 'cases',
    description: 'View recent moderation cases',
    execute(message, args) {
        const cases = getRecentCases();

        const embed = new EmbedBuilder()
            .setTitle('📊 Recent Moderation Cases')
            .setColor('#0099ff')
            .setDescription(cases.length ? 
                cases.map(c => 
                    `**Case ${c.id} - ${c.type}**\n` +
                    `• User: ${c.user}\n` +
                    `• Moderator: ${c.moderator}\n` +
                    `• Reason: ${c.reason}\n` +
                    `• Date: ${c.timestamp.toLocaleDateString()}`
                ).join('\n\n')
                : 'No recent cases found.'
            )
            .setTimestamp();

        message.reply({ embeds: [embed] });
    }
};
