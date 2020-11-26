import React, { ReactElement } from "react";
import { Box } from "rebass";
import { theme } from "../../theme";
import { ExerciseType, exerciseTypeColors } from "./Exercise";

export function Tag({ tag }: {tag: ExerciseType}): ReactElement | null {

    var tagColor = exerciseTypeColors.get(tag);

    if (!!tagColor) {
        var tagColorHex = (theme.colors as any)[tagColor];

        return (
            <Box as='span' variant='badge' color={tagColor} sx={{ borderColor: tagColor, backgroundColor: `${tagColorHex}20` }}>
                {tag.toLocaleUpperCase()}
            </Box>
        )
    } else {
        return null
    }
}