const parseCookie = (cookie) => {
    var output = {};
    cookie.split(/\s*;\s*/).forEach(function (pair) {
        pair = pair.split(/\s*=\s*/);
        var name = decodeURIComponent(pair[0]);
        var value = decodeURIComponent(pair.splice(1).join('='));
        var splits = value.split('j:')
        output[name] = splits[1];
    });
    return output;
}

const getProfile = (req) => {
    const usersAkses = req.headers.cookie
    const parseCookies = parseCookie(usersAkses)
    const getUsers = JSON.parse(parseCookies.userLogin)
    return getUsers
}

const getDateFormatYYMMDD = () => {
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // current year
    let year = date_ob.getFullYear();

    return `${year}-${month}-${date}`
}

module.exports = { getProfile, getDateFormatYYMMDD }