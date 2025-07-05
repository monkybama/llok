const axios = require('axios');

module.exports = {
  config: {
    name: "اوتشيها",
    version: "1.0",
    hasPermssion: 0,
    credits: "Rako San ",
    description: "شات بوت",
    commandCategory: "آۆآمـر عـآمـةّ",
    usages: "",
    cooldowns: 5
  },
  run: async function({ api, event, args }) {
    const msg = args.join(" ");

    // الردود المحلية على الأسئلة الشائعة
    if (!msg || msg === '') return api.sendMessage("مرحبًا! كيف يمكنني مساعدتك؟ 🙂", event.threadID);
    if (msg.includes('كيفك') || msg.includes('كيف حالك')) return api.sendMessage("تمام، أنا بخير. شكرًا على السؤال! 🙂", event.threadID);
    if (msg.includes('من أنت')) return api.sendMessage("أنا بوت، مصمم لمساعدتك في الحصول على المعلومات. 🙂", event.threadID);

    try {
      const apiUrl = `https://rapido.zetsu.xyz/api/gemini?chat=${encodeURIComponent(msg)}`;
      const res = await axios.get(apiUrl);
      let reply = res.data.response;
      reply = reply.replace(/أنا/g, '🦊');
      reply = reply.replace(/مرحبًا/g, 'اوه يبدو انك تحتاج الى مساعدة');
      reply = `اوه يبدو انك ${getInsult()}, ${reply} 🙂`;
      return api.sendMessage(reply, event.threadID);
    } catch (e) {
      return api.sendMessage(`${getInsult()} انت تكتب اشياء غير مفهومة 🙂`, event.threadID);
    }
  }
};

// دالة للحصول على إهانة عشوائية
function getInsult() {
  const insults = ['احمق', 'غبي', 'مجنون', 'جاهل', 'متهور'];
  return insults[Math.floor(Math.random() * insults.length)];
    }
