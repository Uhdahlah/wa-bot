let handler = async (m, { conn, participants }) => {
  // if (participants.map(v=>v.jid).includes(global.conn.user.jid)) {
    global.db.data.chats[m.chat].isBanned = true
    m.reply('_berhasil mematikan bot untuk chat ini untuk *admin* ketik *#unbanchat* untuk menyalakan bot kembali_')
  // } else m.reply('Ada nomor host disini...')
}
handler.help = ['banchat']
handler.tags = ['admin']
handler.command = /^banchat$/i
handler.owner = false
handler.group = true
handler.admin = true

module.exports = handler
