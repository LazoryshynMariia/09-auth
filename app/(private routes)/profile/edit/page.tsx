'use client';

import { useEffect, useState } from 'react';

import { getMe, updateMe } from '@/lib/api/clientApi';
import css from './EditProfile.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';

export default function EditProfile ()  {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [avatar, setAvatar] = useState<string>('');
  const { setUser: setAuthUser } = useAuthStore();
  const router = useRouter();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  useEffect(() => {
    getMe().then(user => {
      setEmail(user.email);
      setUsername(user.username ?? '');
      setAvatar(user.avatar ?? '');
    });
  }, []);
  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const updatedUser = await updateMe({ username });

      setAuthUser(updatedUser);
      router.push('/profile');
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={avatar || '/default-avatar.png'}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={handleSaveUser}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={handleChange}
            />
          </div>

          <p>Email: {email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button type="button" className={css.cancelButton} onClick={() => router.back()}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};