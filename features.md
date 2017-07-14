1.0-beta.7
----

- Fixed handling of fatal errors inside middlewares;
- Middlewares are no longer parallel;
- Added new helpers: applyDispatcher, find, isChannel, eslint (experimental), cliapp, recycle;
- Fixed uncatchable errors inside assignToState;
- Added action ACTION_ERROR;
- Added payload result of channels;
- Fixed echo.clear;
- Implemented path resolver for __erector__, __store__ imports;
- The babel presets have divided into the plugins;
