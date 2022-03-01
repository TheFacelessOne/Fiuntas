const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const fs = require('fs');

async function vbanButtons(target) {
	const display = new MessageActionRow()
		.addComponents(
			new MessageButton()
				.setCustomId('vban yes ' + [target.id]).setLabel('Yes').setStyle('SUCCESS'),
			new MessageButton()
				.setCustomId('vban no ' + [target.id]).setLabel('No').setStyle('DANGER'),
		);
	return display;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('vban')
		.setDescription('Starts a vote ban poll')
		.addUserOption(User => User
                  .setName('user')
                  .setDescription('user to ban')
                  .setRequired(true)
                  ),
  usage: '[user]',

	async execute(interaction) {
    const buttons = await vbanButtons(interaction.options.getUser('user'));
    const response = await interaction.reply({ content : 'vban used on **' + interaction.options.getUser('user').username + '**. Do you agree with banning them? \n Current count = 0 \n Confirmed at 10, Rejected at -1', components : [buttons]});
		
		},
  buttons : {
    'yes' : async function yes(interaction, name) {
			const GuildData = functions.serverRead(interaction.guild.id);
			let target = await interaction.guild.members.fetch(name[2]);
      
    }
  }
};