// Created By: Muhammad Adriansyah ( Seaavey )
// Created At: 30 Desember 2024
// License: MIT

// Note:
// - Jangan menghapus komentar atau dokumentasi
// - Jangan menghapus atau mengubah informasi ini
// - Jika Anda mengubah sesuatu, tambahkan informasi di sini

// Informasi:
// - Gunakan Module https://www.npmjs.com/package/@seaavey/baileys Versi 6.6.5
// - Jika Anda menggunakan versi lain, mungkin akan terjadi kesalahan

/**
 * Kelas Button
 * Digunakan untuk membuat tombol interaktif dalam pesan.
 */
class Button {
  constructor() {
    // Inisialisasi properti untuk header, footer, konten, dan tombol
    this.footer = ''; // Untuk teks footer di pesan
    this.header = ''; // Untuk teks header di pesan
    this.content = ''; // Untuk isi utama pesan
    this.button = []; // Array untuk menyimpan data tombol
  }

  /**
   * Menambahkan teks footer ke pesan
   * @param {string} footer - Teks footer yang ingin ditambahkan
   */
  addFooter(footer) {
    this.footer = footer;
  }

  /**
   * Menambahkan teks header ke pesan
   * @param {string} header - Teks header yang ingin ditambahkan
   */
  addHeader(header) {
    this.header = header;
  }

  /**
   * Menambahkan isi utama ke pesan
   * @param {string} content - Isi utama pesan
   */
  addContent(content) {
    this.content = content;
  }

  /**
   * Menambahkan tombol interaktif ke pesan
   * @param {string} type - Jenis tombol (reply, url, call, dll.)
   * @param {Object} data - Data tombol, tergantung tipe tombol
   */
  addButton(type, data) {
    // Cek tipe tombol dan tambahkan ke array this.button
    type === 'reply'
      ? this.button.push({
          name: 'quick_reply',
          buttonParamsJson: JSON.stringify({
            display_text: data.text, // Teks yang ditampilkan
            id: data.id, // ID tombol
          }),
        })
      : type === 'url'
      ? this.button.push({
          name: 'cta_url',
          buttonParamsJson: JSON.stringify({
            display_text: data.text, // Teks yang ditampilkan
            url: data.url, // URL yang akan dibuka
            merchant_url: data.url, // URL merchant (opsional)
          }),
        })
      : type === 'call'
      ? this.button.push({
          name: 'cta_call',
          buttonParamsJson: JSON.stringify({
            display_text: data.text, // Teks yang ditampilkan
            id: data.id, // Nomor telepon atau ID
          }),
        })
      : type === 'copy'
      ? this.button.push({
          name: 'cta_copy',
          buttonParamsJson: JSON.stringify({
            display_text: data.text, // Teks yang ditampilkan
            id: data.id, // ID tombol
            copy_code: data.code, // Kode yang akan disalin
          }),
        })
      : type === 'reminder'
      ? this.button.push({
          name: 'cta_reminder',
          buttonParamsJson: JSON.stringify({
            display_text: data.text, // Teks pengingat
            id: data.id, // ID pengingat
          }),
        })
      : type === 'cancel_reminder'
      ? this.button.push({
          name: 'cta_cancel_reminder',
          buttonParamsJson: JSON.stringify({
            display_text: data.text, // Teks untuk membatalkan pengingat
            id: data.id, // ID pengingat
          }),
        })
      : type === 'address'
      ? this.button.push({
          name: 'address_message',
          buttonParamsJson: JSON.stringify({
            display_text: data.text, // Teks alamat
            id: data.id, // ID alamat
          }),
        })
      : type === 'location'
      ? this.button.push({
          name: 'send_location',
          buttonParamsJson: JSON.stringify({
            display_text: data.text, // Teks lokasi
            id: data.id, // ID lokasi
          }),
        })
      : null; // Jika tipe tidak sesuai, tidak menambahkan apa-apa
  }

  /**
   * Mengirim pesan dengan tombol interaktif
   * @param {Object} conn - Objek koneksi untuk mengirim pesan
   * @param {string} jid - JID penerima pesan
   * @param {Object} quoted - Pesan yang dikutip (opsional)
   * @returns {Promise} - Mengembalikan promise hasil pengiriman pesan
   */
  initButton(conn, jid, quoted) {
    return conn.sendIAMessage(jid, this.button, quoted, {
      header: this.header, // Header pesan
      content: this.content, // Isi utama pesan
      footer: this.footer, // Footer pesan
    });
  }
}

module.exports = Button;
