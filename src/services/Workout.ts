import { Exercise } from '../components/Exercise';

export class WorkoutState {
    private _workout?: Exercise[]

    get workout(): Exercise[] {
        var result: Exercise[] | undefined

        if (!this._workout) {
            var fromLS = localStorage.getItem("previousWorkout")
            if (!!fromLS) {
                result = JSON.parse(fromLS)
            }
        }
        
        return this._workout ?? result ?? []
    }

    set workout(state: Exercise[]) {
        this._workout = state
        localStorage.setItem("previousWorkout", JSON.stringify(this._workout))
    }
};

export var workoutState = new WorkoutState()