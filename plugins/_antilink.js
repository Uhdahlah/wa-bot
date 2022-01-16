let linkRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/i
module.exports = {
  before(m, { isBotAdmin, isUser}) {
    if (m.isBaileys && m.fromMe && m.isAdmin) return true
    let chat = global.db.data.chats[m.chat]
    let isGroupLink = linkRegex.exec(m.text)

    if (chat.antiLink && isGroupLink) {
      m.reply('*ANTILINK*\n\nLink terdeteksi!!!')
      if (global.opts['restrict']) {
        if (!isBotAdmin || isUser) return true
        ,this.groupRemove(m.chat, [m.sender])
      }
    }
    return true
  }
}
