export const getDateDiff = (finish: string, start: string) => { 
    const years = new Date(finish).getFullYear() - new Date(start).getFullYear()
    let months = new Date(finish).getMonth() - new Date(start).getMonth()
    let days = new Date(finish).getDate() - new Date(start).getDate()
    let hours = new Date(finish).getHours() - new Date(start).getHours()
    let minutes = new Date(finish).getMinutes() - new Date(start).getMinutes()
    
    if(months < 0) {
        months = 12 + months
    }
    if(days < 0) {
        days = 30 + days
    }
    if(hours < 0) {
        hours = 24 + hours
    }
    if(minutes < 0) {
        minutes = 60 + minutes
    }
    
    return `
    ${years ? `${years} years` : ''} 
    ${months ? `${months} months` : ''} 
    ${days ? `${days} days` : ''}   
    ${hours ? `${hours} hours` : ''}
    ${minutes ? `${minutes} minutes` : ''}
    `
}