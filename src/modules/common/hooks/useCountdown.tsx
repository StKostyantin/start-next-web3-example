import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const numbersToAddZeroTo = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const useCountdown = (deadline: string) => {
  const deadlineTimestamp = new Date(deadline).getTime();
  const [total, setTotal] = useState<number>(Number(deadlineTimestamp) - Date.now());
  const [seconds, setSeconds] = useState<string>('0');
  const [minutes, setMinutes] = useState<string>('0');
  const [hours, setHours] = useState<string>('0');
  const [days, setDays] = useState<number>(0);

  const setNewTime = () => {
    setTotal(deadlineTimestamp - Date.now());
  };

  useEffect(() => {
    const setCount = setInterval(setNewTime, 1000);
    if (dayjs(deadline).isBefore(dayjs(Date.now()))) {
      setSeconds('00');
      setHours('00');
      setMinutes('00');
      setDays(0);
      return clearInterval(setCount);
    }

    if (numbersToAddZeroTo.includes(Math.floor((total / 1000) % 60))) {
      setSeconds(`0${Math.floor((total / 1000) % 60)}`);
    } else {
      setSeconds(Math.floor((total / 1000) % 60).toString());
    }

    if (numbersToAddZeroTo.includes(Math.floor((total / (1000 * 60 * 60)) % 24))) {
      setHours(`0${Math.floor((total / (1000 * 60 * 60)) % 24)}`);
    } else {
      setHours(Math.floor((total / (1000 * 60 * 60)) % 24).toString());
    }

    if (numbersToAddZeroTo.includes(Math.floor((total / 1000 / 60) % 60))) {
      setMinutes(`0${Math.floor((total / 1000 / 60) % 60)}`);
    } else {
      setMinutes(Math.floor((total / 1000 / 60) % 60).toString());
    }

    setDays(Math.floor(total / (1000 * 60 * 60 * 24)));

    return () => clearInterval(setCount);
  }, [total]);

  return {
    total,
    days,
    hours,
    minutes,
    seconds,
  };
};

export default useCountdown;
