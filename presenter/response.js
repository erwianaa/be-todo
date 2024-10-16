module.exports = (res, httpStatus, message, data) => {
    return res.json({
        status: httpStatus || 500,
        message: message || '',
        data: data || null
    });
}