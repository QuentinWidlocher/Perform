import { map, prop, sum } from "ramda"
import React from "react"
import { Tag } from "./Tag"

export const exerciseTypes = [
    'thighs',
    'arms',
    'abs',
    'buttocks',
    'cardio',
] as const

export type ExerciseType = typeof exerciseTypes[number]

export const exerciseTypeColors = new Map<ExerciseType, string>([
    ['thighs', 'green'],
    ['arms', 'orange'],
    ['abs', 'indigo'],
    ['buttocks', 'blue'],
    ['cardio', 'red'],
])

export type Exercise = {
    name: string,
    images?: string[],
    steps: number,
    duration: number,
    tags: ExerciseType[]
}

export type ExerciseListProps = {
    exs: Exercise[],
    exsChange?: (exs: Exercise[]) => void,
    displayTotal: boolean,
    canReorder: boolean,
    canDelete: boolean,
}

export var getTotalDuration = (exs: Exercise[]) => sum(map(prop('duration'), exs))
export var totalDurationToString = (totalDuration: number) => totalDuration > 60 ? `${~~(totalDuration / 60)}m ${~~(totalDuration % 60)}s` : `${totalDuration}s`
export var getTotalDurationString = (exs: Exercise[]) => totalDurationToString(getTotalDuration(exs))

export var getTagsFromExercice = (ex: Exercise) => ex.tags.map((tag, index) => (<Tag tag={tag} key={`${tag}-${index}`} />))