export const me = (req , res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  res.status(200).send({ status: 200, data: req.user });
}
