
export const logout = async (req , res) => {
  res.clearCookie("session");
  res.json({ status: 200, message: "Logout Successfully" });
}
