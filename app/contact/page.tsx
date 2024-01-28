"use client";

import { InstagramContext, InstagramI } from "@/context/instagram";
import { useContext, Context } from "react";
import { get_media_by_hashtag } from "../utils/instagram";
import styles from "./contact.module.css";
import cN from "classnames";
import Image from "next/image";
import MailForm from "@/components/mailform/mailform";
import Social from "@/components/social/social";

export default function Contact() {
  const instagram = useContext(InstagramContext as Context<InstagramI>);
  const media_url = get_media_by_hashtag(instagram, "contact");
  return (
    <div className={cN(styles.contact, "page")}>
      <div className={styles.imgctn}>
        {media_url && (
          <Image
            src={media_url}
            alt="Image de contact."
            fill
            priority
            className={styles.image}
          />
        )}
      </div>
      <section className={styles.section}>
        <MailForm />
        <Social />
      </section>
    </div>
  );
}
