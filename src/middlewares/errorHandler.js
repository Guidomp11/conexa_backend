module.exports = ({status, error}, req, res, next) => (
    res.status(status || 500).json(error || {})
)