export interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export function calculateExercises(dailyHours: number[], target: number): ExerciseResult {
  const periodLength: number = dailyHours.length;
  const trainingDays: number = dailyHours.filter(hour => hour > 0).length;
  const totalHours: number = dailyHours.reduce((sum, hour) => sum + hour, 0);
  const average: number = totalHours / periodLength;
  const success: boolean = average >= target;

  let rating: number;
  let ratingDescription: string;

  const percentageOfTarget: number = (average / target) * 100;

  if (percentageOfTarget >= 100) {
    rating = 3;
    ratingDescription = 'Excellent, you met your target!';
  } else if (percentageOfTarget >= 75) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'You need to work harder';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
}


if (require.main === module) {
const args = process.argv.slice(2);

if (args.length < 2) {
  console.log('Please provide at least the target and one day of exercise hours.');
} else {
  const target = Number(args[0]);
  const dailyHours = args.slice(1).map(hour => Number(hour));

  if (isNaN(target) || dailyHours.some(hour => isNaN(hour))) {
    console.log('All provided values should be numbers.');
  } else {
    console.log(calculateExercises(dailyHours, target));
  }
}
}