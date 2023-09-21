import { NextRequest, NextResponse } from 'next/server';
import nodemailer, { TransportOptions } from 'nodemailer';

export async function POST(req: NextRequest) {
  const transport = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: 'blandine.degeneve.contact@gmail.com',
      clientId: process.env.MAILER_APP_ID,
      clientSecret: process.env.MAILER_APP_SECRET,
      refreshToken: process.env.GMAIL_REFRESH_TOKEN,
    },
  } as TransportOptions;

  const defaults = {
    from: 'blandine.degeneve.contact@gmail.com',
    to: 'blandine.degeneve.contact@gmail.com',
  };

  const transporter = nodemailer.createTransport(transport, defaults);

  // verify connection configuration
  // transporter.verify(function (error, success) {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log('Server is ready to take our messages\n', success);
  //   }
  // });

  const data = await req.json();

  if (data) {
    const message = {
      sender: data.email,
      subject: data.subject,
      text: data.message,
      html: `<p>${data.message}</p>`,
    };

    const lang = 'fr';
    const signature = {
      text: 'Blandine Degenève\nLinkedIn: https://www.linkedin.com/in/blandine-degeneve-81178b172/\nInstagram: https://www.instagram.com/blandinemakeup34/',
      html: `
            <span><strong>Blandine Degenève, Make Up Artist</strong></span><br /><br />
            <span><strong><a href="https://www.linkedin.com/in/blandine-degeneve-81178b172/"> 🔗 LinkedIn</a></strong><span>
            <strong><a href="https://www.instagram.com/blandinemakeup34/"> 🔗 Instagram</a></strong><br />
        `,
    };

    const confirmation = {
      to: data.email,
      subject:
        lang === 'fr'
          ? 'message à Blandine Degenève 📨'
          : 'message to Blandine Degenève 📨',
      text:
        lang === 'fr'
          ? `Votre message :\n\n"""\n${data.message}\n"""\n\na bien été envoyé !\n\n${signature.text}`
          : `Your message:\n\n"""\n${data.message}\n"""\n\n has been sent!\n\n${signature.text}`,
      html:
        lang === 'fr'
          ? `<p><span>Votre message :</span><blockquote><cite>Sujet : ${data.subject}<br /><br />${data.message}</cite></blockquote><span>a bien été envoyé !</span></p><p>${signature.html}</p>`
          : `<p><span>Your message:</span><blockquote><cite>Subject: ${data.subject}<br /><br />${data.message}</cite></blockquote><span>has been sent!</span></p><p>${signature.html}</p>`,
    };

    const status = await transporter.sendMail(message);

    if (status.accepted) {
      await transporter.sendMail(confirmation);
      return NextResponse.json({ send: true });
    } else {
      return NextResponse.json({ send: false });
    }
  }
}
