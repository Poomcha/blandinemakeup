import { NextRequest, NextResponse } from 'next/server';
import nodemailer, { TransportOptions } from 'nodemailer';

export async function POST(req: NextRequest) {
  const transport = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: 'ben.degeneve.dev@gmail.com',
      clientId: process.env.MAILER_APP_ID,
      clientSecret: process.env.MAILER_APP_SECRET,
      refreshToken: process.env.GMAIL_REFRESH_TOKEN,
    },
  } as TransportOptions;

  const defaults = {
    from: 'ben.degeneve.dev@gmail.com',
    to: 'ben.degeneve.dev@gmail.com',
  };

  const transporter = nodemailer.createTransport(transport, defaults);

  const data = await req.json();

  if (data) {
    const message = {
      sender: data.body.email,
      subject: data.body.subject,
      text: data.body.message,
      html: `<p>${data.body.message}</p>`,
    };

    const lang = 'fr';
    const signature = {
      text: 'Benjamin Degenève\nLinkedIn: https://www.linkedin.com/in/benjamin-degen%C3%A8ve-93b991186/\nGithub: https://github.com/Poomcha',
      html: `
          <p>
            <strong>Benjamin Degenève</strong> 
            <strong><a href="https://www.linkedin.com/in/benjamin-degen%C3%A8ve-93b991186/"> 🔗 LinkedIn</a></strong>
            <strong><a href="https://github.com/Poomcha"> 🔗 Github</a></strong>
          </p>
        `,
    };

    const confirmation = {
      to: data.body.email,
      subject: lang === 'fr' ? 'message envoyé 📨' : 'message sent 📨',
      text:
        lang === 'fr'
          ? `Votre message :\n\n"""\n${data.body.message}\n"""\n\na bien été envoyé !\n\n${signature.text}`
          : `Your message:\n\n"""\n${data.body.message}\n"""\n\n has been sent!\n\n${signature.text}`,
      html:
        lang === 'fr'
          ? `<div><p>Votre message :<br /><></p><cite>${data.body.subject}</cite><blockquote><cite>${data.body.message}</cite></blockquote>a bien été envoyé !</p><p>${signature.html}</p></div>`
          : `<div><p>Your message:<br /><cite>${data.body.subject}</cite><blockquote><cite>${data.body.message}</cite></blockquote>has been sent!</p><p>${signature.html}</p></div>`,
    };

    return transporter
      .sendMail(message)
      .then(() => {
        transporter
          .sendMail(confirmation)
          .then(() =>
            NextResponse.json({ message: 'message et confirmation envoyés !' })
          )
          .catch((err) => NextResponse.json(err));
      })
      .catch((err) => NextResponse.json(err));
  }
}
