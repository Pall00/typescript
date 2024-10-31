// src/App.tsx
import { useState, useEffect } from 'react';
import {
  DiaryEntry,
  NewDiaryEntry,
  weatherOptions,
  visibilityOptions,
  isWeather,
  isVisibility,
} from './types';
import { getAllDiaries, addDiary } from './services/diaryService';
import axios from 'axios';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [newDiary, setNewDiary] = useState<NewDiaryEntry>({
    date: '',
    weather: 'sunny',
    visibility: 'great',
    comment: '',
  });
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchDiaries = async (): Promise<void> => {
      try {
        const data = await getAllDiaries();
        setDiaries(data);
      } catch (error) {
        console.error('Error fetching diaries:', error);
      }
    };

    void fetchDiaries();
  }, []);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    if (name === 'weather' && isWeather(value)) {
      setNewDiary({
        ...newDiary,
        weather: value,
      });
    } else if (name === 'visibility' && isVisibility(value)) {
      setNewDiary({
        ...newDiary,
        visibility: value,
      });
    } else if (name === 'date' || name === 'comment') {
      setNewDiary({
        ...newDiary,
        [name]: value,
      });
    } else {
      setError('An unexpected error occurred.');
    }
  };

  const submitDiary = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const addedDiary = await addDiary(newDiary);
      setDiaries(diaries.concat(addedDiary));
      
      setNewDiary({
        date: '',
        weather: 'sunny',
        visibility: 'great',
        comment: '',
      });
      setError('');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response && typeof error.response.data === 'string') {
          setError(error.response.data);
        } else {
          setError('An error occurred while adding the diary entry.');
        }
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <div>
      <h1>Flight Diaries</h1>

      {error && (
        <div style={{ color: 'red' }}>
          <p>{error}</p>
        </div>
      )}

      <h2>Add New Entry</h2>
      <form onSubmit={submitDiary}>
        <div>
          Date:
          <input
            type="date"
            name="date"
            value={newDiary.date}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <p>Weather:</p>
          {weatherOptions.map((w) => (
            <label key={w}>
              <input
                type="radio"
                name="weather"
                value={w}
                checked={newDiary.weather === w}
                onChange={handleInputChange}
              />
              {w}
            </label>
          ))}
        </div>
        <div>
          <p>Visibility:</p>
          {visibilityOptions.map((v) => (
            <label key={v}>
              <input
                type="radio"
                name="visibility"
                value={v}
                checked={newDiary.visibility === v}
                onChange={handleInputChange}
              />
              {v}
            </label>
          ))}
        </div>
        <div>
          Comment:
          <input
            type="text"
            name="comment"
            value={newDiary.comment}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Add</button>
      </form>

      <h2>Diary Entries</h2>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <p>Weather: {diary.weather}</p>
          <p>Visibility: {diary.visibility}</p>
          {diary.comment && <p>Comment: {diary.comment}</p>}
        </div>
      ))}
    </div>
  );
};

export default App;
