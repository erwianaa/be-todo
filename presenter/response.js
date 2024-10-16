module.exports = (res, httpStatus, message, data) => {
    res.json({
        status: httpStatus || 500,
        message: message || '',
        data: data || null
    });
}