
export const weatherOptions = ['sunny', 'rainy', 'cloudy', 'stormy', 'windy'];
export type Weather = typeof weatherOptions[number];

export const visibilityOptions = ['great', 'good', 'ok', 'poor'];
export type Visibility = typeof visibilityOptions[number];

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;

export const isWeather = (param: string): param is Weather => {
  return weatherOptions.includes(param);
};

export const isVisibility = (param: string): param is Visibility => {
  return visibilityOptions.includes(param);
};
