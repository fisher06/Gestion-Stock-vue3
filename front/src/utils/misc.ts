type milliseconds = number
export const sleep = (delay: milliseconds) => new Promise((resolve) => setTimeout(resolve, delay))

export const isProd = () => import.meta.env.PROD
