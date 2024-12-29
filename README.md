# Baileys Support Button

Hello everyone!!!, I will share all the documentation from my baileys on npm [@seaavey/baileys](https://www.npmjs.com/package/@seaavey/baileys), we have changed this baileys in terms of code and system, please use this baileys properly


## Function sendIAMessage

```
const sendIAMessage = async (jid, btns = [], quoted, opts = {}) => {
  let messageContent = {
    viewOnceMessage: {
      message: {
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: opts.content, // Isi utama pesan
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: opts.footer, // Footer pesan
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            title: opts.header, // Header pesan
            subtitle: '',
            hasMediaAttachment: !!opts.media, // Apakah ada media?
          }),
          contextInfo: {
            forwardingScore: 9999, // Nilai forward (opsional)
            isForwarded: false,
            mentionedJid: conn.parseMention(opts.header + opts.content + opts.footer),
          },
          externalAdReply: {
            showAdAttribution: true,
            renderLargerThumbnail: false,
            mediaType: 1, // Media tipe (default: gambar)
          },
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: btns, // Tombol interaktif
          }),
        }),
      },
    },
  };

  // Tambahkan media jika diperlukan
  if (opts.media) {
    const media = await prepareWAMessageMedia(
      {
        [opts.mediaType || 'image']: { url: opts.media },
      },
      { upload: conn.waUploadToServer }
    );
    messageContent.viewOnceMessage.message.interactiveMessage.header.hasMediaAttachment = true;
    Object.assign(messageContent.viewOnceMessage.message.interactiveMessage.header, media);
  }

  // Buat pesan dan kirimkan
  let msg = await generateWAMessageFromContent(jid, messageContent, { quoted });
  await conn.relayMessage(msg.key.remoteJid, msg.message, {
    messageId: msg.key.id,
  });
};


``` 
## Example Code Button OLD

```
// Mengirim pesan dengan tombol menggunakan fungsi `sock.sendMessage`
sock.sendMessage(
  jid, // ID penerima (nomor telepon atau ID grup)
  {
    text: 'Example Button', // Teks utama pesan
    footer: 'Powered By Seaavey', // Footer yang ditampilkan di bawah pesan
    buttons: [
      {
        buttonId: '.owner', // ID unik untuk tombol
        buttonText: {
          displayText: 'owner', // Teks yang ditampilkan di tombol
        },
        type: 1, // Tipe tombol (1 untuk tombol teks)
      },
    ],
    headerType: 1, // Tipe header (1 untuk teks biasa)
    viewOnce: true, // Pesan hanya bisa dilihat sekali (opsional)
  },
  { quoted: m } // Pesan yang mengutip pesan sebelumnya (opsional)
);

```
## Example All Code Button

### Button Data

```
const btns = [
  {
    name: 'single_select',
    buttonParamsJson: JSON.stringify({
      title: 'title',
      sections: [
        {
          title: 'title',
          highlight_label: 'label',
          rows: [
            {
              header: 'header',
              title: 'title',
              description: 'description',
              id: null,
            },
            {
              header: 'header',
              title: 'zzzz',
              description: 'description',
              id: null,
            },
          ],
        },
      ],
    }),
  },
  {
    name: 'quick_reply',
    buttonParamsJson: JSON.stringify({
      display_text: 'quick reply',
      id: null,
    }),
  },
  {
    name: 'cta_url',
    buttonParamsJson: JSON.stringify({
      display_text: 'url',
      url: 'google.com',
      merchant_url: 'https://www.google.com',
    }),
  },
  {
    name: 'cta_call',
    buttonParamsJson: JSON.stringify({
      display_text: 'call',
      id: '628999',
    }),
  },
  {
    name: 'cta_copy',
    buttonParamsJson: JSON.stringify({
      display_text: 'copy',
      id: '123456789',
      copy_code: 'message',
    }),
  },
  {
    name: 'cta_reminder',
    buttonParamsJson: JSON.stringify({
      display_text: 'reminder',
      id: 'message',
    }),
  },
  {
    name: 'cta_cancel_reminder',
    buttonParamsJson: JSON.stringify({
      display_text: 'cancel reminder',
      id: 'message',
    }),
  },
  {
    name: 'address_message',
    buttonParamsJson: JSON.stringify({
      display_text: 'address message',
      id: 'indonesia',
    }),
  },
  {
    name: 'send_location',
    buttonParamsJson: '',
  },
];
```

## SendButton

```
conn.sendIAMessage(jid, btns, quoted, {
  header: '',
  content: 'content',
  footer: 'footer',
  /* image: q.thumb2,
    mediaType: "image" */
});

```


## Screenshots

<img src="https://pomf2.lain.la/f/jo9dvly1.jpg" alt="Button OLD" width="500" />


<img src="https://pomf2.lain.la/f/v0dl4zx8.jpg" alt="All Button" width="500" />


## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.


## Authors

- [@baileys](https://github.com/WhiskeySockets/Baileys)
- [@seaavey](https://github.com/seaavey)
- [@balxz](https://github.com/balxz)

## License

[MIT](https://choosealicense.com/licenses/mit/)

