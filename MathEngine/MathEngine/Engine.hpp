#include <napi.h>
#include "include_dir/math_engine_lib/Main.hpp"

Napi::Object runEngine(char *argv[], Napi::Env env);
Napi::Object runEngineWrapped(const Napi::CallbackInfo& info);

Napi::Object initMathEngine(Napi::Env env, Napi::Object exports);
