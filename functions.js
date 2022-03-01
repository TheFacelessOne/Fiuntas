module.exports = {
  permsCheck,
  serverRead,
  serverJoin  
}

const fs = require('fs');

function permsCheck(msg, command) {
	const GuildData = serverRead(msg.guild.id);
	const isAdmin = msg.member.permissions.has('ADMINISTRATOR');
	const hasPerms = msg.member.roles.cache.some(role => GuildData['Permissions'][command.data.name].includes(role.id));
	const everyoneCanUse = command.everyone;
	return isAdmin || hasPerms || everyoneCanUse;
}

function serverRead(server) {
	if (!fs.existsSync('./Server Data/' + server + '.json')) {
		serverJoin(server);
	}
	return JSON.parse(fs.readFileSync('./Server Data/' + server + '.json'));
}

function serverJoin(newServer) {
	const newServerFile = './Server Data/' + newServer + '.json';
	if (fs.existsSync(newServerFile)) return;
	fs.copyFileSync('./Read Only/Settings.json', newServerFile);
	console.log('Joined new server ' + newServer.toString());
}

function voteAdd(interaction, user, increase) {
	const GuildData = serverRead(interaction.guild.id);
  
  
  
}

function serverUpdate(interaction, GuildData) {
	fs.writeFileSync('./Server Data/' + interaction.guild.id + '.json', JSON.stringify(GuildData, null, 2));
	console.log(interaction.guild.id.toString() + ' JSON updated');
}