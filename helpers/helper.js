const formatDateTime = (date, time) => {
    console.log(date, time);
    
    return  new Date(`${ date }T${ time }`);
}

module.exports = { formatDateTime }