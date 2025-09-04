export const me = (req , res) => {
  res.send({status:200 , data:req.user})
}
