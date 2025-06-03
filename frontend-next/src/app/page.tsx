'use client';

import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { Stack, Typography } from '@mui/material';
import Header from '@/components/Header';
import AddTask from '@/components/AddTask';
import TaskTable from '@/components/TaskTable';
import Loading from '@/app/Loading';
import { GET_TASKS } from '@/queries/taskQueries';
import type { Payload } from '@/types/payload';
import type { Task } from '@/types/task';

const Main = () => {
  const router = useRouter();
  const [userId, setUserId] = useState<number | null>(null);

  /* ブラウザでだけ token を読む */
  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/signin');
        return;
      }
      const decoded = jwtDecode<Payload>(token);
      const parsedId = Number(decoded.sub);

      if (Number.isNaN(parsedId)) {
        throw new Error('invalid userId');
      }
      setUserId(parsedId);
    } catch (err) {
      console.error(err);
      localStorage.removeItem('token');
      router.push('/signin');
    }
  }, [router]);

  /* userId が決まるまでクエリを完全スキップ */
  const { loading, data, error } = useQuery<{ getTasks: Task[] }>(GET_TASKS, {
    variables: userId ? { userId } : undefined,
    skip: userId === null,
  });

  return (
    <>
      <Header />
      <Stack spacing={4} direction="column" m={8} alignItems="center">
        {loading && <Loading />}
        {error   && <Typography color="red">エラーが発生しました</Typography>}
        {!loading && !error && userId && (
          <>
            <AddTask  userId={userId} />
            <TaskTable tasks={data?.getTasks ?? []} userId={userId} />
          </>
        )}
      </Stack>
    </>
  );
};

export default Main;
