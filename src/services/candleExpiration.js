exports.calcInitialExpirationDate = ({ type, addOn }) => {
    const validTypes = ['simple', 'treeDays', 'week', 'month'];
    if (!validTypes.includes(type)) throw new Error('Invalid type');

    const expirationDate = new Date();

    // calc initial expiration date based on candle type
    switch (type) {
        case 'simple':
            expirationDate.setDate(expirationDate.getDate() + 1);
            break;
        case 'treeDays':
            expirationDate.setDate(expirationDate.getDate() + 3);
            break;
        case 'week':
            expirationDate.setDate(expirationDate.getDate() + 7);
            break;
        case 'month':
            expirationDate.setMonth(expirationDate.getMonth() + 1);
            break;
    }

    // add more days if has an extraDays add-on
    if (Array.isArray(addOn) && addOn.length > 0) {
        addOn.forEach(element => {
            if (element.type === 'extraDays' && !isNaN(element.addonData)) {
                expirationDate.setDate(expirationDate.getDate() + Number(element.addonData));
            }
        });
    }

    return expirationDate;
};