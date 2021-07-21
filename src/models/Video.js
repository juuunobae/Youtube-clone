import mongoose from "mongoose";

// 데이터의 스키마 작성
const videoSchema = new mongoose.Schema({
  fileUrl: { type: String, required: true },
  title: { type: String, trim: true, required: true, maxLength: 20 }, // model의 데이터 type을 정의해준다.
  description: { type: String, trim: true, required: true, maxLength: 140 },
  createdAt: { type: Date, default: Date.now },
  hashtags: [{ type: String, trim: true, required: true }], // 배열도 가능하다.
  meta: {
    // 객체도 가능하다.
    views: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
  },
});

// 사용자에게 입력받은 hashtags를 comma를 기준으로 단어를 나눠 각 단어의 앞에 '#'를 붙여주기 위해 직접 만든 함수
// queris 메소드들 처럼 import 엾이 사용 가능
videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word.trim()}`));
  // .startWith를 사용하여 update 할 때 이미 '#'이 붙어 있는 단어들은 제외하고 수정한다.
});

// 작성한 스키마를 토대로 모델 생성, (모델이름, 설정한 스키마)
const Video = mongoose.model("Video", videoSchema);

// 모델 export
export default Video;
