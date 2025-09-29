const maxWidth = 1440;
const minWidth = 768;

export function ac(
    startSize,
    endSize,
    minBreakpoint = minWidth,
    maxBreakpoint = maxWidth
) {
    const startSizeFormatted = startSize.replace("px", "");
    const endSizeFormatted = endSize.replace("px", "");

    const difference = startSizeFormatted - endSizeFormatted;

    if (difference > 0) {
        return `min(max(calc(${endSize} + ${difference} * ((100vw - ${minBreakpoint}px) / ${
            maxBreakpoint - minBreakpoint
        })), ${endSize}), ${startSize})`;
    } else {
        return `min(max(calc(${endSize} + ${difference} * ((100vw - ${minBreakpoint}px) / ${
            maxBreakpoint - minBreakpoint
        })), ${startSize}), ${endSize})`;
    }
}

export function rc(
    startSize,
    endSize,
    minBreakpoint = minWidth,
    maxBreakpoint = maxWidth
) {
    const startSizeFormatted = startSize.replace("px", "");
    const endSizeFormatted = endSize.replace("px", "");

    const difference = startSizeFormatted - endSizeFormatted;

    if (difference > 0) {
        return `max(min(${vw(
            startSizeFormatted,
            maxBreakpoint
        )}, ${startSize}), ${endSize})`;
    } else {
        return `min(max(${vw(
            startSizeFormatted,
            maxBreakpoint
        )}, ${startSize}), ${endSize})`;
    }
}

export const perc = (number1, number2 = maxWidth) =>
    `${(number1 * 100) / number2}%`;

export const vw = (number1, number2 = maxWidth) =>
    `${(number1 * 100) / number2}vw`;

export const setTransition = (...props) => {
    if (props[0].endsWith("s")) {
        const duration = props[0];

        return props
            .map((prop, idx) => {
                if (idx > 0) return `${prop} ${duration}`;
            })
            .join(", ");
    } else {
        return props.map((prop) => `${prop} 250ms`).join(", ");
    }
};
