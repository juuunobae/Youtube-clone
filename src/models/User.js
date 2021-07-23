import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // unique = 유일해야 하는 값
  avatarUrl: String,
  socialOnly: { type: Boolean, default: false },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String },
  location: String,
  // Video model과 relationship을 추가한 것
  videos: [{ type: mongoose.Schema.ObjectId, ref: "Video", required: true }],
  // User가 생성한 Video들의 ObjectId를 배열로 저장하기 위해서
});

// user model을 생성하고 비밀번호를 암호화하기 위한 middleware
userSchema.pre("save", async function () {
  // paasword가  변경되고 User model이 저장되면 실행
  if (this.isModified("password")) {
    // 현재 저장하는 model의 password를 bcrypt 모듈을 이용해 해싱한다.
    this.password = await bcrypt.hash(this.password, 5);
  }
});

// 작성한 스키마를 토대로 모델 생성, (모델이름, 설정한 스키마)
const User = mongoose.model("User", userSchema);

// 모델 export
export default User;
