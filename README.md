# Baileys Support Button

Hello everyone!!!, I will share all the documentation from my baileys on npm [@seaavey/baileys](https://www.npmjs.com/package/@seaavey/baileys), we have changed this baileys in terms of code and system, please use this baileys properly
## Package
```
"@seaavey/baileys": "6.6.5"
```

## Function sendDKButton, هذا تحطة في ملف simple.js

```
sendDKButton: {
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
                title: message.title ? message.title : null
            };
        } else {
            headerup = {
                hasMediaAttachment: true,
                imageMessage: img ? img.imageMessage : null,
                videoMessage: video ? video.videoMessage : null,
                title: message.title ? message.title : null
            };
        }

        const filteredButtons = message.buttons.filter(btn => {
            if (typeof btn.buttonParamsJson === 'string' && btn.buttonParamsJson) {
                try {
                    btn.buttonParamsJson = JSON.parse(btn.buttonParamsJson);
                } catch (e) {}
            }
            return btn.name !== 'send_location';
        }).map(btn => ({
            ...btn,
            buttonParamsJson: typeof btn.buttonParamsJson === 'object' 
                ? JSON.stringify(btn.buttonParamsJson)
                : btn.buttonParamsJson || ''
        }));

        const msg = generateWAMessageFromContent(jid, {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.create({
                        body: proto.Message.InteractiveMessage.Body.create({
                            text: message.text,
                        }),
                        header: proto.Message.InteractiveMessage.Header.create(headerup),
                        footer: proto.Message.InteractiveMessage.Footer.create({
                            text: message.footer
                        }),
                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                            buttons: filteredButtons
                        }),
                        ...Object.assign({
                            mentions: await conn.parseMention(message.title || null),
                            contextInfo: {
                                mentionedJid: await conn.parseMention(message.title || null),
                                isForwarded: true,
                                forwardedNewsletterMessageInfo: {
                                    newsletterJid: '120363228124354889@newsletter',
                                    newsletterName: 'Aboud Coding'
                                }
                            }
                        }),
                    })
                }
            }
        }, { userJid: conn.user.jid, quoted });

        return conn.relayMessage(jid, msg.message, { messageId: msg.key.id });
    }
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

## SendButton

```
let handler = async (m, { conn }) => {
  // تعريف كل أنواع الأزرار المدعومة
  const buttons = [
    // 1. زر القائمة (single select)
    {
      name: 'single_select',
      buttonParamsJson: {
        title: 'اختر من القائمة',
        sections: [
          {
            title: 'القسم الأول',
            highlight_label: 'مهم',
            rows: [
              {
                header: 'الخيار الأول',
                title: 'خيار 1',
                description: 'وصف الخيار الأول',
                id: 'opt1'
              },
              {
                header: 'الخيار الثاني',
                title: 'خيار 2',
                description: 'وصف الخيار الثاني',
                id: 'opt2'
              }
            ]
          }
        ]
      }
    },
    // 2. زر الرد السريع (quick reply)
    {
      name: 'quick_reply',
      buttonParamsJson: {
        display_text: 'رد سريع',
        id: 'quick1'
      }
    },

    // 3. زر الرابط (URL)
    {
      name: 'cta_url',
      buttonParamsJson: {
        display_text: 'زيارة الموقع',
        url: 'https://www.google.com',
        merchant_url: 'https://www.google.com'
      }
    },

    // 4. زر الاتصال
    {
      name: 'cta_call',
      buttonParamsJson: {
        display_text: 'اتصل بنا',
        id: '628999'
      }
    },

    // 5. زر النسخ
    {
      name: 'cta_copy',
      buttonParamsJson: {
        display_text: 'نسخ الكود',
        id: 'code123',
        copy_code: 'SPECIALCODE123'
      }
    },

    // 6. زر التذكير
    {
      name: 'cta_reminder',
      buttonParamsJson: {
        display_text: 'تذكير',
        id: 'reminder1'
      }
    },

    // 7. زر إلغاء التذكير
    {
      name: 'cta_cancel_reminder',
      buttonParamsJson: {
        display_text: 'إلغاء التذكير',
        id: 'reminder1'
      }
    },

    // 8. زر رسالة العنوان
    {
      name: 'address_message',
      buttonParamsJson: {
        display_text: 'إرسال العنوان',
        id: 'address1'
      }
    },

    // 9. زر إرسال الموقع
    {
      name: 'send_location',
      buttonParamsJson: ''
    }
  ];


  const message = {
    image: 'https://i.pinimg.com/originals/33/3c/a2/333ca2c8e19b327d739b2a32e0fb5994.jpg', // or >> video: https://v1.pinimg.com/videos/mc/720p/c6/e1/10/c6e110aaeaf4cc5d183d1bcd953ef17d.mp4
    text: '👋 مرحباً! هذه رسالة تجريبية تحتوي على جميع أنواع الأزرار المدعومة.',
    title: '📱 عرض الأزرار',
    footer: '💡 اختر أحد الخيارات أعلاه',
    buttons: buttons
  };

  await conn.sendDKButton(m.chat, message, m)

};

handler.help = ['buttons']
handler.tags = ['test']
handler.command = /^(buttons|أزرار)$/i

export default handler

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

