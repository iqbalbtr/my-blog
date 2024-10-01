import animation from "~/constants/animation"

export const delayAnimation = (type: keyof typeof animation, delay: number) => {
    return {
        ...animation[type],
        enter: {
            ...animation[type].enter,
            delay
        }
    }
}