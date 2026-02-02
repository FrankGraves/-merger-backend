import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";

import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static("public"));

// 🔑 Supabase credentials
const supabaseUrl = " https://rhahppfziuacipkslujd.supabase.co";
const supabaseKey = "sb_publishable_rcAKqV7-jIpgWZUD9o8Glw_RIRmgqg7";
const supabase = createClient(supabaseUrl, supabaseKey);

// 📨 Receive form data
// app.post("/register", async (req, res) => {
//   try {
//     const data = req.body;

//     const { error } = await supabase.from("users").insert([data]);

//     if (error) {
//       console.error(error);
//       return res.status(400).json({ error: error.message });
//     }

//     res.status(201).json({ success: true });
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

//render backend

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

//  done

app.post("/register", async (req, res) => {
  try {
    const data = req.body;

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Replace plain password with hash
    data.password = hashedPassword;

    const { error } = await supabase.from("users").insert([data]);

    if (error) {
      console.error(error);
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
