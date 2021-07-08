import mongoose from "mongoose";

// 데이터의 스키마 작성
const videoSchema = new mongoose.Schema({
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

videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags.split(",").map((word) => (word.startsWith("#") ? word : `#${word}`));
});

// 작성한 스키마를 토대로 모델 생성, (모델이름, 설정한 스키마)
const Video = mongoose.model("Video", videoSchema);

// 모델 export
export default Video;
