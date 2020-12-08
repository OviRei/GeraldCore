#include <napi.h>
#include "Engine.hpp"


Napi::Object Init(Napi::Env env, Napi::Object exports) {
    return initMathEngine(env, exports);
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, Init)