#include <napi.h>
#include "MathEngine/MathEngine.hpp"

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    return InitMathEngine(env, exports);
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, Init)
