const validateItemReport = (req, res, next) => {
  const { name, location, type, phoneNumber } = req.body;
  
  if (!name || !location || !type || !phoneNumber) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields: name, location, type, phoneNumber'
    });
  }
  
  if (!/^\d{10}$/.test(phoneNumber)) {
    return res.status(400).json({
      success: false,
      message: 'Phone number must be exactly 10 digits'
    });
  }
  
  if (!['lost', 'found'].includes(type)) {
    return res.status(400).json({
      success: false,
      message: 'Type must be either "lost" or "found"'
    });
  }
  
  next();
};

module.exports = { validateItemReport };