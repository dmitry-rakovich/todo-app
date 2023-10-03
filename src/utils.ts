import dayjs from "dayjs"
export const getDateDiff = (start:string | Date, finish:string | Date) => {
    const days = dayjs(start).diff(finish, 'days')
    const months = dayjs(start).diff(finish, 'months')
    const years = dayjs(start).diff(finish, 'years')
    return `${days} days ${months} months ${years} years`
} 