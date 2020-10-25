import { Exercise } from '../components/Exercise';

export type WorkoutState = {
    workout: Exercise[];
};

export var workoutState: WorkoutState = {
    workout: [],
};
