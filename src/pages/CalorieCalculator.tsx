import React, { useState } from 'react';
import { Card } from '../components/Card';

export default function CalorieCalculator() {
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState(25);
  const [weight, setWeight] = useState(70); // in kg
  const [height, setHeight] = useState(175); // in cm
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [tdee, setTdee] = useState<number | null>(null);

  const calculateTDEE = () => {
    let bmr: number;

    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const activityMultiplier =
      activityLevel === 'sedentary'
        ? 1.2
        : activityLevel === 'light'
        ? 1.375
        : activityLevel === 'moderate'
        ? 1.55
        : activityLevel === 'active'
        ? 1.725
        : 1.9;

    const tdeeResult = bmr * activityMultiplier;
    setTdee(tdeeResult);
  };

  return (
    <div className="space-y-4">
      
    </div>
  );
}
