// src/services/diaryService.ts
import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from '../types';

const baseUrl = '/api/diaries';

export const getAllDiaries = async () => {
  const response = await axios.get<DiaryEntry[]>(baseUrl);
  return response.data;
};

export const addDiary = async (newDiary: NewDiaryEntry) => {
  const response = await axios.post<DiaryEntry>(baseUrl, newDiary);
  return response.data;
};
