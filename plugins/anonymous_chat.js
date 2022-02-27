async function handler(m, { command }) {
    command = command.toLowerCase()
    this.anonymous = this.anonymous ? this.anonymous : {}
    switch (command) {
        case 'next':
        case 'leave': {
            let room = Object.values(this.anonymous).find(room => room.check(m.sender))
            if (!room) return this.sendButton(m.chat, '_kamu tidak berada di anonymous chat_', '© yoga', 'Cari Teman lain', `.start`, m)
            m.reply('Ok')
            let other = room.other(m.sender)
            if (other) await this.sendButton(other, '_Teman meninggalkan kamu :(_', '© yoga', 'Cari Teman lain', `.start`, m)
            delete this.anonymous[room.id]
            if (command === 'leave') break
        }
        case 'start': {
            if (Object.values(this.anonymous).find(room => room.check(m.sender))) return this.sendButton(m.chat, '_Kamu masih berada di dalam anonymous chat, menunggu Teman_', '© yoga', 'Keluar', `.leave`)
            let room = Object.values(this.anonymous).find(room => room.state === 'WAITING' && !room.check(m.sender))
            if (room) {
                await this.sendButton(room.a, '_Teman ditemukan!_', '© yoga', 'Next', `.next`, m)
                room.b = m.sender
                room.state = 'CHATTING'
                await this.sendButton(room.a, '_Teman ditemukan!_', '© yoga', 'Next', `.next`, m)
            } else {
                let id = + new Date
                this.anonymous[id] = {
                    id,
                    a: m.sender,
                    b: '',
                    state: 'WAITING',
                    check: function (who = '') {
                        return [this.a, this.b].includes(who)
                    },
                    other: function (who = '') {
                        return who === this.a ? this.b : who === this.b ? this.a : ''
                    },
                }
                await this.sendButton(m.chat, '_Menunggu ayang..._', '© yoga', 'Keluar', `.leave`, m)
            }
            break
        }
    }
}
handler.help = ['start', 'leave', 'next']
handler.tags = 'anonymous'
handler.command = ['start', 'leave', 'next']

handler.private = true

module.exports = handler
