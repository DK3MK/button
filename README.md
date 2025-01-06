# Baileys Support Button

Hello everyone!!!, I will share all the documentation from my baileys on npm [@seaavey/baileys](https://www.npmjs.com/package/@seaavey/baileys), we have changed this baileys in terms of code and system, please use this baileys properly


## Function sendIAMessage

```
sendIAMessage: {
    async value(jid, message, quoted, buffer) {
        let img, video, headerup;

        buffer = message.image ? message.image : message.video;
        if (/^https?:\/\//i.test(buffer)) {
            try {
                const response = await fetch(buffer);
                const contentType = response.headers.get('content-type');
                if (/^image\//i.test(contentType)) {
                    img = await prepareWAMessageMedia({ image: { url: buffer } }, { upload: conn.waUploadToServer });
                } else if (/^video\//i.test(contentType)) {
                    video = await prepareWAMessageMedia({ video: { url: buffer } }, { upload: conn.waUploadToServer });
                } else {
                    console.error("Tipo MIME no compatible:", contentType);
                }
            } catch (error) {
                console.error("Error al obtener el tipo MIME:", error);
            }
        } else {
            try {
                const type = await conn.getFile(buffer);
                if (/^image\//i.test(type.mime)) {
                    img = await prepareWAMessageMedia({ image: { url: buffer } }, { upload: conn.waUploadToServer });
                } else if (/^video\//i.test(type.mime)) {
                    video = await prepareWAMessageMedia({ video: { url: buffer } }, { upload: conn.waUploadToServer });
                }
            } catch (error) {
                console.error("Error al obtener el tipo de archivo:", error);
            }
        }

        if (!img && !video) {
            headerup = {
                hasMediaAttachment: false,
                title: message.title ? message.title : null,
            };
        } else {
            headerup = {
                hasMediaAttachment: true,
                imageMessage: img ? img.imageMessage : null,
                videoMessage: video ? video.videoMessage : null,
                title: message.title ? message.title : null,
            };
        }

        const msg = generateWAMessageFromContent(jid, {
            viewOnceMessage: {
                message: {
                    "messageContextInfo": {
                        "deviceListMetadata": {},
                        "deviceListMetadataVersion": 2,
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.create({
                        body: proto.Message.InteractiveMessage.Body.create({
                            text: message.text, 
                        }),
                        header: proto.Message.InteractiveMessage.Header.create(headerup),
                        footer: proto.Message.InteractiveMessage.Footer.create({
                            text: message.footer, 
                        }),
                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                            buttons: message.buttons.map((button) => ({
                                ...button,
                                buttonParamsJson: JSON.stringify(button.buttonParamsJson),
                            })),
                        }),
                        ...Object.assign({
                            mentions: await conn.parseMention(message.title || null),
                            contextInfo: {
                                mentionedJid: await conn.parseMention(message.title || null),
                                isForwarded: true,
                                forwardingScore: 9999, 
                                forwardedNewsletterMessageInfo: {
                                    newsletterJid: '120363228124354889@newsletter',
                                    newsletterName: 'Aboud Coding',
                                },
                            },
                        }),
                    }),
                },
            },
        }, { ephemeralExpiration: 604800, userJid: conn.user.jid, quoted });


        return conn.relayMessage(jid, msg.message, { messageId: msg.key.id });
    },
},

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

