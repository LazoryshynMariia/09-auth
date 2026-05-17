import { getMe } from "@/lib/api/serverApi";
import css from "./ProfilePage.module.css";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const user = await getMe();

  return {
    title: `Profile of ${user.username}`,
    description: `View and edit your profile information`,

    openGraph: {
      title: `Profile of ${user.username}`,
      description: `View and edit your profile information`,
      url: `https://notehub.com/profile/${user.username}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'Notes',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Profile of ${user.username}`,
      description: `View and edit your profile information`,
      images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
    },
  };
}


export default async function Profile() { 
    const user = await getMe();

    return (
        <main className={css.mainContent}>
            <div className={css.profileCard}>
                <div className={css.header}>
                    <h1 className={css.formTitle}>Profile Page</h1>
                    <Link href="/profile/edit" className={css.editProfileButton}>
                        Edit Profile
                    </Link>
                </div>
                <div className={css.avatarWrapper}>
                    <Image
                        src={user.avatar || '/default-avatar.png'}
                        alt="User Avatar"
                        width={120}
                        height={120}
                        className={css.avatar}
                    />
                </div>
                <div className={css.profileInfo}>
                    <p>
                        Username: {user.username}
                    </p>
                    <p>
                        Email: {user.email}
                    </p>
                </div>
            </div>
        </main>
    );
};