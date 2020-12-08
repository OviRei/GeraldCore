{
    "targets": [{
        "target_name": "MathEngine4Gerald",
        "cflags_cc": [ 
            "-fno-exceptions",
            "-std=c++17",
        ],
        "sources": [
            "MathEngine/ProjMain.cpp",
            "MathEngine/Engine.hpp",
            "MathEngine/Engine.cpp",
        ],
        'include_dirs': [
            "<!@(node -p \"require('node-addon-api').include\")",
            "include_dir/math_engine_lib"
        ],
        'libraries': [
            "/usr/lib/gerald/libMathEngineSharedLibrary.so"
        ],
        'dependencies': [
            "<!(node -p \"require('node-addon-api').gyp\")"
        ],
        'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ]
    }]
}