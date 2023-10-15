import dayjs from "dayjs"
export const getDateDiff = (finish:string | Date, start:string | Date) => { 
    const years = dayjs(finish).get('years') - dayjs(start).get('years')
    const months = dayjs(finish).get('months') - dayjs(start).get('months')
    const days = dayjs(finish).get('days') - dayjs(start).get('days')
    const hours = dayjs(finish).get('hours') - dayjs(start).get('hours')
    const minutes = dayjs(finish).get('minutes') - dayjs(start).get('minutes')
    const seconds = dayjs(finish).get('seconds') - dayjs(start).get('seconds')
    return `
    ${years ? `${years} years` : ''} 
    ${months ? `${months} months` : ''} 
    ${days ? `${days} days` : ''}
    ${hours ? `${hours} hours` : ''}
    ${minutes ? `${minutes} minutes` : ''}
    ${seconds ? `${seconds} seconds` : ''}
    `
} 