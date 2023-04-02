app.post("/api/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user with email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create new user
    const user = new User({ username, email, password });
    await user.save();

    // Send success response
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});
