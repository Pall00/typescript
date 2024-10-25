
export function calculateBmi(height: number, weight: number): string {
  const heightInMeters: number = height / 100;
  const bmi: number = weight / (heightInMeters ** 2);

  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi < 25) {
    return 'Normal range';
  } else if (bmi < 30) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
}

if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log('Please provide both height and weight as arguments.');
  } else {
    const height = Number(args[0]);
    const weight = Number(args[1]);

    if (isNaN(height) || isNaN(weight)) {
      console.log('Both height and weight should be valid numbers.');
    } else {
      console.log(calculateBmi(height, weight));
    }
  }
}