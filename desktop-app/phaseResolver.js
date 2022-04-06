const dotenv = require("dotenv");

const applyPhaseDifferences = () => {
  if ("NODE_ENV" in process.env) {
    console.log("selected enviornment is", process.env["NODE_ENV"]);
  } else {
    throw new Error("NODE_ENV not given");
  }
};

const validateNodeEnviornments = () => {
  if ("api_key" in process.env) {
    console.log("api_key is", process.env["api_key"]);
  } else {
    throw new Error("api_key not given");
  }
};

// staging, development, production 등의 phase 를 처리한다.
applyPhaseDifferences();
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

/// phase 에 맞게 가져온 세부적인 환경변수의 validation 을 진행한 후, electron app 으로 진입한다.
/// 이후로는 일반적인 electron app 의 진행과 동일합니다.
validateNodeEnviornments();
require("./main.js");
