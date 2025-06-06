'use client'

import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PROFILE } from '@/queries/profileQueries';
import { CREATE_PROFILE, UPDATE_PROFILE } from '@/mutations/profileMutations';
import { Profile } from '@/types/profile';
import { useRouter } from 'next/navigation';

export default function ProfileEdit({ userId }: { userId: number }) {
  const [displayName, setName] = useState('');
  const [bio, setBio] = useState('');
  const [goal, setGoal] = useState('');

  const { data } = useQuery<{ getProfile: Profile }>(GET_PROFILE, {
    variables: { userId },
  });

  useEffect(() => {
    if (data?.getProfile) {
      setName(data.getProfile.displayName ?? '');
      setBio(data.getProfile.bio ?? '');
      setGoal(data.getProfile.goal ?? '');
    }
  }, [data]);

  const [createProfile] = useMutation(CREATE_PROFILE);
  const [updateProfile] = useMutation(UPDATE_PROFILE);

  const router = useRouter();

  const handleSave = async () => {
    const profileId = data?.getProfile?.id;
    console.log('profileId:', profileId); // ← ここに追加！

    if (!profileId) {
      alert('プロフィールIDが取得できませんでした');
      return;
    }
    const createProfileInput = { displayName, bio, goal, userId };
    const updateProfileInput = {
      id: profileId,
      displayName,
      bio,
      goal,
    };

    try {
      if (data?.getProfile) {
        await updateProfile({
          variables: { updateProfileInput },
          refetchQueries: [{ query: GET_PROFILE, variables: { userId } }],
        });
      } else {
        await createProfile({
          variables: { createProfileInput },
          refetchQueries: [{ query: GET_PROFILE, variables: { userId } }],
        });
      }

      router.push('/profile');
    } catch (error: any) {
      alert('保存に失敗しました');
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="bg-white p-10 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">プロフィール編集</h2>

        <input
          className="border p-2 w-full mb-2"
          placeholder="名前"
          value={displayName}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          className="border p-2 w-full mb-2"
          placeholder="ひとことコメント"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-4"
          placeholder="目標"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />

        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          保存
        </button>
      </div>
    </div>
  );
}
