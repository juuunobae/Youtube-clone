import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // unique = 유일해야 하는 값
  socialOnly: { type: Boolean, default: false },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String },
  location: String,
});

// user model을 생성하고 비밀번호를 암호화하기 위한 middleware
userSchema.pre("save", async function () {
  // 현재 저장하는 model의 password를 bcrypt 모듈을 이용해 해싱한다.
  this.password = await bcrypt.hash(this.password, 5);
});

// 작성한 스키마를 토대로 모델 생성, (모델이름, 설정한 스키마)
const User = mongoose.model("User", userSchema);

// 모델 export
export default User;
