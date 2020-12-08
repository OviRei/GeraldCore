#include "Engine.hpp"

MathEngine::Engine engine;

Napi::Object runEngine(std::string _in, Napi::Env env) {
    Napi::Object out = Napi::Object::New(env);

    RETURN_TYPE_ERROR result = engine.calculator.initCalculation(_in);

    if (std::holds_alternative<MathEngine::Error>(result)) {
        out.Set(Napi::String::New(env, "err"), Napi::String::New(env, std::get<MathEngine::Error>(result).errorMessage));
        return out;
    } else {
        out.Set(Napi::String::New(env, "rawInput"), Napi::String::New(env, _in));
        out.Set(Napi::String::New(env, "rpn"), Napi::String::New(env, engine.calculator.getRPNString()));
        out.Set(Napi::String::New(env, "output"), Napi::Number::New(env, engine.calculator.getResult()));
        out.Set(Napi::String::New(env, "infixToRPN"), Napi::Number::New(env, engine.calculator.getInfixToRPNTime().count()));
        out.Set(Napi::String::New(env, "RPNtoBinaryTree"), Napi::Number::New(env, engine.calculator.getRPNtoBinaryTreeTime().count()));
        out.Set(Napi::String::New(env, "calcTime"), Napi::Number::New(env, engine.calculator.getCalculationTime().count()));
        return out;
    }
}


Napi::Object runEngineWrapped(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    Napi::String in = info[0].As<Napi::String>();
    
    return runEngine(in, env);
}

Napi::Object initMathEngine(Napi::Env env, Napi::Object exports) {
    exports.Set("runEngine", Napi::Function::New(env, runEngineWrapped));
    return exports;
}
